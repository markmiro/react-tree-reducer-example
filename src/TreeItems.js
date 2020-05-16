import React from "react";
import { ExpensiveComponent } from "./ExpensiveComponent";

/**
 * Displays desired `ids` from `tree` as a nested list
 * Display child ids of ids too.
 */
export function TreeItems({ tree, dispatch, ids }) {
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
          <ExpensiveComponent cost={5} />
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
