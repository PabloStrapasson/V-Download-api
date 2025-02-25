import { Request, Response } from 'express';
import { GetInfoVideoUseCase } from './get-info-video.use-case';

export class GetInfoVideoController {
  constructor(private getInfoVideoUseCase: GetInfoVideoUseCase) {}

  async getInfoVideo(req: Request, res: Response) {
    const videoID = req.params.id;

    try {
      const result = await this.getInfoVideoUseCase.execute(videoID);

      return res.status(200).json(result);
    } catch {
      return res.status(404).json({ message: 'Video not found' });
    }
  }
}
