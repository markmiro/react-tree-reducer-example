import uid from "uid";
import faker from "faker";

export function createList(length) {
  const generataName = () => faker.name.findName();
  return [...new Array(length)].map(generataName);
}

export function createNestedLists({ depth, fanOut }) {
  if (depth < 1) return null;
  return createList(fanOut).map(name => ({
    name,
    children: createNestedLists({ depth: depth - 1, fanOut })
  }));
}

export function normalizeNestedLists(nestedArr) {
  const initial = { rootChildIds: [], nodes: {} };
  if (!nestedArr) return initial;

  return nestedArr.reduce((acc, { name, children }) => {
    const id = uid();
    const normalizedChildren = normalizeNestedLists(children);
    const childIds = normalizedChildren.rootChildIds;
    return {
      ...acc,
      rootChildIds: [...acc.rootChildIds, id],
      nodes: {
        ...acc.nodes,
        [id]: {
          name,
          childIds
        },
        ...normalizedChildren.nodes
      }
    };
  }, initial);
}

export function normalizeNestedListsWithRoot(nestedArr) {
  const { nodes, rootChildIds } = normalizeNestedLists(nestedArr);
  const rootId = uid();

  return {
    rootId,
    nodes: {
      [rootId]: {
        name: "ROOT",
        childIds: rootChildIds
      },
      ...nodes
    }
  };
}

export function createTree({ depth, fanOut }) {
  const nested = createNestedLists({ depth, fanOut });
  console.log(nested);
  return normalizeNestedLists(nested);
}
