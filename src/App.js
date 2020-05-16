import React from "react";
import { createTree } from "./tree";

const initialTree = createTree({ depth: 4, fanOut: 5 });

function treeReducer(tree, action) {
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

function TreeItems({ tree, ids, dispatch }) {
  return (
    <ul>
      {ids.map(id => (
        <li key={id}>
          <input
            value={tree.nodes[id].name}
            onChange={e => {
              dispatch({ type: "UPDATE_NAME", name: e.target.value, id });
            }}
          />
          <TreeItems
            tree={tree}
            ids={tree.nodes[id].childIds}
            dispatch={dispatch}
          />
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [tree, dispatch] = React.useReducer(treeReducer, initialTree);
  return (
    <div>
      <h1>Tree</h1>
      <TreeItems tree={tree} ids={tree.rootChildIds} dispatch={dispatch} />
    </div>
  );
}
