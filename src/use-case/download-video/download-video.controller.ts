import { Request, Response } from 'express';
import { DownloadVideoUseCase } from './download-video.use-case';

export class DownloadVideoController {
  constructor(private downloadVideoUseCase: DownloadVideoUseCase) {}

  async downloadVideo(req: Request, res: Response) {
    const result = await this.downloadVideoUseCase.execute();

    return res.status(200).send(result);
  }
}
