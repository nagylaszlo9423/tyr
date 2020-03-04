import {Vue} from 'vue-property-decorator';

export abstract class AbstractConfirmationModal extends Vue{
  abstract show(): Promise<boolean>;
  abstract hide(): void;
}
