

export interface CardItem {
  id: string;
  title: string;
  imgSrc: string;
  controls?: [{icon: string, route: string}];
}
