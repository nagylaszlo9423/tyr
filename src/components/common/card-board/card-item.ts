
export interface CardItemControl {
  icon: string;
  action: (id: string) => void;
  variant?: 'danger' | 'success' | 'primary' | 'warning';
}

export interface CardItem {
  id: string;
  title: string;
  imgSrc: string;
  controls?: CardItemControl[];
}
