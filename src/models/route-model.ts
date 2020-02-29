import {Path} from '@/components/map/features/path';
import {ObjectInitializer} from '@/utils/object-initializer';


export class RouteModel extends ObjectInitializer<RouteModel> {
  id?: string;
  title: string;
  description: string;
  path: Path;
}
