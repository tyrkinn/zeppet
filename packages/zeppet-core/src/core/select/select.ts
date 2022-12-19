import type { Action, Select } from "$types";

const isNodeList = <T extends HTMLElement>
  (node: T | NodeListOf<T>): node is NodeListOf<T> => {
  return Reflect.has(node, 'length');
}

const createSelect = <T extends HTMLElement>(node: T | NodeListOf<T>): Select<T> => ({
  node,
  use(...actions: Array<Action<T>>) {
    if (isNodeList(this.node)) {
      const updatedNodes = actions.reduce(
        (acc, action) => {
          acc.forEach((item) => {
            item = action(item);
          });
          return acc;
        },
        this.node
      )
      return { ...this, node: updatedNodes };
    } else {
      const updatedNode = actions.reduce((acc, v) => {
        return v(acc)
      }, this.node);
      return { ...this, node: updatedNode }
    }
  }
})

export const select = <T extends HTMLElement>(selector: string): Select<T> | undefined => {
  const nodes = document.querySelectorAll<T>(selector)

  if (nodes.length === 0) return undefined;
  if (nodes.length === 1) return createSelect(nodes[0]);

  return createSelect(nodes);
}

export const selectNode = <T extends HTMLElement>(node: T): Select<T> => {
  return createSelect(node);
}
