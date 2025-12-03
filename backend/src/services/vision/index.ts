import { VisionDetectedItem } from '../../types';
import { MockVisionService } from './mockVisionService';
import { ExternalVisionService } from './externalVisionService';

export interface VisionService {
  classifyImage(imagePath: string): Promise<VisionDetectedItem[]>;
}

const provider = (process.env.VISION_PROVIDER || 'mock').toLowerCase();

export const visionService: VisionService =
  provider === 'external' ? new ExternalVisionService() : new MockVisionService();
