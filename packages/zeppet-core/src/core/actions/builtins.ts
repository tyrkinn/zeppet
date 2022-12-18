import { ActionFn } from "$types/action.types";

export const setText = (text: string): ActionFn => (element) => {
  element.textContent = text;
  return element;
}

export const addClass = (newClass: string): ActionFn => (element) => {
  element.classList.add(newClass);
  return element;
}

export const addHandler =
  <K extends keyof HTMLElementEventMap, E extends (event: HTMLElementEventMap[K]) => void>
    (event: K, handler: E): ActionFn =>
    (element) => {
      element.addEventListener(event, handler)
      return element;
    }


