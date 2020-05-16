import React from "react";
import { createTree, treeReducer } from "./tree";
import { TreeItemsMemo } from "./TreeItems";
import { ReadMe } from "./ReadMe";
import { createStore } from "redux";
import { Provider, useSelector } from "react-redux";

const initialTree = createTree({ depth: 6, fanOut: 3 });
const store = createStore(treeReducer, initialTree);

function Tree() {
  const tree = useSelector(tree => tree);

  return <TreeItemsMemo ids={tree.topIds} />;
}

export default function App() {
  return (
    <div>
      <h1>Tree Performance Playground</h1>
      <ReadMe />
      <hr />
      <Provider store={store}>
        <Tree />
      </Provider>
    </div>
  );
}
