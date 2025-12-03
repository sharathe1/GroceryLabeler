import { VisionDetectedItem } from '../../types';
import { VisionService } from './index';

// Placeholder implementation showing where to integrate a real provider like OpenAI or Google Vision.
export class ExternalVisionService implements VisionService {
  async classifyImage(imagePath: string): Promise<VisionDetectedItem[]> {
    // TODO: Replace with actual API call. Example for OpenAI Vision:
    // const response = await openai.images.classifications.create({
    //   image: fs.readFileSync(imagePath),
    // });
    // return response.data.items.map(({ label, score }) => ({ name: label, confidence: score }));

    // For now we just return an empty array to signal no detection.
    return [];
  }
}
