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
  compose: () => compose,
  observe: () => observe,
  select: () => select
});
module.exports = __toCommonJS(src_exports);

// src/core/select/select.ts
var isNodeList = (node) => {
  return Reflect.has(node, "length");
};
var createSelect = (node) => ({
  node,
  use(...actions) {
    if (isNodeList(this.node)) {
      const updatedNodes = actions.reduce(
        (acc, action) => {
          acc.forEach((item) => {
            item = action(item);
          });
          return acc;
        },
        this.node
      );
      return { ...this, node: updatedNodes };
    } else {
      const updatedNode = actions.reduce((acc, v) => {
        return v(acc);
      }, this.node);
      return { ...this, node: updatedNode };
    }
  }
});
var select = (selector) => {
  const nodes = document.querySelectorAll(selector);
  if (nodes.length === 0)
    return void 0;
  if (nodes.length === 1)
    return createSelect(nodes[0]);
  return createSelect(nodes);
};

// src/core/actions/compose.ts
var compose = (...actions) => {
  return actions.reduceRight((acc, fn) => (el) => fn(acc(el)));
};

// src/core/observer/observer.ts
var observe = (defaultValue) => {
  let value = defaultValue;
  const listeners = [];
  return {
    getValue: () => value,
    mutate: (mutator) => {
      value = mutator(value);
      listeners.forEach((listener) => listener(value));
    },
    subscribe: (listener) => {
      listeners.push(listener);
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compose,
  observe,
  select
});
