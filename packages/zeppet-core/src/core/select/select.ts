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

/**
  * Select one or multiple elements by CSS selector
  *
  * @typeParam T - HTMLElement kind
  * 
  * @remarks
  * You can provide type parameter to specify type of HTMLElement
  *
  * @example
  * Singe select example
  * ```
  * // HTML - <div id="app"> </div>
  * const divSelect = select<HTMLDivElement>("#app"); // -> Select<HTMLDivElement>
  * const wrongSelect = select("#wrong"); // -> undefined
  * ```
  *
  * @example
  * Multi select example
  * ```
  * // HTML <div id="item"></div><br/><div id="item"></div>
  * const divsSelect = select('#item') // -> Select containing both divs
  * ```
  * 
  * @example
  * Use function 
  * ```
  * // HTML <div id="item"></div>
  * // Here using setText action from @zeppet/actions
  * select("#item")!.use(setText("Hello World"))
  * // Out HTML <div id="item">Hello World</div>
  * ```
  *
  * @param selector - CSS selector to search elements by
  *
  * @returns Select object or undefined if no elements matching given selector
  */
export const select = <T extends HTMLElement>(selector: string): Select<T> | undefined => {
  const nodes = document.querySelectorAll<T>(selector)

  if (nodes.length === 0) return undefined;
  if (nodes.length === 1) return createSelect(nodes[0]);

  return createSelect(nodes);
}

export const selectNode = <T extends HTMLElement>(node: T): Select<T> => {
  return createSelect(node);
}
