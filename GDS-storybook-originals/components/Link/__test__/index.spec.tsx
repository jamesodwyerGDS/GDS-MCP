import React from "react";
import { render } from "../../../test/utils";
import Link from "../index";

test("Component: Link -> Should render correctly", () => {
  const { container } = render(<Link>Click me</Link>);

  expect(container).toMatchSnapshot();
});
