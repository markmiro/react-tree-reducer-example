import faker from "faker";

faker.seed(123);

/**
 * Returns a list like:
 * `["Johnny John", "Bobby Bob", "Sally Smith"]`
 */
export function createList(length) {
  const generataName = () => faker.name.findName();
  return [...new Array(length)].map(generataName);
}

/**
 * Returns a nested list like:
 * [
 *  {
 *    name: "Johnny John",
 *    children: [{ name: "Bobby Bob", children: null}]
 *  },
 * {
 *  name: "Sally Smith",
 *  children: null
 * }
 * ]
 */
export function createNestedList({ depth, fanOut }) {
  if (depth < 1) return [];
  return createList(fanOut).map(name => ({
    name,
    children: createNestedList({ depth: depth - 1, fanOut })
  }));
}

/**
 * Returns nested lists that are normalized:
 * {
 *  topIds: ["id0", "id1"],
 *  nodes: {
 *    "id0": {
 *      name: "Johhny John",
 *      childIds: ["id0_A"]
 *    },
 *    "id0_A": {
 *      name: "Bobby Bob",
 *      childIds: []
 *    },
 *    "id1": {
 *      name: "Sally Smith",
 *      childIds: []
 *    }
 *  }
 * }
 */
export function normalizeNestedList(nestedList) {
  if (!nestedList) throw new Error("Requires a list");
  const initial = { topIds: [], nodes: {} };

  return nestedList.reduce((acc, item) => {
    if (!item.children) {
      const itemId = faker.random.uuid();
      return {
        ...acc,
        topIds: [...acc.topIds, itemId],
        nodes: {
          ...acc.nodes,
          [itemId]: { name: item.name, childIds: [] }
        }
      };
    }

    const itemId = faker.random.uuid();
    const itemChildrenNormalized = normalizeNestedList(item.children);
    return {
      ...acc,
      topIds: [...acc.topIds, itemId],
      nodes: {
        ...acc.nodes,
        [itemId]: {
          name: item.name,
          childIds: itemChildrenNormalized.topIds
        },
        ...itemChildrenNormalized.nodes
      }
    };
  }, initial);
}

export function createTree({ depth, fanOut }) {
  return normalizeNestedList(createNestedList({ depth, fanOut }));
}

export function treeReducer(tree, action) {
  switch (action.type) {
    case "UPDATE_NAME":
      return {
        ...tree,
        nodes: {
          ...tree.nodes,
          [action.id]: {
            ...tree.nodes[action.id],
            name: action.name
          }
        }
      };
    default:
      return tree;
  }
}
