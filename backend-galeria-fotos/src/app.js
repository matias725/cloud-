import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
// 🔥 Forzar CORS para aceptar conexiones desde Live Server (127.0.0.1:5500), S3 o cualquier origen
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Esto permite que el servidor entregue tu index.html y cualquier archivo CSS/JS en esa ruta
app.use(express.static(path.join(__dirname, '../../')));

// Cuando alguien entre a la ruta principal '/', le enviamos el HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
});

app.use('/uploads', express.static(path.resolve(process.cwd(), env.uploadDir)));

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);
