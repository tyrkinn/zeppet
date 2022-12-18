// src/index.ts
var setText = (text) => (element) => {
  element.textContent = text;
  return element;
};
var addClass = (newClass) => (element) => {
  element.classList.add(newClass);
  return element;
};
var addHandler = (eventName, handler) => (element) => {
  element.addEventListener(eventName, handler);
  return element;
};
var onClickClassToggle = (otherSelect, className) => (element) => {
  otherSelect.use(
    addHandler("click", () => {
      element.classList.toggle(className);
    })
  );
  return element;
};
var bindFieldToObserver = (field, obs) => (element) => {
  obs.subscribe((newValue) => {
    element[field] = newValue;
  });
  return element;
};
var mutateOnEvent = (event, observer, mutateFn) => (element) => {
  element.addEventListener(event, (ev) => {
    observer.mutate((prev) => {
      return mutateFn(prev, ev, element);
    });
  });
  return element;
};
var bindInput = (obs) => (element) => {
  element.addEventListener("input", (event) => {
    const target = event.target;
    obs.mutate(() => target.value);
  });
  obs.subscribe((newValue) => {
    element.value = newValue;
  });
  return element;
};
export {
  addClass,
  addHandler,
  bindFieldToObserver,
  bindInput,
  mutateOnEvent,
  onClickClassToggle,
  setText
};
