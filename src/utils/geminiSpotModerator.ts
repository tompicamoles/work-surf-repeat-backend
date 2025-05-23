import { GoogleGenAI } from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function geminiSpotModerator(spotName: string, country: string): Promise<boolean> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-05-20',
    //model: 'gemini-2.0-flash',

    contents: `Evaluate: 'true' if Location is <=20 min drive from ocean/sea AND only if traditional ocean surfing is possible (even a few times a year). Else 'false'. Output: respond with 'true' or 'false' only. Location: ${spotName}, ${country}`,
  });
  console.log(response.text);
  return response.text === 'true';
}
