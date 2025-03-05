import path from 'path';
import { Request, Response } from 'express';
import { DownloadVideoUseCase } from './download-video.use-case';
import { removeFile } from '../../utils/removeFile';

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
      const filePath = path.resolve(result.outputFilePath);

      return res.download(filePath, (err) => {
        if (err) throw err;
        removeFile(result.outputFilePath);
      });
    } catch {
      return res.status(404).json({ message: 'Video not found' });
    }
  }
}
