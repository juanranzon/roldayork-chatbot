
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { messages } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Eres un asistente turístico experto en Roldanillo, Valle del Cauca. Respondes preguntas sobre parapente, hospedaje, gastronomía y cultura local. Tu estilo es cálido, claro y útil.' },
        ...messages
      ],
      temperature: 0.7,
    });

    res.status(200).json({ response: completion.data.choices[0].message?.content });
  } catch (err) {
    res.status(500).json({ error: 'Error al generar respuesta' });
  }
}
