import { Action } from "$types";
import { ComposeFn } from "$types";

/**
  * Function that compose your actions into one action
  *
  * @typeParam T - HTMLElement kind of composed Action
  *
  * @remarks
  * Provide type parameter if you want your action to be used only for this type of elementsh
  *
  * @param actions - actions to compose
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
export const compose: ComposeFn = <T extends HTMLElement>(...actions: Action<T>[]) => {
  return actions.reduceRight((acc, fn) => ((el: T) => fn(acc(el))) as Action<T>)
}
