import React from "react";
import { render, fireEvent } from "../../../test/utils";
import PasswordInput from "..";

test("Component: PasswordInput -> Should render correctly", () => {
  const { container } = render(
    <PasswordInput
      id="test-input"
      label="Password"
      showLabel="Show"
      hideLabel="Hide"
      screenReaderErrorPrefix="Error:"
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Component: PasswordInput -> Should toggle hidden/visible", () => {
  const { getByLabelText, getByText } = render(
    <PasswordInput
      id="test-input"
      label="Password"
      showLabel="Show"
      hideLabel="Hide"
      screenReaderErrorPrefix="Error:"
    />,
  );

  const input = getByLabelText(/password/i) as HTMLInputElement;
  expect(input.type).toBe("password"); // input value starts off hidden
  const button = getByText(/show/i);
  fireEvent.click(button);
  getByText(/hide/i); // button label should toggle
  expect(input.type).toBe("text"); // input value should now be visible
  fireEvent.click(button); // toggle back to the starting state
  getByText(/show/i);
  expect(input.type).toBe("password");
});
