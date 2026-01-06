import React from "react";
import { fireEvent, render, screen } from "../../../test/utils";
import DoubleRangeInput from "..";
import VisuallyHidden from "../../utils/VisuallyHidden";

const DoubleRangeInputComponent = (props = {}) => (
  <DoubleRangeInput
    formatValue={(value) => `£${value}`}
    id="test-input"
    minLabel={
      <>
        Minimum<VisuallyHidden> in GBP</VisuallyHidden>
      </>
    }
    maxLabel={
      <>
        Maximum<VisuallyHidden> in GBP</VisuallyHidden>
      </>
    }
    legend="Price (Per Ticket)"
    screenReaderErrorPrefix="Error:"
    {...props}
  />
);

test("Component: DoubleRangeInput -> Should render correctly", () => {
  const { container } = render(DoubleRangeInputComponent());

  expect(container).toMatchSnapshot();
});

test("Component: DoubleRangeInput -> Min Value Change", () => {
  const { container } = render(DoubleRangeInputComponent());

  const hand = container.querySelector("#test-input-min");
  const input = container.querySelectorAll("input[type='range']")[0];

  expect(hand).toHaveProperty("value", "0");
  screen.getByDisplayValue("£0");

  fireEvent.change(input, { target: { value: "10" } });
  fireEvent.blur(input);

  setTimeout(() => {
    expect(hand).toHaveProperty("value", "10");
    screen.getByDisplayValue("£10");
  });
});

test("Component: DoubleRangeInput -> Max Value Change", () => {
  const { container } = render(DoubleRangeInputComponent());

  const hand = container.querySelector("#test-input-max");
  const input = container.querySelectorAll("input[type='range']")[1];

  expect(hand).toHaveProperty("value", "100");
  screen.getByDisplayValue("£100");

  fireEvent.change(input, { target: { value: "200" } });
  fireEvent.blur(input);

  setTimeout(() => {
    expect(hand).toHaveProperty("value", "200");
    screen.getByDisplayValue("£200");
  });
});

test("Component: DoubleRangeInput -> Error Min Input", () => {
  const errorMinMessage = "This is an error message for the min input";

  const { container } = render(
    DoubleRangeInputComponent({ errorMin: true, errorMinMessage }),
  );

  const errorMessage = container.querySelector("#test-input-min-error");

  expect(errorMessage).toHaveTextContent(errorMinMessage);
});

test("Component: DoubleRangeInput -> Error Max Input", () => {
  const errorMaxMessage = "This is an error message for the max input";

  const { container } = render(
    DoubleRangeInputComponent({ errorMax: true, errorMaxMessage }),
  );

  const errorMessage = container.querySelector("#test-input-max-error");

  expect(errorMessage).toHaveTextContent(errorMaxMessage);
});
