import {Vue} from "vue-property-decorator";

export interface IEventBus {
  $on(event: string | string[], callback: Function): this;
  $off(event?: string | string[], callback?: Function): this;
  $emit(event: string, ...args: any[]): this;
}

export const EventBus: IEventBus = new Vue();
