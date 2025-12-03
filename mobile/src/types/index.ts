export type VisionSuggestedItem = {
  name: string;
  category?: string;
  confidence: number;
};

export type LabelSource = 'AUTO' | 'MANUAL' | 'AUTO_CORRECTED';

export type LabelPayload = {
  name: string;
  category?: string;
  confidence?: number | null;
  source: LabelSource;
};

export type UploadAndClassifyResponse = {
  imageId: number;
  imageUrl: string;
  suggestedItems: VisionSuggestedItem[];
};
