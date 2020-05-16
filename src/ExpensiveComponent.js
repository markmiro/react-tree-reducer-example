import React from "react";

function randomColor() {
  const rand255 = () => Math.floor(Math.random() * 255);
  return `rgb(${rand255()}, ${rand255()}, ${rand255()})`;
}

export function ExpensiveComponent({ cost = 1 }) {
  return (
    <div>
      {[...new Array(cost)].map(() => (
        <div
          style={{
            display: "inline-block",
            width: 4,
            height: 4,
            backgroundColor: randomColor(),
            marginRight: 1
          }}
        />
      ))}
    </div>
  );
}
