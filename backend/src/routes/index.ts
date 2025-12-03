import { Router } from 'express';
import {
  exportAll,
  getImage,
  saveLabels,
  uploadAndClassify,
  uploadClassifyAndSeed
} from '../controllers/imageController';
import { uploadMiddleware } from '../services/storage/imageStorage';

const router = Router();

router.post('/images/upload-and-classify', uploadMiddleware.single('image'), uploadAndClassify);
router.post('/images/save-labels', saveLabels);
router.get('/images/:id', getImage);
router.get('/dataset/export', exportAll);
router.post('/images/seed', uploadMiddleware.single('image'), uploadClassifyAndSeed);

export default router;
