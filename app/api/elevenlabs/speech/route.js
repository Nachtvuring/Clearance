import { NextResponse } from 'next/server';
import { DEFAULT_ATC_VOICE_ID, getElevenLabsClient } from '../../../../lib/elevenlabs.js';

export const runtime = 'nodejs';

export async function POST(request) {
  const client = getElevenLabsClient();
  if (!client) {
    return NextResponse.json({ error: 'Set ELEVENLABS_API_KEY in the deployment environment to enable ATC audio.' }, { status: 503 });
  }

  let text;
  try {
    ({ text } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Send a JSON body containing the transmission text.' }, { status: 400 });
  }
  if (typeof text !== 'string' || !text.trim() || text.length > 1200) {
    return NextResponse.json({ error: 'Transmission text must be between 1 and 1,200 characters.' }, { status: 400 });
  }

  try {
    const audio = await client.textToSpeech.convert(process.env.ELEVENLABS_VOICE_ID || DEFAULT_ATC_VOICE_ID, {
      text: text.trim(),
      modelId: process.env.ELEVENLABS_TTS_MODEL || 'eleven_v4',
      voiceSettings: { stability: 0.78, similarityBoost: 0.72 },
    });
    return new Response(audio, { headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store' } });
  } catch (error) {
    const status = error.statusCode === 429 ? 429 : 502;
    console.error('ElevenLabs speech request failed:', error.statusCode || error.name || 'unknown error');
    return NextResponse.json({ error: 'ElevenLabs could not generate this transmission. Check your voice settings and account quota.' }, { status });
  }
}
