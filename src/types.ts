import {Vue as _Vue, Watch} from 'vue-property-decorator';
import {ProviderInstance} from 'vee-validate/dist/types/types';
import {ValidationObserver} from 'vee-validate';
import {ComponentOptions} from 'vue';
import {Dictionary} from 'vue-router/types/router';

export interface VeeValidator {
  subscribe(subscriber: any, kind?: string): void;

  unsubscribe(id: string, kind?: string): void;

  validate(options?: { silent?: boolean }): Promise<boolean>;

  reset(): void;

  restoreProviderState(provider: ProviderInstance): void;

  removeProvider(id: string): void;

  setErrors(errors: Record<string, string[]>): void;
}
