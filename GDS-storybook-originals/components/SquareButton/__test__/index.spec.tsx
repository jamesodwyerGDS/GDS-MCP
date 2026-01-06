import React from "react";
import styled from "styled-components";
import SquareButton from "../index";
import { render, screen } from "../../../test/utils";

test("Should render as primary SquareButton with accessible name", () => {
  const { container } = render(<SquareButton label="Accessible label" />);

  expect(container).toMatchSnapshot();
  screen.getByRole("button", {
    name: "Accessible label",
  });
});

test("Should accept React element as label", () => {
  const { container } = render(
    <SquareButton
      label={
        <>
          <span>An accessible label</span> <span>across two components</span>
        </>
      }
    />,
  );

  expect(container).toMatchSnapshot();
  screen.getByRole("button", {
    name: "An accessible label across two components",
  });
});

test("Should allow rendering as an anchor tag", () => {
  const { container } = render(
    <SquareButton as="a" label="Accessible label" href="/test" />,
  );

  expect(container).toMatchSnapshot();
  screen.getByRole("link", { name: "Accessible label" });
});

test("Should allow rendering as a custom anchor tag", () => {
  const TestLink = (props: React.ComponentProps<"a">) => (
    <a data-testarg="test" {...props}>
      Click me
    </a>
  );

  render(<SquareButton as={TestLink} label="Accessible label" href="#" />);

  const testLink = screen.getByRole("link");
  expect(testLink?.getAttribute("data-testarg")).toBe("test");
  expect(testLink?.getAttribute("type")).toBeNull();
});

test("Should allow rendering as a styled-component", () => {
  const MyLink = styled.a``;
  const MyStyledLink = styled(MyLink)``;

  render(<SquareButton as={MyStyledLink} label="Accessible label" href="#" />);

  const testLink = screen.getByRole("link");
  expect(testLink?.getAttribute("type")).toBeNull();
});

test("Should remove href and not add type='button' when aria-disabled", () => {
  render(
    <SquareButton
      as="a"
      label="Accessible label"
      aria-disabled="true"
      href="#"
      data-testid="test-link"
    />,
  );

  // Had to add testId because aria-disabled removes the href, which removes the role=link
  const testLink = screen.getByTestId("test-link");
  expect(testLink?.getAttribute("aria-disabled")).toBe("true");
  expect(testLink?.getAttribute("type")).toBeNull();
});

test("Should not add type='button' when rendering as a custom anchor tag with aria-disabled", () => {
  const TestSquareButton = (props: React.ComponentProps<"a">) => (
    <a data-testarg="test" {...props}>
      Click me
    </a>
  );

  render(
    <SquareButton
      as={TestSquareButton}
      label="Accessible label"
      aria-disabled="true"
      data-testid="test-link"
    />,
  );

  // Had to add testId because aria-disabled removes the href, which removes the role=link
  const testLink = screen.getByTestId("test-link");
  expect(testLink?.getAttribute("data-testarg")).toBe("test");
  expect(testLink?.getAttribute("aria-disabled")).toBe("true");
  expect(testLink?.getAttribute("type")).toBeNull();
});

test("Should not add type='button' when rendering as a styled-component with aria-disabled", () => {
  const MyLink = styled.a``;
  const MyStyledLink = styled(MyLink)``;

  render(
    <SquareButton
      as={MyStyledLink}
      label="Accessible label"
      aria-disabled="true"
      data-testid="test-link"
    />,
  );

  // Had to add testId because aria-disabled removes the href, which removes the role=link
  const testLink = screen.getByTestId("test-link");
  expect(testLink?.getAttribute("aria-disabled")).toBe("true");
  expect(testLink?.getAttribute("type")).toBeNull();
});

test("Should render loading spinner and hide text when loading", () => {
  const { container } = render(
    <SquareButton
      label="Accessible label"
      loading={{ isLoading: true, hiddenLoadingMessage: "Form submitting" }}
    />,
  );

  expect(container).toMatchSnapshot();
});
