import { InfoFormat } from '../../types/infoFormat';

export interface GetVideoInfoRespose {
  title: string;
  availableFormats: Array<InfoFormat>;
}
