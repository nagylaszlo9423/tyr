import {ObjectInitializer} from '@/utils/object-initializer';
import {GroupJoinPolicy} from '@/components/groups/group-join-policy';
import {enumKeys, enumValue} from '@/utils/utils';
import {AuditDto} from 'tyr-api/types/axios';

export class GroupModel extends ObjectInitializer<GroupModel> {
  id: string;
  name: string;
  description: string;
  joinPolicy: GroupJoinPolicy;
  owner: string;
  isEditable: boolean;
  audit: AuditDto;

  get joinPolicyName() {
    return enumKeys(GroupJoinPolicy)[this.joinPolicy];
  }

  set joinPolicyName(name: string) {
    this.joinPolicy = enumValue(name, GroupJoinPolicy);
  }
}
