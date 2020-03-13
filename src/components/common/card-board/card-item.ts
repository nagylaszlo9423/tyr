
export interface CardItemControl {
  title: string;
  icon: string;
  action: (id: string) => void;
}

export interface CardItem {
  id: string;
  title: string;
  imgSrc: string;
  controls?: CardItemControl[];
}
