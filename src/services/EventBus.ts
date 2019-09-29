import {Vue} from "vue-property-decorator";

export interface IEventBus {
  $on(event: string | string[], callback: Function): this;

  $off(event?: string | string[], callback?: Function): this;

  $emit(event: string, ...args: any[]): this;
}

export abstract class EventVue extends Vue {
  public static readonly events: {[key: string]: string};
}

export const EventBus: IEventBus = new Vue();
