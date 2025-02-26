import fs from 'fs';

export async function copyAndRenameFile(
  filePath: string,
  outputFilePath: string,
) {
  fs.copyFile(filePath, outputFilePath, (err) => {
    if (err) throw err;
    console.log(`Arquivo copiado com sucesso para: ${outputFilePath}`);
  });
}
