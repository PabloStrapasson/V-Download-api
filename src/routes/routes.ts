import express, { Request, Response } from 'express';
import { DownloadVideoController } from '../use-case/download-video/download-video.controller';
import { DownloadVideoUseCase } from '../use-case/download-video/download-video.use-case';
import { GetInfoVideoUseCase } from '../use-case/get-info-video/get-info-video.use-case';
import { GetInfoVideoController } from '../use-case/get-info-video/get-info-video.controller';

const downloadVideoUseCase = new DownloadVideoUseCase();
const downloadVideoController = new DownloadVideoController(
  downloadVideoUseCase,
);
const getInfoVideoUseCase = new GetInfoVideoUseCase();
const getInfoVideoController = new GetInfoVideoController(getInfoVideoUseCase);

const router = express.Router();

router
  .get('/download/:id/info', async (req: Request, res: Response) => {
    await getInfoVideoController.getInfoVideo(req, res);
  })
  .post('/download/:id', async (req: Request, res: Response) => {
    await downloadVideoController.downloadVideo(req, res);
  });

export default router;
