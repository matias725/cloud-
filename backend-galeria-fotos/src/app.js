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

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: env.frontendUrl === '*' ? '*' : env.frontendUrl }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.resolve(process.cwd(), env.uploadDir)));

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);
