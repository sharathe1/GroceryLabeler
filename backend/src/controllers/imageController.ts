import { Request, Response } from 'express';
import path from 'path';
import { visionService } from '../services/vision';
import {
  createImageRecord,
  exportDataset,
  getImageWithLabels,
  mapSuggestedItemsToSource,
  saveLabelsForImage
} from '../services/imageService';
import { getPublicImageUrl } from '../services/storage/imageStorage';
import { SaveLabelsRequest } from '../types';

export const uploadAndClassify = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }
    const storedPath = (req.file as Express.Multer.File).path;
    const image = await createImageRecord(storedPath);
    const suggestions = await visionService.classifyImage(storedPath);
    const imageUrl = getPublicImageUrl(req, storedPath);
    return res.status(201).json({
      imageId: image.id,
      imageUrl,
      suggestedItems: suggestions
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to process image' });
  }
};

export const saveLabels = async (req: Request, res: Response) => {
  try {
    const payload = req.body as SaveLabelsRequest;
    if (!payload?.imageId || !Array.isArray(payload.labels)) {
      return res.status(400).json({ error: 'imageId and labels are required' });
    }
    const result = await saveLabelsForImage(payload);
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: (err as Error).message || 'Failed to save labels' });
  }
};

export const getImage = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
    const image = await getImageWithLabels(id);
    if (!image) return res.status(404).json({ error: 'Not found' });
    const imageUrl = getPublicImageUrl(req, path.resolve(image.filePath));
    return res.json({ ...image, imageUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch image' });
  }
};

export const exportAll = async (_req: Request, res: Response) => {
  try {
    const data = await exportDataset();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to export dataset' });
  }
};

// Convenience endpoint to auto-save suggestions with sources
export const uploadClassifyAndSeed = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Image file is required' });
    const storedPath = (req.file as Express.Multer.File).path;
    const image = await createImageRecord(storedPath);
    const suggestions = await visionService.classifyImage(storedPath);
    const labels = mapSuggestedItemsToSource(suggestions);
    await saveLabelsForImage({ imageId: image.id, labels });
    const imageUrl = getPublicImageUrl(req, storedPath);
    return res.status(201).json({ imageId: image.id, imageUrl, labels: suggestions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to process image' });
  }
};
