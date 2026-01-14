"use client";
import styled from "styled-components";
import { spacing } from "../../dimensions";

const Stack = styled.div<{ gap?: keyof typeof spacing }>`
  /*
   * When using the Stack component together with TextInput (or any other
   * component that sets a margin) you can easily end up with css rules for
   * the gap (margin) with the same CSS specificity. This means the order of
   * the CSS being added to the page decides which margin will get applied,
   * which can lead to surprising behaviour.
   *
   * To make sure the order doesn't matter, I have increased the specificity
   * of the margin set by the Stack component, since that is probably the
   * margin you want (why else would you be using the Stack component in the
   * first place?). This is not fool proof but should work in most cases.
   */
  && > * + * {
    margin-top: ${(props) => spacing[props.gap || "auditorium"]};
  }
`;

Stack.displayName = "Stack";

export default Stack;
