interface Function {
  bind<T> (this: T, thisArg: any): T;
}

interface Array<T> {
  map<U, V>(callbackfn: (value: T, index: number, array: T[]) => [U, V], thisArg?: any): [U, V][];
}

interface ObjectConstructor {
    keys<K extends string>(o: {[Key in K]: any}): K[];
    entries<K extends string, T>(o: { [Key in K]: T }): [K, T][];
}
