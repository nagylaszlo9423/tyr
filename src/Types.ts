import {Vue as _Vue} from 'vue-property-decorator';
import {ProviderInstance} from 'vee-validate/dist/types/types';
import {ValidationObserver} from 'vee-validate';


export interface SimplertOptions {
  title?: string;
  message?: string;
  type?: string;
  customClass?: string;
  customIconUrl?: string;
  customCloseBtnText?: string;
  customCloseBtnClass?: string;
  onClose?: () => void;
  useConfirmBtn?: boolean;
  customConfirmBtnText?: string;
  customConfirmBtnClass?: string;
  onConfirm?: () => void;
  disableOverlayClick?: boolean;
  hideAllButton?: boolean;
  onOpen?: () => void;
  showXclose?: boolean;
}

export interface Simplert {
  open: (options: SimplertOptions) => void;
  close: () => void;
}

export interface VeeValidator {
  subscribe(subscriber: any, kind?: string): void;
  unsubscribe(id: string, kind?: string): void;
  validate(options?: { silent?: boolean }): Promise<boolean>;
  reset(): void;
  restoreProviderState(provider: ProviderInstance): void;
  removeProvider(id: string): void;
  setErrors(errors: Record<string, string[]>): void;
}

export class Vue extends _Vue {
  // @ts-ignore
  $refs: {
    validator: InstanceType<typeof ValidationObserver>;
  };
  $Simplert: Simplert;
}
