import fs from 'fs';
import path from 'path';
import ytdl, { videoInfo } from '@distube/ytdl-core';
import { v4 as uuidv4 } from 'uuid';
import { removeFile } from '../../utils/removeFile';
import { mergeAudioVideo } from '../../utils/mergeAudioVideo';
import { copyAndRenameFile } from '../../utils/copyAndRenameFile';
import { NotFound } from '../../errors/errorHandler';
import {
  DownloadVideoRequest,
  DownloadVideoResponse,
} from './download-video.dto';

export class DownloadVideoUseCase {
  async execute(
    videoID: string,
    videoTag: DownloadVideoRequest,
  ): Promise<DownloadVideoResponse> {
    try {
      const tempFilesPath: string[] = [];
      const videoInfo = await ytdl.getInfo(videoID);
      const outputFilePath = path.join(
        'temp/',
        `${videoTag.title}.${videoTag.container}`,
      );

      const promises = videoTag.itag.map(async (itag) => {
        const filePath = await this.downloadFile(videoID, videoInfo, itag);

        tempFilesPath.push(filePath);
      });

      await Promise.all(promises);

      if (tempFilesPath.length > 1) {
        await mergeAudioVideo(tempFilesPath, outputFilePath);
      } else if (tempFilesPath.length === 1) {
        await copyAndRenameFile(tempFilesPath[0], outputFilePath);
      }

      this.removeTempFiles(tempFilesPath);

      return {
        message: `${videoTag.title} baixado com sucesso`,
        outputFilePath,
      };
    } catch {
      throw new NotFound('Video not found');
    }
  }

  private async downloadFile(
    videoID: string,
    videoInfo: videoInfo,
    itag: number,
  ): Promise<string> {
    const format = ytdl.chooseFormat(videoInfo.formats, {
      quality: `${itag}`,
    });

    const fileID = uuidv4();
    const outputFilePath = path.join(
      'temp/',
      `${fileID}-${videoID}.${format.container}`,
    );
    const outputStream = fs.createWriteStream(outputFilePath);

    return new Promise((resolve, reject) => {
      ytdl.downloadFromInfo(videoInfo, { format: format }).pipe(outputStream);

      outputStream
        .on('finish', () => {
          resolve(outputFilePath);
          console.log(`Finished downloading of file`);
        })
        .on('error', (err) => {
          reject(err);
          throw err;
        });
    });
  }

  private async removeTempFiles(tempFilePath: string[]) {
    tempFilePath.forEach((filePath) => {
      removeFile(filePath);
    });
  }
}
