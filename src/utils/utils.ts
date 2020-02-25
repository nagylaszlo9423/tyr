import {environment} from '@/environment/environment';


export function randomImageFileName(): string {
  if (environment.background_images.length === 0) return '';
  const idx = Math.floor(Math.random() * environment.background_images.length);
  return environment.background_images[idx];
}

export enum PageType {
  EDIT, CREATE
}
