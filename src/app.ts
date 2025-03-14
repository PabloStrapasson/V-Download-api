import 'express-async-errors';
import express, { Response } from 'express';
import router from './routes/routes';
import { errorMiddleware } from './errors/errorMiddleware';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // alterar '*' para o domínio da aplicação, ex: https://meu_dominio.com
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
app.use(errorMiddleware);
app.get('/', (_, res: Response) => {
  res.status(200).send({ message: 'YouTube video downloader' });
});

app.use(router);

export default app;
