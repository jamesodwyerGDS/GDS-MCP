import React from "react";
import { render } from "../../../test/utils";
import AlertBoxLegacy from "../index";

test("Component: AlertBoxLegacy -> Should render correctly", () => {
  const { container } = render(<AlertBoxLegacy title="This is the title" />);

  expect(container).toMatchSnapshot();
});

test("Component: AlertBoxLegacy -> Should render children correctly", () => {
  const { container } = render(
    <AlertBoxLegacy title="This is the title">
      <p>Child paragraph</p>
      <p>And another one</p>
    </AlertBoxLegacy>,
  );

  expect(container).toMatchSnapshot();
});
