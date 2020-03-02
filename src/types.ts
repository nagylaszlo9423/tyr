import {Vue as _Vue} from 'vue-property-decorator';
import {ProviderInstance} from 'vee-validate/dist/types/types';
import {ValidationObserver} from 'vee-validate';

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
  } & any;
}
