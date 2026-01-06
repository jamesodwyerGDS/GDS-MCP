import React from "react";
import styled from "styled-components";
import CircleButton from "../index";
import { render, screen } from "../../../test/utils";

test("Should render CircleButton with accessible name", () => {
  const { container } = render(<CircleButton label="Accessible label" />);

  expect(container).toMatchSnapshot();
  screen.getByRole("button", {
    name: "Accessible label",
  });
});

test("Should accept React element as label", () => {
  const { container } = render(
    <CircleButton
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
    <CircleButton as="a" label="Accessible label" href="/test" />,
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

  render(<CircleButton as={TestLink} label="Accessible label" href="#" />);

  const testLink = screen.getByRole("link", { name: "Click me" });
  expect(testLink?.getAttribute("data-testarg")).toBe("test");
  expect(testLink?.getAttribute("type")).toBeNull();
});

test("Should allow rendering as a styled-component", () => {
  const MyLink = styled.a``;
  const MyStyledLink = styled(MyLink)``;

  render(<CircleButton as={MyStyledLink} label="Accessible label" href="#" />);

  const testLink = screen.getByRole("link", { name: "Accessible label" });
  expect(testLink?.getAttribute("type")).toBeNull();
});

test("Should remove href and not add type='button' when aria-disabled", () => {
  render(
    <CircleButton
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
  const TestCircleButton = (props: React.ComponentProps<"a">) => (
    <a data-testarg="test" {...props}>
      Click me
    </a>
  );

  render(
    <CircleButton
      as={TestCircleButton}
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
    <CircleButton
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
