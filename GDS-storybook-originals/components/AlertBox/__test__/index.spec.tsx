import React from "react";
import { render } from "../../../test/utils";
import AlertBox from "..";

test("Component: AlertBox -> Should render correctly", () => {
  const { container } = render(<AlertBox title="This is the title" />);

  expect(container).toMatchSnapshot();
});
