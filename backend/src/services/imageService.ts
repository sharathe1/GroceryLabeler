import { prisma } from './db/prisma';
import { LabelSource, SaveLabelsRequest, VisionDetectedItem } from '../types';

export const createImageRecord = async (filePath: string) => {
  return prisma.image.create({ data: { filePath } });
};

export const saveLabelsForImage = async (payload: SaveLabelsRequest) => {
  return prisma.$transaction(async (tx) => {
    const image = await tx.image.findUnique({ where: { id: payload.imageId } });
    if (!image) {
      throw new Error('Image not found');
    }
    await tx.imageLabel.deleteMany({ where: { imageId: payload.imageId } });
    const created = await tx.imageLabel.createMany({
      data: payload.labels.map((label) => ({
        imageId: payload.imageId,
        name: label.name,
        category: label.category,
        confidence: label.confidence ?? null,
        source: label.source as LabelSource
      }))
    });
    const labels = await tx.imageLabel.findMany({ where: { imageId: payload.imageId } });
    return { image, labels, inserted: created.count };
  });
};

export const getImageWithLabels = async (imageId: number) => {
  return prisma.image.findUnique({
    where: { id: imageId },
    include: { labels: true }
  });
};

export const exportDataset = async () => {
  const images = await prisma.image.findMany({ include: { labels: true } });
  return images.map((img) => ({
    imageUrl: img.filePath,
    labels: img.labels.map((l) => ({
      name: l.name,
      category: l.category,
      confidence: l.confidence,
      source: l.source as LabelSource
    }))
  }));
};

export const mapSuggestedItemsToSource = (items: VisionDetectedItem[]): SaveLabelsRequest['labels'] => {
  return items.map((item) => ({
    name: item.name,
    category: item.category,
    confidence: item.confidence,
    source: item.confidence >= 0.7 ? 'AUTO' : 'AUTO_CORRECTED'
  }));
};
