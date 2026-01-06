import React from "react";
import { render } from "../../../test/utils";
import Checkbox from "..";

test("Component: Checkbox -> should render correctly", () => {
  const { container } = render(
    <Checkbox
      id="test-checkbox"
      label="Label"
      screenReaderErrorPrefix="Error:"
    />,
  );

  expect(container).toMatchSnapshot();
});

test("Component: Checkbox -> should render checked", () => {
  const { container } = render(
    <Checkbox
      id="test-checkbox"
      checked={true}
      onChange={() => {}}
      label="Label"
      screenReaderErrorPrefix="Error:"
    />,
  );

  expect(container).toMatchSnapshot();
});

test("Component: Checkbox -> should render disabled", () => {
  const { container } = render(
    <Checkbox
      id="test-checkbox"
      disabled={true}
      label="Label"
      screenReaderErrorPrefix="Error:"
    />,
  );

  expect(container).toMatchSnapshot();
});

test("Component: Checkbox -> should render disabled and checked", () => {
  const { container } = render(
    <Checkbox
      id="test-checkbox"
      disabled={true}
      checked={true}
      onChange={() => {}}
      label="Label"
      screenReaderErrorPrefix="Error:"
    />,
  );

  expect(container).toMatchSnapshot();
});
