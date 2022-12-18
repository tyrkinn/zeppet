type Action<T extends HTMLElement> = (element: T) => T;
type ActionFn = <T extends HTMLElement>(element: T) => T;
type ComposeFn = <T extends HTMLElement>(...actionsL: Action<T>[]) => Action<T>;

type SelectFn = <T extends HTMLElement>(selector: string) => Select<T> | undefined;
type UseFunction<T extends HTMLElement> = (...actions: Array<Action<T>>) => Select<T>;
type Select<T extends HTMLElement> = {
    node: T | NodeListOf<T>;
    use: UseFunction<T>;
};

type ObserveFn = <T>(defaultValue: T) => Observer<T>;
type Mutator<T> = (previousValue: T) => T;
type Mutate<T> = (mutator: Mutator<T>) => void;
type Listener<T> = (newValue: T) => void;
type Subscribe<T> = (listenerFn: Listener<T>) => void;
type Observer<T> = {
    getValue: () => T;
    mutate: Mutate<T>;
    subscribe: Subscribe<T>;
};

declare const select: <T extends HTMLElement>(selector: string) => Select<T> | undefined;

declare const compose: ComposeFn;

declare const observe: <T>(defaultValue: T) => Observer<T>;

export { Action, ActionFn, ComposeFn, Listener, Mutate, Mutator, ObserveFn, Observer, Select, SelectFn, Subscribe, UseFunction, compose, observe, select };
