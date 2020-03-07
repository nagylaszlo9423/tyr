import {GroupModel} from '@/models/group.model';
import {GroupRequest, GroupResponse} from 'tyr-api/types/axios';

export class GroupMapper {
  private constructor() {}

  static responseListToModels(items: GroupResponse[]): GroupModel[] {
    return items.map(GroupMapper.responseToModel);
  }

  static responseToModel(response: GroupResponse): GroupModel {
    return new GroupModel({
      id: response.id,
      name: response.name,
      owner: response.owner,
      joinPolicy: response.joinPolicy,
      description: response.description,
      isEditable: response.isEditable,
      audit: response.audit
    });
  }

  static modelToRequest(model: GroupModel): GroupRequest {
    return {
      name: model.name,
      description: model.description,
      joinPolicy: model.joinPolicy
    };
  }
}
