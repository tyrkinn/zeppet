import type { Action, ActionFn, Select, Observer } from '@zeppet/core';

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

export const bindFieldToObserver =
  <T extends HTMLElement, K extends keyof T>
    (field: K, obs: Observer<T[K]>): Action<T> => element => {
      obs.subscribe((newValue) => {
        element[field] = newValue;
      });
      return element
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
  (obs: Observer<string>): Action<HTMLInputElement> => element => {

    element.addEventListener('input', event => {
      const target = event.target as HTMLInputElement;
      obs.mutate(() => target.value);
    })

    obs.subscribe((newValue) => {
      element.value = newValue;
    })

    return element;
  }
