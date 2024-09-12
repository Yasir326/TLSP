import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeCV = async (cvText: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that analyzes CVs and extracts key personality traits and professional characteristics."
        },
        {
          role: "user",
          content: `Analyze the following CV and provide a brief, engaging description of the person's professional personality in no more than 100 characters:\n\n${cvText}`
        }
      ],
      max_tokens: 100
    });

    return response.choices[0].message.content || "Energetic and skilled professional";
  } catch (error) {
    console.error('Error analyzing CV:', error);
    throw error;
  }
};

export const generateTweet = async (personality: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that creates engaging, tweet-sized professional introductions."
        },
        {
          role: "user",
          content: `Create a tweet-sized (max 280 characters) professional introduction based on this personality: ${personality}. Include relevant hashtags.`
        }
      ],
      max_tokens: 100
    });

    return response.choices[0].message.content || "Passionate professional ready to make an impact! #OpenToWork #Innovation";
  } catch (error) {
    console.error('Error generating tweet:', error);
    throw error;
  }
};