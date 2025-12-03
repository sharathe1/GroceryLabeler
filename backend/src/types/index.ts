export type VisionDetectedItem = {
  name: string;
  category?: string;
  confidence: number;
};

export type LabelSource = 'AUTO' | 'MANUAL' | 'AUTO_CORRECTED';

export interface UploadAndClassifyResponse {
  imageId: number;
  imageUrl: string;
  suggestedItems: VisionDetectedItem[];
}

export interface SaveLabelsRequest {
  imageId: number;
  labels: Array<{
    name: string;
    category?: string;
    confidence?: number | null;
    source: LabelSource;
  }>;
}

export interface DatasetExportItem {
  imageUrl: string;
  labels: Array<{
    name: string;
    category?: string | null;
    confidence?: number | null;
    source: LabelSource;
  }>;
}
