export type ArrayFlatten<T, Depth extends number = 1> = Depth extends 0 ? T : ArrayFlatten<FlattenArray<T>, [-1, 0, 1, 2, 3, 4, 5][Depth]>;

type FlattenArrayInner<T> = T extends readonly (infer Item)[] ? (Item extends readonly any[] ? Item[number][] : Item[]) : T[];
export type FlattenArray<T> = FlattenArrayInner<T>[number][];
