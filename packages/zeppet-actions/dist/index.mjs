// src/index.ts
import { selectNode } from "@zeppet/core";
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
var bindFieldToObs = (field, obs) => (element) => {
  obs.subscribe((newValue) => element[field] = newValue);
  return element;
};
var bindFieldToMappedObs = (field, obs, mapping) => (element) => {
  obs.subscribeMap((newValue) => element[field] = newValue, mapping);
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
var listIn = (obs, elementBuilder, listElementNode = "li") => (element) => {
  element.replaceChildren(...obs.getValue().map(
    (el) => {
      const item = document.createElement(listElementNode);
      return elementBuilder(el, selectNode(item)).node;
    }
  ));
  obs.subscribeMap(
    (newValue) => {
      element.replaceChildren(...newValue);
    },
    (itemList) => {
      const mappedArray = itemList.map((el) => {
        const item = document.createElement(listElementNode);
        const mappedItem = elementBuilder(el, selectNode(item));
        return mappedItem.node;
      });
      return mappedArray;
    }
  );
  return element;
};
export {
  addClass,
  addHandler,
  bindFieldToMappedObs,
  bindFieldToObs,
  bindInput,
  listIn,
  mutateOnEvent,
  onClickClassToggle,
  setText
};
