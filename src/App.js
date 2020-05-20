import React from "react";
import { createTree, treeReducer } from "./tree";
import { TreeItemsMemo } from "./TreeItems";
import { ReadMe } from "./ReadMe";
import { createStore } from "redux";
import { Provider, useSelector } from "react-redux";
import { DragDropArea } from "./DragDrop";

const initialTree = createTree({ depth: 6, fanOut: 3 });
const store = createStore(treeReducer, initialTree);

function Tree() {
  const tree = useSelector(tree => tree);

  // Ideally, we'd just move the item, but this logic is outside the scope of
  // what I wanna do with this sandbox test
  function handleDrop({ fromId, toId, relativePosition }) {
    console.log({ type: "MOVE_TO", fromId, toId, relativePosition });
    console.log({ from: tree.nodes[fromId], to: tree.nodes[toId] });
    alert(
      `Drag from "${tree.nodes[fromId].name}" to "${tree.nodes[toId].name}"`
    );
  }

  return (
    <div>
      <b>Nodes: </b> {Object.keys(tree.nodes).length}
      <DragDropArea onDrop={handleDrop}>
        <TreeItemsMemo ids={tree.topIds} />
      </DragDropArea>
    </div>
  );
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
