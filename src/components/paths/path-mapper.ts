import {PathModel} from '@/models/path-model';
import {FeatureType} from '@/utils/utils';
import {PathRequest, PathResponse} from 'tyr-api/types/axios';

export class PathMapper {

  static listResponseToModel(res: PathResponse[]): PathModel[] {
    return res.map(this.responseToModel);
  }

  static responseToModel(res: PathResponse): PathModel {
    return new PathModel({
      id: res.id,
      title: res.title,
      description: res.description,
      coordinates: res.path.coordinates
    });
  }

  static modelToRequest(model: PathModel): PathRequest {
    return {
      title: model.title,
      description: model.description,
      path: {
        type: FeatureType.LINE_STRING,
        coordinates: model.coordinates
      }
    };
  }

}
