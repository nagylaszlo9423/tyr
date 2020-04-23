import {FeatureType} from '@/utils/utils';
import {PathRequest, PathResponse} from 'tyr-api/types/axios';
import {PathModel} from '@/models/path.model';
import {Coordinate} from 'ol/coordinate';

export class PathMapper {

  static responseToModel(res: PathResponse): PathModel {
    return new PathModel({
      id: res.id,
      name: res.name,
      description: res.description,
      coordinates: res.path.coordinates as Coordinate[]
    });
  }

  static modelToRequest(model: PathModel): PathRequest {
    return {
      name: model.name,
      description: model.description,
      path: {
        type: FeatureType.LINE_STRING,
        coordinates: model.coordinates
      }
    };
  }

}
