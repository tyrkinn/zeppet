import { __queryOne, __queryAll } from '../helpers';

/**
  * Same as document.querySelectorAll but returns Array<HtmlElement>
  *
  * @param selector - CSS selector to search elements by
  *
  * @returns Array of HTMLElements
  */
export const select = (selector: string): Array<HTMLElement> => {
  return __queryAll(selector);
}

export const selectOne = <T extends HTMLElement>(selector: string): T | undefined => {
  const element = __queryOne(selector);
  if (!element) return;
  return element as T;
}
