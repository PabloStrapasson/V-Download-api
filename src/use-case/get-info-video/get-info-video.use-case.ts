import ytdl from '@distube/ytdl-core';

interface InfoFormat {
  itag: number;
  mimeType: string | undefined;
  qualityLabel: string;
  container: string;
}

interface InfoVideo {
  title: string;
  availableFormats: Array<InfoFormat>;
}

export class GetInfoVideoUseCase {
  async execute(videoID: string): Promise<InfoVideo> {
    const availableFormatsList: Array<InfoFormat> = [];

    try {
      const videoInfo = await ytdl.getInfo(videoID);
      const videoTitle = videoInfo.videoDetails.title;
      videoInfo.formats.forEach((format) => {
        if (format.hasVideo && format.container === 'mp4') {
          const infoFormat = {
            itag: format.itag,
            mimeType: format.mimeType?.split('/')[0],
            qualityLabel:
              format.mimeType?.split('/')[0] === 'video'
                ? format.qualityLabel
                : 'audio',
            container: format.container,
          };

          availableFormatsList.push(infoFormat);
        }
      });

      const uniqueFormats = this.filterFormats(availableFormatsList);
      console.log(uniqueFormats);

      const infoVideo = {
        title: videoTitle,
        availableFormats: uniqueFormats,
      };

      return infoVideo;
    } catch (err) {
      console.error('Error:', err);
      throw new Error();
    }
  }

  filterFormats(formats: Array<InfoFormat>): Array<InfoFormat> {
    const uniqueFormatTags = formats.filter(
      (format, index, self) =>
        index === self.findIndex((f) => f.itag === format.itag),
    );

    const uniqueFormatResolutionAndContainer = uniqueFormatTags.filter(
      (format, index, self) =>
        index ===
        self.findIndex(
          (f) =>
            f.qualityLabel === format.qualityLabel &&
            f.container === format.container,
        ),
    );

    return uniqueFormatResolutionAndContainer;
  }
}
