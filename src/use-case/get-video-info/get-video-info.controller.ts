import { Request, Response } from 'express';
import { GetVideoInfoUseCase } from './get-video-info.use-case';
import { ErrorHandler } from '../../errors/errorHandler';

export class GetVideoInfoController {
  constructor(private getVideoInfoUseCase: GetVideoInfoUseCase) {}

  async getVideoInfo(req: Request, res: Response) {
    try {
      const videoID = req.params.id;

      const result = await this.getVideoInfoUseCase.execute(videoID);

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return res.status(error.status).json(error.message);
      }
      return res.json(error);
    }
  }
}
