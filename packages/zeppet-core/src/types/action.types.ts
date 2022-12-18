export type Action<T extends HTMLElement> =
  (element: T) => T

export type ActionFn = <T extends HTMLElement>(element: T) => T

export type ComposeFn = <T extends HTMLElement>(...actionsL: Action<T>[]) => Action<T>
