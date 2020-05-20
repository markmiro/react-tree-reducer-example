import React from "react";
import { useDragSelector } from "./DragDrop";

export function DragToOverlay() {
  const drag = useDragSelector(s => s);
  if (!drag.measurements) return null;

  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: 999,
        transform: `translate(${drag.measurements.left}px,${
          drag.measurements.top
        }px)`,
        top: 0,
        left: 0,
        width: drag.measurements.width,
        height: drag.measurements.height,
        transitionTimingFunction: "easeOut",
        transitionDuration: "200ms",
        transitionProperty: "background",
        backgroundColor: "#ff000055",
        ...{
          NONE: {},
          PREV: {
            borderTop: "1px solid white"
          },
          NEXT: {
            borderBottom: "1px solid white"
          },
          NEXT_INTO: {
            backgroundColor: "#ffffff33"
          }
        }[drag.relativePosition]
      }}
    />
  );
}
