import { Action } from "$types";
/**
  * Function that compose your actions into one action
  *
  * @typeParam T - Type of HTMLElement
  *
  * @param actionsL - actions to compose
  *
  * @example
  * Basic compose
  * ```
  * // This example use actions from @zeppet/actions
  *
  * const useButton = () => {
  *   const textObs = observe("Button text");
  *   return compose(
  *     bindFieldToObserver('textContent', textObs),
  *     mutateOnEvent('click', textObs, (prev) => prev + "!")
  *   )
  * }
  * ```
  * 
  * @returns New action that includes all composed actions
  */
export const compose = <T extends HTMLElement>(...actions: Action<T>[]) => {
  return actions.reduceRight((acc, next) => (element) => next(acc(element)))
}
