const __nodeListToArray =
  <T extends HTMLElement>
    (nodeList: NodeListOf<T>): Array<T> => {
    return Array.prototype.slice.call(nodeList);
  }

export const __queryOne = (selector: string): HTMLElement | null => {
  return document.querySelector(selector);
}

export const __queryAll = <T extends HTMLElement>(selector: string): Array<T> => {
  const nodes = document.querySelectorAll(selector) as NodeListOf<T>;
  return __nodeListToArray(nodes);
}

export const withDefault = <T>(optionFn: () => T | undefined, defaultValue: T): T => {
  return optionFn() || defaultValue
}
