import fs from 'fs';
import path from 'path';
import ytdl, { videoInfo } from '@distube/ytdl-core';
import { v4 as uuidv4 } from 'uuid';
import { removeFile } from '../../utils/removeFile';
import { mergeAudioVideo } from '../../utils/mergeAudioVideo';
import { copyAndRenameFile } from '../../utils/copyAndRenameFile';

interface VideoTag {
  title: string;
  container: string;
  itag: number[];
}

export class DownloadVideoUseCase {
  async execute(videoID: string, videoTag: VideoTag) {
    try {
      const tempFilesPath: string[] = [];
      const videoInfo = await ytdl.getInfo(videoID);
      const outputFilePath = path.join(
        String(process.env.TEMP_PATH),
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
    } catch (err) {
      console.error('Error:', err);
      throw new Error();
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
      String(process.env.TEMP_PATH),
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
