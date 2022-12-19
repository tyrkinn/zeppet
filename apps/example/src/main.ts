import './style.css';
import { select, observe, compose } from '@zeppet/core';
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

const { p, input } = useBindedInputAction<HTMLButtonElement>()

select<HTMLInputElement>("#inp")!.use(
  input
)

select<HTMLButtonElement>("#add")!.use(
  p
)

