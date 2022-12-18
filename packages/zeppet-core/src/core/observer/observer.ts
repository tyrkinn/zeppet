import { Listener, Observer } from "$types";

export const observe = <T>(defaultValue: T): Observer<T> => {
  let value = defaultValue;
  const listeners: Array<Listener<T>> = [];

  return {
    getValue: () => value,
    mutate: (mutator) => {
      value = mutator(value)
      listeners.forEach(listener => listener(value))
    },
    subscribe: (listener) => {
      listeners.push(listener);
    }
  }
}
