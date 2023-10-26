import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes';
import AppError from './utils/appError';
import errorController from './controllers/errorController';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/users', userRoutes);

app.all('*', (_req, _res, next) => next(new AppError('Not found', 404)));

app.use(errorController);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
