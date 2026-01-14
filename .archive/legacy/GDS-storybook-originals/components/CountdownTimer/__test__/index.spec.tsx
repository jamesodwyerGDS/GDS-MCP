import React from "react";
import { render, screen } from "../../../test/utils";
import CountdownTimer, { Props } from "..";

const defaultArgs: Props = {
  sizeVariant: "regular",
  colourVariant: "light",
  textPosition: "bottom",
  timeLeftLabel: "Time Left",
  date: new Date(Date.now() + 60000),
};

test("Component: CountdownTimer -> Should render correctly", () => {
  render(<CountdownTimer {...defaultArgs} />);

  expect(screen.getByText("Time Left")).toBeDefined();
});

test("announces once countdown has finished when message is provided", () => {
  const message = "Cart expired";
  render(
    <CountdownTimer
      {...defaultArgs}
      date={new Date(Date.now())}
      countdownEndA11yMessage={message}
    />,
  );

  const status = screen.getByRole("status");

  expect(status.textContent).toBe(message);
});

test("calls callback once countdown has finished", () => {
  const callback = jest.fn();

  render(
    <CountdownTimer
      {...defaultArgs}
      date={new Date(Date.now())}
      onCountdownEnd={callback}
    />,
  );

  expect(callback).toHaveBeenCalled();
});

/**
 * Accessibility: the decorative progress ring SVG should be hidden from Screen Readers
 * and Assistive Technologies in general.
 */
test("renders decorative progress SVG with aria-hidden=true", () => {
  render(<CountdownTimer {...defaultArgs} />);

  const svg = document.querySelector("svg");
  expect(svg).not.toBeNull();
  expect(svg).toHaveAttribute("aria-hidden", "true");
});
