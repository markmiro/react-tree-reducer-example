import { createStore } from "redux";
import React, { useEffect } from "react";
import { Provider, createDispatchHook, createSelectorHook } from "react-redux";

const initialState = {
  fromId: null,
  toId: null,
  relativePosition: null
};

const DragDropContext = React.createContext(initialState);

export const useDragSelector = createSelectorHook(DragDropContext);
const useDragDispatch = createDispatchHook(DragDropContext);

function reducer(state, action) {
  switch (action.type) {
    case "START": {
      console.log(action.fromId);
      return {
        ...state,
        fromId: action.fromId
      };
    }
    case "DRAG_OVER": {
      return {
        ...state,
        measurements: action.measurements
      };
    }
    case "DROP": {
      return {
        ...state,
        toId: action.toId,
        relativePosition: action.relativePosition
      };
    }
    case "END":
    default:
      return initialState;
  }
}

const store = createStore(reducer, initialState);

export function DragDropArea({ children, onDrop }) {
  // Ideally, we'd somehow subscribe to dispatch events and call `onDrop` when
  // it happens. Instead, subscribing to store changes and then when `toId` exists,
  // assume the "DROP" event happened and send up all state up via `onDrop`
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      if (state.toId) {
        onDrop(state);
        store.dispatch({ type: "END" });
      }
    });
    return unsubscribe;
  }, [onDrop]);

  return (
    <Provider context={DragDropContext} store={store}>
      {children}
    </Provider>
  );
}

export function DragDropItem({ id, children }) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isOver, setIsOver] = React.useState(false);
  const dragDispatch = useDragDispatch();

  const dragProps = {
    draggable: true,
    onDragStart: e => {
      e.stopPropagation();
      setIsDragging(true);
      dragDispatch({ type: "START", fromId: id });
    },
    onDragEnd: () => {
      setIsDragging(false);
      dragDispatch({ type: "END" });
    },
    onDragOver: e => {
      e.preventDefault(); // Make it possible for `onDrop` to get called when it happens
      e.stopPropagation();
      if (isDragging) return;

      // https://stackoverflow.com/a/35940276
      function getScrollParent(node) {
        if (node == null) {
          return null;
        }

        if (node.scrollHeight > node.clientHeight) {
          return node;
        } else {
          return getScrollParent(node.parentNode);
        }
      }

      const el = e.currentTarget;
      const scrollParent = getScrollParent(el);
      dragDispatch({
        type: "DRAG_OVER",
        measurements: {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.offsetWidth,
          height: el.offsetHeight,
          // Sometimes there's no scroll parent because no parents are currently scrollable
          mouseX: e.clientX + (scrollParent?.scrollLeft || 0),
          mouseY: e.clientY + (scrollParent?.scrollTop || 0)
        }
      });

      setIsOver(true);
    },
    onDragLeave: () => {
      setIsOver(false);
      dragDispatch({
        type: "DRAG_OVER",
        measurements: null
      });
    },
    onDrop: e => {
      e.stopPropagation();
      dragDispatch({
        type: "DROP",
        toId: id,
        relativePosition: "AFTER"
      });
      setIsOver(false);
    }
  };

  return children({ isDragging, isOver, dragProps });
}
