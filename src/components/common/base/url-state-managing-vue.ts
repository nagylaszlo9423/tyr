import {ComponentOptions} from 'vue';
import {UrlBaseState} from '@/components/common/base/url-base-state';
import {BaseVue} from '@/components/common/base/base.vue';

export class UrlStateManagingVue<S extends UrlBaseState> extends BaseVue implements ComponentOptions<UrlStateManagingVue<S>> {
  private pageState_: S = new this.stateCtor();

  protected get pageState(): S {
    return this.pageState_;
  }

  protected set pageState(pageState: S) {
    this.setPageState_(pageState);
    this.updateQuery();
  }

  protected constructor(private stateCtor: new () => S) {
    super();
  }

  created() {
    this.setPageState_(this.$route.query as S);
  }

  beforeDestroy() {
    this.updateQuery();
  }

  public updateQuery() {
    this.$router.push({
      path: this.$route.path,
      query: this.pageState_
    }).catch(() => {});
  }

  private setPageState_(pageState?: S) {
    if (pageState) {
      Object.keys(pageState).forEach(key => {
        (this.pageState_ as any)[key] = this.parseValues((pageState as any)[key]);
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
}
