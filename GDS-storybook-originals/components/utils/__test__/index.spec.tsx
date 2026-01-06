import React from "react";
import { render } from "../../../test/utils";
import Stack from "../Stack";
import { spacing } from "../../../dimensions";
import IconButton from "../IconButton";

describe("Stack", () => {
  test("renders correctly with no `gap` provided", () => {
    const { container } = render(<Stack />);

    expect(container).toMatchSnapshot();
  });

  const allSpacingVariables = Object.keys(spacing);

  test.each(allSpacingVariables)(
    "renders correctly with %s `gap` provided",
    (s) => {
      // Type assertion here because Object.keys returns a type of string[]
      const { container } = render(<Stack gap={s as keyof typeof spacing} />);

      expect(container).toMatchSnapshot();
    },
  );
});

describe("IconButton", () => {
  test("renders with minTapSize with no `width` or `height` provided", () => {
    const { container } = render(<IconButton />);

    expect(container).toMatchSnapshot();
  });

  test("renders with given `width` or `height` provided", () => {
    const { container } = render(<IconButton height={12} width={12} />);

    expect(container).toMatchSnapshot();
  });

  test("renders with given `type` provided", () => {
    const { container } = render(<IconButton type="submit" />);

    expect(container).toMatchSnapshot();
  });
});
