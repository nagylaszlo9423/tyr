import {environment} from '@/environment/environment';
import {Extent} from 'ol/extent';

export function rescaleExtent(extent: Extent, scale: number) {
  console.log(extent);
  return [
    extent[0] * (1 / scale),
    extent[1] * (1 / scale),
    extent[2] * scale,
    extent[3] * scale
  ];
}

export function diffOfFirstArray<T>(array1: T[], array2: T[], comp: (el1: T, el2:T) => boolean): T[] {
  return array1.filter(el1 => array2.findIndex(el2 => comp(el1, el2)) === -1);
}

export function randomImageFileName(): string {
  if (environment.background_images.length === 0) return '';
  const idx = Math.floor(Math.random() * environment.background_images.length);
  return environment.background_images[idx];
}

export function onPageBottomReached(): Promise<void> {
  return new Promise<void>(resolve => {
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        resolve();
      }
    };
  });
}

export function enumKeys(enumObj: any): string[] {
  return Object.keys(enumObj).filter(x => !(parseInt(x) >= 0));
}

export function enumValue(enumName: string, enumObj: any): any {
  return enumKeys(enumObj).indexOf(enumName);
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
