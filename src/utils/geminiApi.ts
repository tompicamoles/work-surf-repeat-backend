import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function geminiSpotModerator(spotName: string, country: string): Promise<boolean> {
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-05-20',

    contents: `Location inludes the name of the location and the country. 
    Evaluate 'false' if the location does not exist. 
    Evaluate: 'true' if Location is <=20 min drive from ocean/sea AND only if traditional ocean surfing is possible (even a few times a year). 
    Else 'false'. 
    Output: respond with 'true' or 'false' only. 
    Location: ${spotName}, ${country}`,
  });
  return response.text === 'true';
}

export async function geminiSummaryGenerator(spotName: string, country: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-05-20',

    contents: `Generate a detailed summary for a remote work and surfing destination.
    The summary must be approximately 90-120 words and follow this structure:
    **[Catchy Title]:** Explain why the destination is good for remote work (focus on reliable internet, coworking/cafes). Then, explain why it's good for surfing (mention type of waves, skill levels, consistency, and accessibility to surf spots within 20 mins drive).
    Ensure the summary emphasizes these aspects for both remote work and surfing.
    Example structure and desired detail:
    **City Meets Surf:** Focus on urban amenities (internet, coworking) and accessible waves (type, levels, drive time).
    **Surf & Focus:** Highlight tranquil environment (internet, cafes) and diverse breaks (type, levels, season).
    Destination: ${spotName}, ${country}`,
  });
  return response.text;
}

//geminiSummaryGenerator('Lorient', 'France');
geminiSpotModerator('Lorient', 'France');
