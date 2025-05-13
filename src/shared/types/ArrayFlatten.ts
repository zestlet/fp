export type ArrayFlatten<T, Depth extends number = 1> = Depth extends 0
  ? T
  : T extends Array<infer Item>
    ? Item extends Array<any>
      ? ArrayFlatten<Item, [-1, 0, 1, 2, 3, 4, 5][Depth]> | Exclude<Item, Array<any>>
      : Item
    : never;

export type DeepFlatten<T> = T extends Array<infer Item> ? (Item extends Array<any> ? DeepFlatten<Item> : Item) : never;
