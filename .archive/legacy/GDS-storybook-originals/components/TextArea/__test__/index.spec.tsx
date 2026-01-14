import React from "react";
import { render } from "../../../test/utils";
import TextArea from "../index";

test("Component: TextArea -> Should render correctly", () => {
  const { container } = render(
    <TextArea
      id="test-input"
      label="First name"
      onChange={() => {}}
      value=""
      screenReaderErrorPrefix="Error:"
    />,
  );

  expect(container).toMatchSnapshot();
});
