import {ObjectInitializer} from '@/utils/object-initializer';
import {GroupJoinPolicy} from '@/components/groups/group-join-policy';

export class GroupModel extends ObjectInitializer<GroupModel> {
  id: string;
  name: string;
  description: string;
  joinPolicy: GroupJoinPolicy;
  owner: string;
}
