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

export class Vue extends _Vue {
  // @ts-ignore
  $refs: {
    validator: InstanceType<typeof ValidationObserver>;
  } & any;
}

export class VueUrlState<S extends { [key: string]: any }> extends Vue implements ComponentOptions<VueUrlState<S>> {
  private pageState_: { [key: string]: any } = new this.stateCtor();

  get pageState(): S {
    return this.pageState_ as S;
  }

  protected setPageState(pageState?: Partial<S> | Dictionary<any>) {
    this.setPageState_(pageState);
    this.updateQuery();
  }

  protected constructor(private stateCtor: new () => S) {
    super();
  }

  created() {
    this.setPageState_(this.$route.query);
  }

  beforeDestroy() {
    this.updateQuery();
  }

  private setPageState_(pageState?: Partial<S> | Dictionary<any>) {
    if (pageState) {
      Object.keys(pageState).forEach(key => {
        this.pageState_[key] = this.parseValues(pageState[key]);
      });
    }
  }

  private parseValues(obj: any): any {
    if (obj !== undefined && obj !== null) {
      const numberParam = parseInt(obj);
      if (Array.isArray(obj)) {
        return (obj as Array<any>).map(this.parseValues);
      } else if (!isNaN(numberParam)) {
        return numberParam;
      }
    }

    return obj;
  }

  private updateQuery() {
    this.$router.push({
      path: this.$route.path,
      query: this.pageState_
    }).catch(() => {});
  }
}

