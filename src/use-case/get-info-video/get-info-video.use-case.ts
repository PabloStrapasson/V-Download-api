import ytdl from '@distube/ytdl-core';

interface InfoFormat {
  itag: number;
  mimeType: string | undefined;
  qualityLabel: string;
  container: string;
}

interface InfoVideo {
  title: string;
  avaliableFormats: Array<InfoFormat>;
}

export class GetInfoVideoUseCase {
  async execute(videoID: string): Promise<InfoVideo> {
    const avaliableFormatsList: Array<InfoFormat> = [];

    try {
      const videoInfo = await ytdl.getInfo(videoID);
      const videoTitle = videoInfo.videoDetails.title;
      videoInfo.formats.forEach((format) => {
        const infoFormat = {
          itag: format.itag,
          mimeType: format.mimeType?.split('/')[0],
          qualityLabel: format.qualityLabel,
          container: format.container,
        };

        avaliableFormatsList.push(infoFormat);
      });

      const infoVideo = {
        title: videoTitle,
        avaliableFormats: avaliableFormatsList,
      };

      return infoVideo;
    } catch (err) {
      console.error('Error:', err);
      throw new Error();
    }
  }
}
