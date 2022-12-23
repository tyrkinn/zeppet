import './style.css';
import { observe, compose, selectOne } from '@zeppet/core';
import { bindInput, bindFieldToObs } from '@zeppet/actions';

const useBindedInputAction = <T extends HTMLElement>() => {
  const inputObs = observe("");
  return {
    input: compose(
      bindInput(inputObs),
    ),
    p: compose<T>(
      bindFieldToObs('textContent', inputObs)
    )
  }
}

const { p, input } = useBindedInputAction()

input(
  selectOne<HTMLInputElement>("#inp")!
)

p(
  selectOne<HTMLButtonElement>("#add")!
)
