import React from "react";
import Skeleton from "../Skeleton";
import { render } from "../../../test/utils";

it("renders Skeleton component", () => {
  const { container } = render(<Skeleton width="10px" height="30ch" />);
  expect(container).toMatchSnapshot();
});

it("renders Skeleton component with default props", () => {
  const { container } = render(<Skeleton />);
  expect(container).toMatchSnapshot();
});
