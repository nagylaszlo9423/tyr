
export type MappedAction = () => void;

export type MappedActionWithParam<T> = (param: T) => Promise<any>
