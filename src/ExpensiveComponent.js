import React from "react";

function randomColor() {
  const rand255 = () => Math.floor(Math.random() * 255);
  return `rgb(${rand255()}, ${rand255()}, ${rand255()})`;
}

/**
 * This component helps to visualize expensive operations.
 * Use the `cost` prop integer to scale up and down the cost
 */
export function ExpensiveComponent({ cost = 1 }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {[...new Array(cost)].map((_, i) => (
        <div
          key={i}
          style={{
            width: 4,
            height: 4,
            backgroundColor: randomColor(),
            flexShrink: 0
          }}
        />
      ))}
    </div>
  );
}
