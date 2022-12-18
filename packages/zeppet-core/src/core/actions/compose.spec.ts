import {
  describe,
  test,
  expect
} from 'vitest';

import { compose } from './compose';

/*
  * @vitest-environment jsdom
  */
describe('compose tests', () => {
  test('Compose should just contain actions', () => {
    const div = document.createElement('div');
    const secondDiv = document.createElement('div');

    const setText = (text: string) => (element: HTMLDivElement) => {
      element.textContent = text;
      return element;
    }

    const setClass = (cls: string) => (element: HTMLDivElement) => {
      element.className = cls;
      return element;
    }

    const setNewText = setText('New text');
    const setNewClass = setClass('new_class');
    const composed = compose(setNewText, setNewClass);

    const nested = setNewText(
      setNewClass(div)
    )
    const withCompose = composed(secondDiv);

    expect(nested).toStrictEqual(withCompose);
    expect(div.textContent).toBe('New text');
    expect(div.className).toBe('new_class');
    expect(div.textContent).toStrictEqual(secondDiv.textContent);
    expect(div.className).toStrictEqual(secondDiv.className);
  })

  test('Compose should execute actions in right order', () => {
    const div = document.createElement('div');

    const setText = (text: string) => (element: HTMLDivElement) => {
      element.textContent = text;
      return element;
    }

    const composed = compose(
      setText('First'),
      setText('Second'),
    )

    composed(div);

    expect(div.textContent).toBe('First')
  })
})
