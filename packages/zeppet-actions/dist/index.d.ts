import { ActionFn, Select, Observer, Action } from '@zeppet/core';

declare const setText: (text: string) => ActionFn;
declare const addClass: (newClass: string) => ActionFn;
declare const addHandler: <K extends keyof HTMLElementEventMap>(eventName: K, handler: (event: HTMLElementEventMap[K]) => void) => ActionFn;
declare const onClickClassToggle: <T extends HTMLElement>(otherSelect: Select<T>, className: string) => ActionFn;
declare const bindFieldToObserver: <T extends HTMLElement, K extends keyof T>(field: K, obs: Observer<T[K]>) => Action<T>;
declare const mutateOnEvent: <T extends HTMLElement, V, K extends keyof HTMLElementEventMap>(event: K, observer: Observer<V>, mutateFn: (prev: V, event: HTMLElementEventMap[K], element: T) => V) => Action<T>;
declare const bindInput: (obs: Observer<string>) => Action<HTMLInputElement>;

export { addClass, addHandler, bindFieldToObserver, bindInput, mutateOnEvent, onClickClassToggle, setText };
