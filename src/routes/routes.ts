import express, { Request, Response } from 'express';
import { DownloadVideoController } from '../use-case/download-video/download-video.controller';
import { DownloadVideoUseCase } from '../use-case/download-video/download-video.use-case';
import { GetVideoInfoUseCase } from '../use-case/get-video-info/get-video-info.use-case';
import { GetVideoInfoController } from '../use-case/get-video-info/get-video-info.controller';

const downloadVideoUseCase = new DownloadVideoUseCase();
const downloadVideoController = new DownloadVideoController(
  downloadVideoUseCase,
);
const getVideoInfoUseCase = new GetVideoInfoUseCase();
const getVideoInfoController = new GetVideoInfoController(getVideoInfoUseCase);

const router = express.Router();

router
  .get('/download/:id/info', async (req: Request, res: Response) => {
    await getVideoInfoController.getVideoInfo(req, res);
  })
  .post('/download/:id', async (req: Request, res: Response) => {
    await downloadVideoController.downloadVideo(req, res);
  });

export default router;
