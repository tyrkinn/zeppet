import { Listener, Observer } from "$types";


/**
  * Function that creates observed value
  *
  * @typeParam T - Type of value stored in observer
  *
  * @remarks
  * Provide type parameter if default value is empty array, null or undefined
  *
  * @param defaultValue - value to instansiate observer with
  *
  * @example
  * Simple observer
  * ```
  * const numObs = observe(0);
  * numObs.subscribe((newValue) => { console.log(newValue) })
  * 
  * numObs.mutate((prev) => prev + 1) // Console: 1
  * numObs.mutate(() => 20) // Console: 20
  * 
  * numObs.getValue() // -> 20
  * ```
  *
  * @example
  * subscribeMap example
  * ```
  * const personObs = observe({name: "John", age: 20})
  * personObs.subscribeMap(
  *   (newValue) => {console.log(newValue)}, // Listener
  *   (person) => person.name // Mapping function
  * )
  *
  * personObs.mutate(prev => {...prev, name: "Billy"}) // Console: "Billy"
  * ```
  * 
  * @returns Observer object with getValue, mutate, subscribe and subscribeMap methods
  */
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
    },
    subscribeMap: <K>(listener: Listener<K>, mapping: (value: T) => K) => {
      const _listener: Listener<T> = (newValue: T) => {
        listener(mapping(newValue))
      }
      listeners.push(_listener)
    }
  }
}
