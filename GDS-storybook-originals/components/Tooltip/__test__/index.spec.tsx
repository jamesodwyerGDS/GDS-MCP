import React, { ReactNode } from "react";
import Tooltip from "..";
import Button from "../../Button";

import { render, screen } from "../../../test/utils";
import { PositionX, PositionY } from "../types";
import SuccessMessage from "../../SuccessMessage";
import ArrowTip from "../ArrowTip";

const TooltipComponent = (
  positionX: PositionX,
  positionY: PositionY,
  message: ReactNode = "This is a test tooltip",
) => (
  <Tooltip id="1" message={message} positionX={positionX} positionY={positionY}>
    <Button aria-describedby="1">Hello</Button>
  </Tooltip>
);

const ArrowTipComponent = (positionX: PositionX, positionY: PositionY) => (
  <ArrowTip positionX={positionX} positionY={positionY} />
);

test("Component: ArrowTip -> Should render correctly", () => {
  const { container } = render(ArrowTipComponent("centre", "top"));
  expect(container).toMatchSnapshot();
});

test("Component: ArrowTip -> Start/Bottom", () => {
  const { container } = render(ArrowTipComponent("start", "bottom"));

  const svgElement = container.querySelector("svg");
  expect(svgElement).not.toBeNull();

  expect(svgElement).toHaveStyle("inset-inline-start: 16px;");
  expect(svgElement).toHaveStyle("top: -8px;");
});

test("Component: ArrowTip -> Centre/Bottom", () => {
  const { container } = render(ArrowTipComponent("centre", "bottom"));
  const svgElement = container.querySelector("svg");
  expect(svgElement).toHaveStyle("inset-inline-start: calc(50% - 8px);");
  expect(svgElement).toHaveStyle("top: -8px;");
});

test("Component: ArrowTip -> End/Bottom", () => {
  const { container } = render(ArrowTipComponent("end", "bottom"));
  const svgElement = container.querySelector("svg");
  expect(svgElement).toHaveStyle("inset-inline-end: 16px;");
  expect(svgElement).toHaveStyle("top: -8px;");
});

test("Component: ArrowTip -> Start/Top", () => {
  const { container } = render(ArrowTipComponent("start", "top"));
  const svgElement = container.querySelector("svg");
  expect(svgElement).toHaveStyle("inset-inline-start: 16px;");
  expect(svgElement).toHaveStyle("bottom: -8px;");
});

test("Component: ArrowTip -> Centre/Top", () => {
  const { container } = render(ArrowTipComponent("centre", "top"));
  const svgElement = container.querySelector("svg");
  expect(svgElement).toHaveStyle("inset-inline-start: calc(50% - 8px);");
  expect(svgElement).toHaveStyle("bottom: -8px;");
});

test("Component: ArrowTip -> End/Top", () => {
  const { container } = render(ArrowTipComponent("end", "top"));
  const svgElement = container.querySelector("svg");
  expect(svgElement).toHaveStyle("inset-inline-end: 16px;");
  expect(svgElement).toHaveStyle("bottom: -8px;");
});

test("Component: ArrowTip -> Start/Top Offset to be center", () => {
  const { container } = render(ArrowTipComponent("custom", "bottom"));
  const svgElement = container.querySelector("svg");
  expect(svgElement).toHaveStyle("inset-inline-end: 0px;");
  expect(svgElement).toHaveStyle("top: -8px;");
});

test("Component: ArrowTip -> Start/Bottom Offset to be center", () => {
  const { container } = render(ArrowTipComponent("custom", "top"));
  const svgElement = container.querySelector("svg");
  expect(svgElement).toHaveStyle("bottom: -8px;");
  expect(svgElement).toHaveStyle("inset-inline-end: 0px;");
});

test("Component: Tooltip -> Should render correctly", () => {
  const { container } = render(
    <Tooltip
      id="1"
      message="This is a test tooltip"
      positionX="start"
      positionY="bottom"
    >
      <Button aria-describedby="1">Hello</Button>
    </Tooltip>,
  );

  expect(container).toMatchSnapshot();
});

test("Component: Tooltip -> Start/Bottom", () => {
  render(TooltipComponent("start", "bottom"));

  expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle(
    "inset-inline-start: calc(50% - 12px);",
  );
  expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle(
    "bottom: 0%",
  );
});

test("Component: Tooltip -> Start/Top", () => {
  render(TooltipComponent("start", "top"));

  expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle(
    "inset-inline-start: calc(50% - 12px);",
  );
  expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle(
    "top: -50%",
  );
});

test("Component: Tooltip -> Centre/Bottom", () => {
  render(TooltipComponent("centre", "bottom"));

  expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle(
    "inset-inline-start: 50%",
  );
  expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle(
    "bottom: 0%",
  );
});

test("Component: Tooltip -> Centre/Top", () => {
  render(TooltipComponent("centre", "top"));

  expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle(
    "inset-inline-start: 50%",
  );
  expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle(
    "top: -50%",
  );
});

test("Component: Tooltip -> End/Bottom", () => {
  render(TooltipComponent("end", "bottom"));

  expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle(
    "inset-inline-start: calc(50% + 12px);",
  );
  expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle(
    "bottom: 0%",
  );
});

test("Component: Tooltip -> End/Top", () => {
  render(TooltipComponent("end", "top"));

  expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle(
    "inset-inline-start: calc(50% + 12px);",
  );
  expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle(
    "top: -50%",
  );
});

test("Component: Tooltip -> With Component Message", () => {
  render(
    TooltipComponent(
      "start",
      "bottom",
      <SuccessMessage>All good</SuccessMessage>,
    ),
  );

  expect(screen.getByText("All good")).toBeInTheDocument();
});

test("Component: Tooltip -> z-index", () => {
  render(
    <Tooltip
      id="1"
      message="This is a test tooltip"
      positionX="start"
      positionY="bottom"
      zIndex={5}
    >
      <h2>Hello World</h2>
    </Tooltip>,
  );

  const toolTipElement = screen.getByRole("tooltip", { hidden: true });
  expect(screen.getByText("Hello World")).toBeInTheDocument();
  expect(toolTipElement).toHaveStyle("z-index: 5");
});

test("Component: Tooltip -> default z-index", () => {
  render(
    <Tooltip
      id="1"
      message="This is a test tooltip"
      positionX="start"
      positionY="bottom"
    >
      <h2>Hello World</h2>
    </Tooltip>,
  );

  const toolTipElement = screen.getByRole("tooltip", { hidden: true });
  expect(screen.getByText("Hello World")).toBeInTheDocument();
  expect(toolTipElement).toHaveStyle("z-index: 2");
});

test("Component: Tooltip -> should only have message", () => {
  render(
    <Tooltip id="1" message="This is a default test tooltip">
      <h2>Hello World</h2>
    </Tooltip>,
  );
  const toolTipElement = screen.getByRole("tooltip", { hidden: true });
  expect(screen.getByText("Hello World")).toBeInTheDocument();
  expect(toolTipElement).toHaveStyle("z-index: 2");
});

test("Component: Tooltip -> with default Centre/Top", () => {
  render(
    <Tooltip id="1" message="This is a default test tooltip">
      <h2>Hello World</h2>
    </Tooltip>,
  );

  expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle(
    "inset-inline-start: 50%",
  );
  expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle(
    "top: -50%",
  );
});
