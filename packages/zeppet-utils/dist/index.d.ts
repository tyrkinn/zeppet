import { Action } from '@zeppet/core';

declare const voidAction: <T extends HTMLElement>(voidFn: (element: T) => void) => Action<T>;
declare const sideEffectAction: <T extends HTMLElement>(sideEffect: () => void) => Action<T>;

export { sideEffectAction, voidAction };
