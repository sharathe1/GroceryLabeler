import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import router from './routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const uploadsPath = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsPath));
app.use(express.static(process.cwd()));

app.use('/api', router);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Grocery labeler backend listening on port ${port}`);
});
