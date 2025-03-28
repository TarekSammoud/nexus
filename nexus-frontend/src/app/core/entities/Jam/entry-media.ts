import { Entry } from './entry';

export enum EntryMediaType {
  SCREENSHOT = 'SCREENSHOT',
  VIDEO = 'VIDEO',
  COVER_PHOTO = 'COVER_PHOTO'
}

export interface EntryMedia {
  id?: number;
  url: string;
  type: EntryMediaType;
  createdAt?: Date;
  updatedAt?: Date;
  entry: { id: number }; 
}
