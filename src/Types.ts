import {Vue as _Vue} from 'vue-property-decorator';

export interface Bv {
  
}

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

export class Vue extends _Vue {
  $Simplert: Simplert;
}
