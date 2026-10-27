import { NextResponse } from 'next/server';
import { getElevenLabsClient } from '../../../../lib/elevenlabs.js';

export const runtime = 'nodejs';

export async function POST(request) {
  const client = getElevenLabsClient();
  if (!client) {
    return NextResponse.json({ error: 'Set ELEVENLABS_API_KEY in .env.local to enable speech recognition.' }, { status: 503 });
  }

  let file;
  try {
    file = (await request.formData()).get('audio');
  } catch {
    return NextResponse.json({ error: 'Send a recorded audio file.' }, { status: 400 });
  }
  if (!file || typeof file === 'string' || !file.size) {
    return NextResponse.json({ error: 'No recorded audio was received.' }, { status: 400 });
  }
  if (file.size > 15 * 1024 * 1024) {
    return NextResponse.json({ error: 'The recording must be shorter than 15 MB.' }, { status: 413 });
  }

  try {
    const result = await client.speechToText.convert({
      file,
      modelId: process.env.ELEVENLABS_STT_MODEL || 'scribe_v2',
      languageCode: 'eng',
      keyterms: ['OO-ABC', 'Antwerp', 'Brussels', 'taxiway Alpha', 'runway', 'hold short', 'cleared for takeoff', 'line up and wait', 'squawk'],
    });
    return NextResponse.json({ text: result.text || '', languageCode: result.languageCode || null });
  } catch (error) {
    const status = error.statusCode === 429 ? 429 : 502;
    console.error('ElevenLabs transcription request failed:', error.statusCode || error.name || 'unknown error');
    return NextResponse.json({ error: 'ElevenLabs could not transcribe this recording. Check your account quota and try again.' }, { status });
  }
}
