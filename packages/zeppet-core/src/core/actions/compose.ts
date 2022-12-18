import { Action } from "$types";
import { ComposeFn } from "$types";

export const compose: ComposeFn = <T extends HTMLElement>(...actions: Action<T>[]) => {
  return actions.reduceRight((acc, fn) => ((el: T) => fn(acc(el))) as Action<T>)
}
