import type { ActionFn, Observer, Action } from '@zeppet/core';

export const setText = (text: string): ActionFn => element => {
  element.textContent = text;
  return element;
}

export const addClass = (...classes: string[]): ActionFn => element => {
  element.classList.add(...classes);
  return element;
}

export const toggleClass = (className: string): ActionFn => element => {
  element.classList.toggle(className)
  return element;
}

export const listen =
  <K extends keyof HTMLElementEventMap>
    (eventName: K, handler: (event: HTMLElementEventMap[K]) => void): ActionFn => element => {
      element.addEventListener(eventName, handler);
      return element;
    }

export const bindFieldToObs =
  <T extends HTMLElement, K extends keyof T>
    (field: K, obs: Observer<NonNullable<T[K]>>) => (element: T) => {
      obs.subscribe((newValue) => element[field] = newValue)
      return element
    }

export const bindFieldToMappedObs =
  <T extends HTMLElement, K extends keyof T, V>
    (field: K, obs: Observer<V>, mapping: (value: V) => T[K]): Action<T> => element => {
      obs.subscribeMap((newValue) => element[field] = newValue, mapping)
      return element;
    }


export const mutateOnEvent =
  <T extends HTMLElement, V, K extends keyof HTMLElementEventMap>
    (event: K, observer: Observer<V>, mutateFn: (prev: V, event: HTMLElementEventMap[K], element: T) => V): Action<T> => element => {
      element.addEventListener(event, (ev) => {
        observer.mutate((prev) => {
          return mutateFn(prev, ev, element);
        })
      })
      return element;
    }

export const bindInput =
  <T extends HTMLInputElement>
    (obs: Observer<string>): Action<T> => element => {

      element.addEventListener('input', event => {
        const target = event.target as HTMLInputElement; obs.mutate(() => target.value);
      })

      obs.subscribe((newValue) => {
        element.value = newValue;
      })

      return element;
    }

export const listIn =
  <T extends HTMLElement, K extends keyof HTMLElementTagNameMap, V>
    (
      obs: Observer<Array<V>>,
      elementBuilder: (arrayItem: V, arrayItemIndex: number, listItem: HTMLElementTagNameMap[K]) => HTMLElementTagNameMap[K],
      listElementNode: K = 'li' as K,
    ): Action<T> => element => {
      element.replaceChildren(...obs.getValue().map(
        (el, idx) => {
          const item = document.createElement(listElementNode);
          return elementBuilder(el, idx, item);
        }
      ))
      obs.subscribeMap<HTMLElementTagNameMap[K][]>(
        (newValue) => { element.replaceChildren(...newValue) },
        (itemList) => {
          const mappedArray = itemList.map((el, idx) => {
            const item = document.createElement(listElementNode);
            const mappedItem = elementBuilder(el, idx, item);
            return mappedItem as HTMLElementTagNameMap[K];
          })
          return mappedArray;
        });
      return element;
    }
