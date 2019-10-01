

export abstract class BaseDto<Self extends BaseDto<any>> {
  public constructor(init?: Partial<Self>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
