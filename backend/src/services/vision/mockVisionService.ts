import { VisionDetectedItem } from '../../types';
import { VisionService } from './index';

// Simple mock with deterministic results for local development
export class MockVisionService implements VisionService {
  async classifyImage(_imagePath: string): Promise<VisionDetectedItem[]> {
    return [
      { name: 'Bananas', category: 'produce', confidence: 0.92 },
      { name: 'Whole Milk', category: 'dairy', confidence: 0.81 },
      { name: 'Unknown beverage', category: 'beverage', confidence: 0.42 }
    ];
  }
}
