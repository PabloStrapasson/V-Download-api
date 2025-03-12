import path from 'path';
import { Request, Response } from 'express';
import { DownloadVideoUseCase } from './download-video.use-case';
import { removeFile } from '../../utils/removeFile';
import { DownloadVideoRequestSchema } from './download-video.dto';
import { BadRequest, ErrorHandler } from '../../errors/errorHandler';

export class DownloadVideoController {
  constructor(private downloadVideoUseCase: DownloadVideoUseCase) {}

  async downloadVideo(req: Request, res: Response) {
    const videoID = req.params.id;
    const videoTags = req.body;

    try {
      const validationData = DownloadVideoRequestSchema.safeParse(videoTags);
      if (!validationData.success) {
        throw new BadRequest('Invalid Data');
      }
      const result = await this.downloadVideoUseCase.execute(
        videoID,
        videoTags,
      );
      const filePath = path.resolve(result.outputFilePath);

      return res.download(filePath, (err) => {
        if (err) throw err;
        removeFile(result.outputFilePath);
      });
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.status).json(error.message);
      }
      res.json(error);
    }
  }
}
