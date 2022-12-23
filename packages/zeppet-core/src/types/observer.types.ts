export type Mutator<T> = (previousValue: T) => T;

export type Mutate<T> = (mutator: Mutator<T>) => void;

export type Listener<T> = (newValue: T) => void;

export type Subscribe<T> = (listenerFn: Listener<T>) => void;

export type SubscribeMap<T> = <K>(listener: Listener<K>, mapping: (value: T) => K) => void;

export type Observer<T> = {
  getValue: () => T,
  mutate: Mutate<T>,
  subscribe: Subscribe<T>,
  subscribeMap: SubscribeMap<T>
}
