import React from "react";
import { ExpensiveComponent } from "./ExpensiveComponent";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

export function TreeItem({ id }) {
  const node = useSelector(tree => tree.nodes[id], shallowEqual);
  const dispatch = useDispatch();

  return (
    <li>
      <ExpensiveComponent cost={60} />
      <input
        value={node.name}
        onChange={e => {
          dispatch({ type: "UPDATE_NAME", name: e.target.value, id });
        }}
      />
      {node.childIds.length > 0 && <TreeItemsMemo ids={node.childIds} />}
    </li>
  );
}

/**
 * Displays desired `ids` from `tree` as a nested list
 * Display child ids of ids too.
 */
export function TreeItems({ ids }) {
  return (
    <div style={{ marginTop: 8, border: "1px solid" }}>
      <ExpensiveComponent cost={60} />
      <ul>
        {ids.map(id => (
          <TreeItem key={id} id={id} />
        ))}
      </ul>
    </div>
  );
}

export const TreeItemsMemo = React.memo(TreeItems);
