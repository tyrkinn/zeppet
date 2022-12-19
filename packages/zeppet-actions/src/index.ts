import type { Action, ActionFn, Select, Observer } from '@zeppet/core';
import { selectNode } from '@zeppet/core';

export const setText = (text: string): ActionFn => element => {
  element.textContent = text;
  return element;
}

export const addClass = (newClass: string): ActionFn => element => {
  element.classList.add(newClass);
  return element;
}

export const addHandler =
  <K extends keyof HTMLElementEventMap>
    (eventName: K, handler: (event: HTMLElementEventMap[K]) => void): ActionFn => element => {
      element.addEventListener(eventName, handler);
      return element;
    }

export const onClickClassToggle =
  <T extends HTMLElement>
    (otherSelect: Select<T>, className: string): ActionFn => element => {
      otherSelect.use(
        addHandler('click', () => {
          element.classList.toggle(className)
        })
      )
      return element;
    }


export const bindFieldToObs =
  <T extends HTMLElement, K extends keyof T>
    (field: K, obs: Observer<NonNullable<T[K]>>): Action<T> => element => {
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
      elementBuilder: (arrayItem: V, listItem: Select<HTMLElementTagNameMap[K]>) => Select<HTMLElementTagNameMap[K]>,
      listElementNode: K = 'li' as K,
    ): Action<T> => element => {
      element.replaceChildren(...obs.getValue().map(
        el => {
          const item = document.createElement(listElementNode);
          return elementBuilder(el, selectNode(item)).node as HTMLElementTagNameMap[K];
        }
      ))
      obs.subscribeMap<HTMLElementTagNameMap[K][]>(
        (newValue) => { element.replaceChildren(...newValue) },
        (itemList) => {
          const mappedArray = itemList.map((el) => {
            const item = document.createElement(listElementNode);
            const mappedItem = elementBuilder(el, selectNode(item));
            return mappedItem.node as HTMLElementTagNameMap[K];
          })
          return mappedArray;
        });
      return element;
    }
