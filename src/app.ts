import express, { Response } from 'express';
import router from './routes/routes';

const app = express();
app.use(express.json());
app.get('/', (_, res: Response) => {
  res.status(200).send({ message: 'YouTube video downloader' });
});

app.use(router);

export default app;
