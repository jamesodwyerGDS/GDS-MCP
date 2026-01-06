import React from "react";
import { render } from "../../../test/utils";
import RadioButton from "..";

test("Component: RadioButton -> should render correctly with label", () => {
  const { container } = render(
    <RadioButton
      id="test-radio"
      label="Label"
      screenReaderErrorPrefix="Error:"
    />,
  );

  expect(container).toMatchSnapshot();
});

test("Component: RadioButton -> should render checked", () => {
  const { container } = render(
    <RadioButton
      id="test-radio"
      checked={true}
      onChange={() => {}}
      label="Label"
      screenReaderErrorPrefix="Error:"
    />,
  );

  expect(container).toMatchSnapshot();
});

test("Component: RadioButton -> should render disabled", () => {
  const { container } = render(
    <RadioButton
      id="test-radio"
      disabled={true}
      label="Label"
      screenReaderErrorPrefix="Error:"
    />,
  );

  expect(container).toMatchSnapshot();
});

test("Component: RadioButton -> should render disabled and checked", () => {
  const { container } = render(
    <RadioButton
      disabled={true}
      checked={true}
      onChange={() => {}}
      id="test-radio"
      label="Label"
      screenReaderErrorPrefix="Error:"
    />,
  );

  expect(container).toMatchSnapshot();
});
