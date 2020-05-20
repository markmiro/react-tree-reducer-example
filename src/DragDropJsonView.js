import React from "react";
import { useDragSelector } from "./DragDrop";

export function DragDropJsonView() {
  const state = useDragSelector(s => s);
  return <pre>{JSON.stringify(state, null, "  ")}</pre>;
}
