import fs from 'fs';

export function removeFile(filePath: string) {
  fs.unlink(filePath, (err) => {
    if (err) throw err;
    console.log(`❌ Arquivo removido: ${filePath}`);
  });
}
