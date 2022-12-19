"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  addClass: () => addClass,
  addHandler: () => addHandler,
  bindFieldToMappedObs: () => bindFieldToMappedObs,
  bindFieldToObs: () => bindFieldToObs,
  bindInput: () => bindInput,
  listIn: () => listIn,
  mutateOnEvent: () => mutateOnEvent,
  onClickClassToggle: () => onClickClassToggle,
  setText: () => setText
});
module.exports = __toCommonJS(src_exports);
var import_core = require("@zeppet/core");
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
      return elementBuilder(el, (0, import_core.selectNode)(item)).node;
    }
  ));
  obs.subscribeMap(
    (newValue) => {
      element.replaceChildren(...newValue);
    },
    (itemList) => {
      const mappedArray = itemList.map((el) => {
        const item = document.createElement(listElementNode);
        const mappedItem = elementBuilder(el, (0, import_core.selectNode)(item));
        return mappedItem.node;
      });
      return mappedArray;
    }
  );
  return element;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addClass,
  addHandler,
  bindFieldToMappedObs,
  bindFieldToObs,
  bindInput,
  listIn,
  mutateOnEvent,
  onClickClassToggle,
  setText
});
