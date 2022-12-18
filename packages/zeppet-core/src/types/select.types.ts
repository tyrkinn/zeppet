import { Action } from "$types/action.types"

export type SelectFn =
  <T extends HTMLElement>
    (selector: string) => Select<T> | undefined

export type UseFunction<T extends HTMLElement> =
  (...actions: Array<Action<T>>) => Select<T>

export type Select<T extends HTMLElement> = {
  node: T | NodeListOf<T>,
  use: UseFunction<T>
}

