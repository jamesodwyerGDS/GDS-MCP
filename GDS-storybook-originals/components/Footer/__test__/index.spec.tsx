import React from "react";
import { render } from "../../../test/utils";
import Footer from "..";

test("Component: Footer -> Should render correctly", () => {
  const { container } = render(<Footer />);

  expect(container).toMatchSnapshot();
});
