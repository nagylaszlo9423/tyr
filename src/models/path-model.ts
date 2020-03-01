import {ObjectInitializer} from '@/utils/object-initializer';
import {Coordinate} from 'ol/coordinate';


export class PathModel extends ObjectInitializer<PathModel> {
  id?: string;
  title: string;
  description: string;
  coordinates: Coordinate[];
}
