// src/index.ts
var voidAction = (voidFn) => {
  return (element) => {
    voidFn(element);
    return element;
  };
};
var sideEffectAction = (sideEffect) => {
  return (element) => {
    sideEffect();
    return element;
  };
};
export {
  sideEffectAction,
  voidAction
};
