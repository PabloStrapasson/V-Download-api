import ffmpeg from 'fluent-ffmpeg';

export function mergeAudioVideo(
  videoPath: string,
  audioPath: string,
  outputPath: string,
) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .outputOptions('-c:v copy')
      .outputOptions('-c:a aac')
      .outputOptions('-strict experimental')
      .save(outputPath)
      .on('end', () => {
        console.log('✅ Arquivo combinado com sucesso:', outputPath);
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error('❌ Erro ao mesclar:', err);
        reject(err);
      });
  });
}
