import Replicate from "replicate";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const generateImage = async (personality: string): Promise<string> => {
  try {
    console.log('Attempting to generate image for personality:', personality);

    const model = "stability-ai/sdxl";
    const version = "a00d0b7dcbb9c3fbb34ba87d2d5b46c56969c84a628bf778a7fdaec30b1b99c5";

    console.log(`Using model: ${model}, version: ${version}`);

    const output = await replicate.run(
      `${model}:${version}`,
      {
        input: {
          prompt: `A fun, creative image representing ${personality}`,
          negative_prompt: "blurry, low quality, distorted, boring, plain",
          width: 512,
          height: 512,
          num_inference_steps: 50,
          guidance_scale: 7.5
        }
      }
    );

    console.log('API Response:', output);

    return Array.isArray(output) ? output[0] : output;

  } catch (error) {
    console.error('Detailed error in generateImage:', error);
    throw error;
  }
};