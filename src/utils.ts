import { baseInjectComponentName } from "./constants";

export const getResolveComponents = (code: string): IterableIterator<RegExpMatchArray> =>
  code.matchAll(/_resolveComponent\("([a-z]|[A-Z]|-)+"\)/g);

export const getInjectComponentName = (symbol: number | string) =>
  `${baseInjectComponentName}${symbol}`;
