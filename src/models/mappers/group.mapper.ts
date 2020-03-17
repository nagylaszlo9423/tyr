import {GroupModel} from '@/models/group.model';
import {GroupRequest, GroupResponse} from 'tyr-api/types/axios';

export class GroupMapper {
  private constructor() {}

  static responseToModel(response: GroupResponse): GroupModel {
    return new GroupModel({
      id: response.id,
      name: response.name,
      owner: response.owner,
      joinPolicy: response.joinPolicy,
      description: response.description,
      isEditable: response.isEditable,
      isMember: response.isMember,
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
