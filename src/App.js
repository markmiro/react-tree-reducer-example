import React from "react";
import { createTree, treeReducer } from "./tree";
import { TreeItems } from "./TreeItems";
import { ReadMe } from "./ReadMe";

const initialTree = createTree({ depth: 3, fanOut: 7 });

export default function App() {
  const [tree, dispatch] = React.useReducer(treeReducer, initialTree);

  return (
    <div>
      <h1>Tree Performance Playground</h1>
      <ReadMe />
      <hr />
      <TreeItems tree={tree} dispatch={dispatch} ids={tree.topIds} />
    </div>
  );
}
