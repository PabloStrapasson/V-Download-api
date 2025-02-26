import { Request, Response } from 'express';
import { DownloadVideoUseCase } from './download-video.use-case';

export class DownloadVideoController {
  constructor(private downloadVideoUseCase: DownloadVideoUseCase) {}

  async downloadVideo(req: Request, res: Response) {
    const videoID = req.params.id;
    const videoTags = req.body;
    try {
      const result = await this.downloadVideoUseCase.execute(
        videoID,
        videoTags,
      );

      //return res.status(200).download(result.outputFilePath);
      return res.status(200).json(result);
    } catch {
      return res.status(404).json({ message: 'Video not found' });
    }
  }
}
