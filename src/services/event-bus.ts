import {Vue} from 'vue-property-decorator';


export interface IEventBus {
  $on(event: string | string[], callback: Function): this;

  $off(event?: string | string[], callback?: Function): this;

  $emit(event: string, ...args: any[]): this;

  $offOn(event: string | string[], callback: Function): this;

  $onOff(event: string | string[], callback: Function): this;
}

export class EventBus extends Vue implements IEventBus {
  $offOn(event: string | string[], callback: Function): this {
    this.$off(event, callback);
    this.$on(event, callback);
    return this;
  }

  $onOff(event: string | string[], callback: Function): this {
    this.$on(event, (...params: []) => {
      callback(params);
      this.$off(event);
    });
    return this;
  }

}

export const eventBus: IEventBus = new EventBus();
