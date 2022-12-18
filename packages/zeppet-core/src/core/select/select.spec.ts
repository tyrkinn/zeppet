import { select } from './select';
import { describe, test, expect, beforeEach } from 'vitest';

/*
  * @vitest-environment jsdom
  */
describe('select tests', () => {

  beforeEach(() => {
    document.body.replaceChildren();
  })

  test('select should get one element', () => {

    // Prepare dom
    const element = document.createElement('div')
    element.className = "sample";
    document.body.appendChild(element);

    // Create action
    const changeBg = (background: string) => (element: HTMLDivElement) => {
      element.style.background = background;
      return element;
    }

    // Create select
    const div = select<HTMLDivElement>('.sample')!;

    div.use(
      changeBg('black')
    )

    expect(element.style.background).toEqual('black');
    expect((div.node as HTMLDivElement).style.background).toEqual('black');
  })

  test('select should work with many elements', () => {
    // Prepare DOM
    const element = document.createElement('div')
    element.className = 'sample';
    for (let i = 0; i < 10; i++) {
      document.body.appendChild(element.cloneNode());
    }


    // Create action
    const setText = (text: string) => <T extends HTMLElement>(element: T) => {
      element.textContent = text;
      return element;
    }

    // Create select
    const divs = select<HTMLDivElement>('.sample')!;
    divs.use(
      setText('New text')
    )

    const divNodes = document.querySelectorAll('.sample') as NodeListOf<HTMLDivElement>
    const hasText: boolean[] = []

    divNodes.forEach((node) => {
      hasText.push(node.textContent === 'New text');
    })

    expect(hasText.every(element => element)).toBe(true);
  })
})
