import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';

export const fileUploadInterceptor = (
  fileName: string,
  destinationPath: string,
) => {
  return FileInterceptor(fileName, {
    storage: diskStorage({
      destination: destinationPath,
      filename: (req, file, callback) => {
        const uniqueFileName = `${randomUUID() + '-' + file.originalname.replace('', '')}`;
        callback(null, uniqueFileName);
      },
    }),
    limits: { fileSize: 1024 * 1024 * 4 },
    fileFilter: (req, file, callback) => {
      if (!file) {
        callback(null, false);
      } else {
        callback(null, true);
      }
    },
  });
};
