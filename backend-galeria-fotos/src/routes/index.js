import { Router } from 'express';
import cors from 'cors';
import authRoutes from './authRoutes.js';
import galleryRoutes from './galleryRoutes.js';

const router = Router();

// 🔥 Habilitar CORS para permitir que tu Frontend se conecte a AWS desde cualquier lugar
router.use(cors({ origin: '*' }));

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API Galería de Fotos funcionando correctamente' });
});

router.use('/auth', authRoutes);
router.use('/galleries', galleryRoutes);

export default router;
