import { Action } from '@zeppet/core';

export const voidAction = <T extends HTMLElement>(voidFn: (element: T) => void): Action<T> => {
  return (element: T) => {
    voidFn(element);
    return element;
  }
}

export const sideEffectAction = <T extends HTMLElement>(sideEffect: () => void): Action<T> => {
  return (element: T) => {
    sideEffect();
    return element;
  }
}
