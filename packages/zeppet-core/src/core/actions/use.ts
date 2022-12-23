import { Action } from "$types";
import { compose } from "./compose";

/**
  * Alias to compose function
  *
  * @typeParam T - Type of HTMLElement
  *
  * @see compose
  *
  * @param element to use actions on
  * @param actionsL - actions to compose
  *
  * @returns Element with applyed actions
  */
export const use = <T extends HTMLElement>(element: T, ...actions: Action<T>[]) => {
  return compose(...actions)(element);
}

export const useMany = <T extends HTMLElement>(elements: T[], ...actions: Action<T>[]) => {
  return elements.map(compose(...actions))
}
