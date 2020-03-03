
export interface CardItemControl {
  icon: string;
  route: string;
}

export interface CardItem {
  id: string;
  title: string;
  imgSrc: string;
  controls?: CardItemControl[];
}
