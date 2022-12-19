import { ActionFn, Select, Observer, Action } from '@zeppet/core';

declare const setText: (text: string) => ActionFn;
declare const addClass: (newClass: string) => ActionFn;
declare const addHandler: <K extends keyof HTMLElementEventMap>(eventName: K, handler: (event: HTMLElementEventMap[K]) => void) => ActionFn;
declare const onClickClassToggle: <T extends HTMLElement>(otherSelect: Select<T>, className: string) => ActionFn;
declare const bindFieldToObs: <T extends HTMLElement, K extends keyof T>(field: K, obs: Observer<NonNullable<T[K]>>) => Action<T>;
declare const bindFieldToMappedObs: <T extends HTMLElement, K extends keyof T, V>(field: K, obs: Observer<V>, mapping: (value: V) => T[K]) => Action<T>;
declare const mutateOnEvent: <T extends HTMLElement, V, K extends keyof HTMLElementEventMap>(event: K, observer: Observer<V>, mutateFn: (prev: V, event: HTMLElementEventMap[K], element: T) => V) => Action<T>;
declare const bindInput: <T extends HTMLInputElement>(obs: Observer<string>) => Action<T>;
declare const listIn: <T extends HTMLElement, K extends keyof HTMLElementTagNameMap, V>(obs: Observer<V[]>, elementBuilder: (arrayItem: V, listItem: Select<HTMLElementTagNameMap[K]>) => Select<HTMLElementTagNameMap[K]>, listElementNode?: K) => Action<T>;

export { addClass, addHandler, bindFieldToMappedObs, bindFieldToObs, bindInput, listIn, mutateOnEvent, onClickClassToggle, setText };
