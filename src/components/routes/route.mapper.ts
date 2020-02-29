import {RouteRequest, RouteResponse} from 'tyr-api/types/axios';
import {RouteModel} from '@/models/route-model';
import {Path} from '@/components/map/features/path';
import {FeatureType} from '@/utils/utils';

export class RouteMapper {

  static listResponseToModel(res: RouteResponse[]): RouteModel[] {
    return res.map(this.responseToModel);
  }

  static responseToModel(res: RouteResponse): RouteModel {
    return new RouteModel({
      id: res.id,
      title: res.title,
      description: res.description,
      path: new Path(res.path.coordinates)
    });
  }

  static modelToRequest(model: RouteModel): RouteRequest {
    return {
      title: model.title,
      description: model.description,
      path: {
        type: FeatureType.LINE_STRING,
        coordinates: model.path.lineString.getCoordinates()
      }
    };
  }

}
