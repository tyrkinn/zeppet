import './style.css';
import { select, observe, Observer } from '@zeppet/core';
import { addClass, setText, bindFieldToObserver, mutateOnEvent, bindInput } from '@zeppet/actions';

const textObs = observe("Some text");

select('.btn')!.use(
  setText('Button'),
  addClass('button'),
  mutateOnEvent('click', textObs, (prev) => prev)
)

select('.text')!.use(
  bindFieldToObserver('textContent', textObs as Observer<string | null>)
)

select<HTMLInputElement>('.inp')!.use(
  bindInput(textObs),
)

select<HTMLParagraphElement>('.out')!.use(
  bindFieldToObserver('textContent', textObs as Observer<string | null>)
)

