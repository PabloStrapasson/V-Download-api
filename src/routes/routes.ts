import express, { Request, Response } from 'express';
import { DownloadVideoController } from '../use-case/download-video/download-video.controller';
import { DownloadVideoUseCase } from '../use-case/download-video/download-video.use-case';

const downloadVideoUseCase = new DownloadVideoUseCase();
const downloadVideoController = new DownloadVideoController(
  downloadVideoUseCase,
);
const router = express.Router();

/*router.get('/download', (req: Request, res: Response) => {
  console.log('download');
  res.status(200).send({ message: 'download worked' });
});
*/
router.get('/download', async (req: Request, res: Response) => {
  await downloadVideoController.downloadVideo(req, res);
});

//router.get('/download', downloadVideoController.downloadVideo());

export default router;
