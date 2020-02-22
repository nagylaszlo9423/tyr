import {CreateGroupRequestJoinPolicyEnum} from 'tyr-api/types/axios/api';


export class GroupModel {
  name: string;
  description: string;
  joinPolicy: CreateGroupRequestJoinPolicyEnum;
}
