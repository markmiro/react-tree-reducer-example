import React from "react";
import { ExpensiveComponent } from "./ExpensiveComponent";
import { useSelector, useDispatch } from "react-redux";
import style from "./TreeItem.module.css";
import { DragDropItem } from "./DragDrop";
import c from "classnames";

export function TreeItem({ id }) {
  const node = useSelector(tree => tree.nodes[id]);
  const dispatch = useDispatch();

  return (
    <DragDropItem id={id}>
      {({ dragProps, isOver, isDragging }) => (
        <li {...dragProps}>
          <div
            className={c(
              style.item,
              isOver && style.over,
              isDragging && style.draggingDisable
            )}
          >
            <input
              value={node.name}
              onChange={e => {
                dispatch({ type: "UPDATE_NAME", name: e.target.value, id });
              }}
            />
            <ExpensiveComponent cost={20} />
          </div>
          <div className={c(isDragging && style.draggingDisable)}>
            {node.childIds.length > 0 && <TreeItemsMemo ids={node.childIds} />}
          </div>
        </li>
      )}
    </DragDropItem>
  );
}

/**
 * Displays desired `ids` from `tree` as a nested list
 * Display child ids of ids too.
 */
export function TreeItems({ ids }) {
  return (
    <ul>
      {/* <ExpensiveComponent cost={20} /> */}
      {ids.map(id => (
        <TreeItem key={id} id={id} />
      ))}
    </ul>
  );
}

export const TreeItemsMemo = React.memo(TreeItems);
