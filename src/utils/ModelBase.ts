

export class ModelBase<T> {
  constructor(init?: Partial<T>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
