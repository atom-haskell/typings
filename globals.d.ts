interface Function {
  bind<T> (this: T, thisArg: any): T;
}

interface ObjectConstructor {
    keys<K extends string>(o: {[Key in K]: any}): K[];
    entries<K extends string, T>(o: { [Key in K]: T }): [K, T][];
}

interface String {
  trimRight(): string
}

type Maybe<T> = T | null | undefined
