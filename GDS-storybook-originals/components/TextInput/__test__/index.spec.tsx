import React from "react";
import { render } from "../../../test/utils";
import TextInput from "../index";

test("Component: TextInput -> Should render correctly", () => {
  const { container } = render(
    <TextInput
      autoComplete="given-name"
      id="test-input"
      label="First name"
      onChange={() => {}}
      value=""
      screenReaderErrorPrefix="Error:"
    />,
  );

  expect(container).toMatchSnapshot();
});
