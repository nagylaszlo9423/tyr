import {Environment} from '@/environment/environment';


export function randomImageFileName(): string {
  if (Environment.background_images.length === 0) return '';
  const idx = Math.floor(Math.random() * Environment.background_images.length);
  return Environment.background_images[idx];
}
