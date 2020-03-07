
export class MultiSelectItems<T = any> {
  [key: string]: { name: string, selected?: boolean, value: T }

  static of<T>(items: Partial<MultiSelectItems<T>>, selectedValues?: T[]): MultiSelectItems<T> {
    const result = new MultiSelectItems();
    Object.assign(result, items);
    if (selectedValues) {
      Object.keys(result).forEach(key => result[key].selected = selectedValues.indexOf(result[key].value) > -1);
    }
    return result;
  }
}
