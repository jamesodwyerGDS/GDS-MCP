import React from "react";
import Button from "../index";
import styled from "styled-components";
import { render, screen } from "../../../test/utils";

test("Should render as button by default", () => {
  const { container } = render(<Button>Click me</Button>);

  expect(container).toMatchSnapshot();
  screen.getByRole("button");
});

test("Should allow rendering as an anchor tag", () => {
  const { container } = render(
    <Button as="a" href="/test">
      Click me
    </Button>,
  );

  expect(container).toMatchSnapshot();
  screen.getByRole("link");
});

test("Should allow rendering as a custom tag", () => {
  const TestButton = (props: React.ComponentProps<"button">) => (
    <button data-testarg="test" {...props} />
  );

  const { container } = render(
    <Button as={TestButton} type="submit">
      Click me
    </Button>,
  );

  expect(container).toMatchSnapshot();
});

test("Should allow rendering as a custom anchor tag", () => {
  const TestButton = (props: React.ComponentProps<"a">) => (
    <a data-testarg="test" {...props}>
      Click me
    </a>
  );

  render(
    <Button as={TestButton} href="#">
      Click me
    </Button>,
  );

  const testLink = screen.getByRole("link");
  expect(testLink?.getAttribute("data-testarg")).toBe("test");
  expect(testLink?.getAttribute("type")).toBeNull();
});

test("Should allow rendering as a styled-component", () => {
  const MyLink = styled.a``;
  const MyStyledLink = styled(MyLink)``;

  render(
    <Button as={MyStyledLink} href="#">
      Click me
    </Button>,
  );

  const testLink = screen.getByRole("link");
  expect(testLink?.getAttribute("type")).toBeNull();
});

test("Should remove href and not add type='button' when aria-disabled", () => {
  render(
    <Button as="a" aria-disabled="true" href="#" data-testid="test-link">
      Click me
    </Button>,
  );

  // Had to add testId because aria-disabled removes the href, which removes the role=link
  const testLink = screen.getByTestId("test-link");
  expect(testLink?.getAttribute("aria-disabled")).toBe("true");
  expect(testLink?.getAttribute("type")).toBeNull();
});

test("Should not add type='button' when rendering as a custom anchor tag with aria-disabled", () => {
  const TestButton = (props: React.ComponentProps<"a">) => (
    <a data-testarg="test" {...props}>
      Click me
    </a>
  );

  render(
    <Button as={TestButton} aria-disabled="true" data-testid="test-link">
      Click me
    </Button>,
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
    <Button as={MyStyledLink} aria-disabled="true" data-testid="test-link">
      Click me
    </Button>,
  );

  // Had to add testId because aria-disabled removes the href, which removes the role=link
  const testLink = screen.getByTestId("test-link");
  expect(testLink?.getAttribute("aria-disabled")).toBe("true");
  expect(testLink?.getAttribute("type")).toBeNull();
});

test("Should render loading spinner and hide text when loading", () => {
  const { container } = render(
    <Button
      loading={{ isLoading: true, hiddenLoadingMessage: "Form submitting" }}
    >
      Click me
    </Button>,
  );

  expect(container).toMatchSnapshot();
});
