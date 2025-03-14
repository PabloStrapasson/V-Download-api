import { z } from 'zod';

const containerEnum = ['mp4', 'webm', 'm4a'] as const;

export const DownloadVideoRequestSchema = z.object({
  title: z.string().nonempty().min(3).max(50),
  container: z.enum(containerEnum),
  itag: z.number().array().nonempty().max(2),
});

export interface DownloadVideoRequest {
  title: string;
  container: string;
  itag: number[];
}

export interface DownloadVideoResponse {
  message: string;
  outputFilePath: string;
}
