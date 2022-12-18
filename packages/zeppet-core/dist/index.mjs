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
export {
  compose,
  observe,
  select
};
