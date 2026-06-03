import { Router } from 'express';
import cors from 'cors';
import authRoutes from './authRoutes.js';
import galleryRoutes from './galleryRoutes.js';
import { User, Gallery, Photo } from '../models/index.js';

const router = Router();

// 🔥 Habilitar CORS para permitir que tu Frontend se conecte a AWS desde cualquier lugar
router.use(cors({ origin: '*' }));

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API Galería de Fotos funcionando correctamente' });
});

// 🔥 Endpoint para respaldos (Llamado por AWS Lambda)
router.get('/backup', async (req, res) => {
  try {
    const users = await User.findAll();
    const galleries = await Gallery.findAll();
    const photos = await Photo.findAll();
    res.json({ success: true, timestamp: new Date(), data: { users, galleries, photos } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.use('/auth', authRoutes);
router.use('/galleries', galleryRoutes);

export default router;
