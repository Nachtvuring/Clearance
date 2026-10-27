import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

let client;

export function getElevenLabsClient() {
  if (!process.env.ELEVENLABS_API_KEY) return null;
  if (!client) client = new ElevenLabsClient();
  return client;
}

export const DEFAULT_ATC_VOICE_ID = 'onwK4e9ZLuTAKqWW03F9';
