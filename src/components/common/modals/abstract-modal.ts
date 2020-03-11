import {Vue} from 'vue-property-decorator';
import {BModal} from 'bootstrap-vue';
import {ComponentOptions} from 'vue';

export abstract class AbstractModal<T = any> extends Vue implements ComponentOptions<AbstractModal> {
  protected modal: BModal;
  protected resolve: (result: T) => void;

  constructor() {
    super();
    this.resolve = () => {};
  }

  mounted(): void {
    this.modal = this.$refs.modal as BModal;
  }

  show(): Promise<T> {
    return new Promise<T>(resolve => {
      this.resolve = resolve;
      this.modal.show();
    });
  }

  hide(): void {
    this.modal.hide();
  }
}
