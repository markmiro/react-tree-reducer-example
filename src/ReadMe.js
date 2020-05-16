import React from "react";

export function ReadMe() {
  return (
    <p>
      Keeping state of a nested tree in a reducer can be unperformant. Try
      typing into the input fields to get a sense for how laggy it feels. It's
      easy to solve this problem by debouncing the text input, but can it be
      done in other ways? What if some nodes depended on others? What if instead
      of text, it was some other property?
    </p>
  );
}
