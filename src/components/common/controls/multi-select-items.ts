
export interface MultiSelectItems<T = any> {
  [key: string]: { name: string, selected?: boolean, value: T }
}
