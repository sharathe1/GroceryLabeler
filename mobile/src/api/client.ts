import { LabelPayload, UploadAndClassifyResponse } from '../types';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api';

export const uploadAndClassify = async (fileUri: string): Promise<UploadAndClassifyResponse> => {
  const form = new FormData();
  form.append('image', {
    uri: fileUri,
    name: 'capture.jpg',
    type: 'image/jpeg'
  } as any);

  const res = await fetch(`${BASE_URL}/images/upload-and-classify`, {
    method: 'POST',
    body: form
  });
  if (!res.ok) throw new Error('Failed to classify image');
  return res.json();
};

export const saveLabels = async (imageId: number, labels: LabelPayload[]) => {
  const res = await fetch(`${BASE_URL}/images/save-labels`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageId, labels })
  });
  if (!res.ok) throw new Error('Failed to save labels');
  return res.json();
};

export const fetchDataset = async () => {
  const res = await fetch(`${BASE_URL}/dataset/export`);
  if (!res.ok) throw new Error('Failed to fetch dataset');
  return res.json();
};
