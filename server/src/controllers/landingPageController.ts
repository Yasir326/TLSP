import { Request, Response } from 'express';
import { generateImage } from '../services/imageGenerationService';
import { analyzeCV, generateTweet } from '../services/cvAnalysisService';

export const generateLandingPage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const cvText = req.file.buffer.toString('utf-8');
    const personality = await analyzeCV(cvText);
    const tweet = await generateTweet(personality);
    const imageUrl = await generateImage(personality);

    const landingPage = `
      <div style="text-align: center; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <img src="${imageUrl}" alt="AI Generated Image" style="max-width: 100%; border-radius: 10px; margin-bottom: 20px;">
        <p style="font-size: 18px; line-height: 1.6;">${tweet}</p>
      </div>
    `;

    res.send(landingPage);
  } catch (error) {
    console.error('Error generating landing page:', error);
    res.status(500).send('An error occurred while generating the landing page');
  }
};