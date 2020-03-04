import {environment} from '@/environment/environment';


export function randomImageFileName(): string {
  if (environment.background_images.length === 0) return '';
  const idx = Math.floor(Math.random() * environment.background_images.length);
  return environment.background_images[idx];
}

export function trimChar(text: string, char: string) {
  if (char === ']') char = '\\]';
  if (char === '\\') char = '\\\\';
  return text.replace(new RegExp('^[' + char + ']+|[' + char + ']+$'), '');
}

export enum PageType {
  EDIT, CREATE, VIEW
}

export enum FeatureType {
  LINE_STRING = 'LineString'
}
