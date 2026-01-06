import React from "react";
import Stepper from "..";
import { render, screen, fireEvent } from "../../../test/utils";

const defaultProps = {
  options: [1, 2, 5],
  ariaLabel: "tickets",
};

const opts = { hidden: true };

test("Stepper value defaults to first option if no defaultValue provided", () => {
  render(<Stepper {...defaultProps} options={[7, 8, 9]} />);

  const value = screen.getByLabelText(/tickets/i);
  expect(value.textContent).toBe("7");
});

test("Stepper defaultValue sets initial state", () => {
  render(<Stepper {...defaultProps} defaultValue={2} />);

  const value = screen.getByLabelText(/tickets/i);
  expect(value.textContent).toBe("2");
});

test("Stepper updates value using plus/minus buttons", () => {
  render(<Stepper {...defaultProps} />);

  const value = screen.getByLabelText(/tickets/i);
  const btnMinus = screen.getAllByRole("button", opts)[0] as HTMLButtonElement;
  const btnPlus = screen.getAllByRole("button", opts)[1] as HTMLButtonElement;

  // initial state
  screen.getByText("1");

  // increment
  fireEvent.click(btnPlus);
  fireEvent.click(btnPlus);
  expect(value.textContent).toBe("5");

  // decrement
  fireEvent.click(btnMinus);
  expect(value.textContent).toBe("2");

  fireEvent.click(btnMinus);
  expect(value.textContent).toBe("1");
});

test("Stepper handles keydown events correctly", () => {
  render(<Stepper {...defaultProps} />);

  const value = screen.getByLabelText(/tickets/i);

  // initial state
  screen.getByText("1");

  // increment using keyboard up arrow
  fireEvent.keyDown(value, { key: "ArrowUp" });
  expect(value.textContent).toBe("2");
  fireEvent.keyDown(value, { key: "ArrowUp" });
  expect(value.textContent).toBe("5");

  // decrement using keyboard down arrows
  fireEvent.keyDown(value, { key: "ArrowDown" });
  expect(value.textContent).toBe("2");
  fireEvent.keyDown(value, { key: "ArrowDown" });
  expect(value.textContent).toBe("1");

  // increment using keyboard End button
  fireEvent.keyDown(value, { key: "End" });
  expect(value.textContent).toBe("5");

  // increment using keyboard Home button
  fireEvent.keyDown(value, { key: "Home" });
  expect(value.textContent).toBe("1");
});

test("Stepper disables the buttons when they reach the min/max values", () => {
  render(<Stepper {...defaultProps} />);

  const btnMinus = screen.getAllByRole("button", opts)[0] as HTMLButtonElement;
  const btnPlus = screen.getAllByRole("button", opts)[1] as HTMLButtonElement;

  // minus button disabled
  screen.getByText("1");
  expect(btnMinus.disabled).toBeTruthy();
  expect(btnPlus.disabled).toBeFalsy();

  // both buttons enabled
  fireEvent.click(btnPlus);
  screen.getByText("2");
  expect(btnMinus.disabled).toBeFalsy();
  expect(btnPlus.disabled).toBeFalsy();

  // plus button disabled
  fireEvent.click(btnPlus);
  screen.getByText("5");
  expect(btnMinus.disabled).toBeFalsy();
  expect(btnPlus.disabled).toBeTruthy();
});

test("Stepper handles the disabled state", () => {
  render(<Stepper {...defaultProps} defaultValue={2} disabled />);

  const value = screen.getByLabelText(/tickets/i);
  const btnMinus = screen.getAllByRole("button", opts)[0] as HTMLButtonElement;
  const btnPlus = screen.getAllByRole("button", opts)[1] as HTMLButtonElement;

  // initial state
  // both buttons disabled
  screen.getByText("2");
  expect(btnMinus.disabled).toBeTruthy();
  expect(btnPlus.disabled).toBeTruthy();

  // plus button is disabled
  fireEvent.click(btnPlus);
  screen.getByText("2");
  expect(btnMinus.disabled).toBeTruthy();
  expect(btnPlus.disabled).toBeTruthy();

  // minus button is disabled
  fireEvent.click(btnMinus);
  screen.getByText("2");
  expect(btnMinus.disabled).toBeTruthy();
  expect(btnPlus.disabled).toBeTruthy();

  // keyboard up arrow is disabled
  fireEvent.keyDown(value, { key: "ArrowUp" });
  screen.getByText("2");

  // keyboard down arrow is disabled
  fireEvent.keyDown(value, { key: "ArrowDown" });
  screen.getByText("2");

  // keyboard Home button is disabled
  fireEvent.keyDown(value, { key: "Home" });
  screen.getByText("2");

  // keyboard End button is disabled
  fireEvent.keyDown(value, { key: "End" });
  screen.getByText("2");
});

test("Stepper state can be controlled", () => {
  function StepperControlled() {
    const [value, setValue] = React.useState(1);
    return <Stepper {...defaultProps} value={value} onChange={setValue} />;
  }

  render(<StepperControlled />);

  const btnMinus = screen.getAllByRole("button", opts)[0] as HTMLButtonElement;
  const btnPlus = screen.getAllByRole("button", opts)[1] as HTMLButtonElement;

  screen.getByText("1");
  expect(btnMinus.disabled).toBeTruthy();
  expect(btnPlus.disabled).toBeFalsy();

  fireEvent.click(btnPlus);
  screen.getByText("2");
  expect(btnMinus.disabled).toBeFalsy();
  expect(btnPlus.disabled).toBeFalsy();

  fireEvent.click(btnPlus);
  screen.getByText("5");
  expect(btnMinus.disabled).toBeFalsy();
  expect(btnPlus.disabled).toBeTruthy();
});

test("Stepper can be controlled even with a 0 value", () => {
  function Controlled() {
    const [value, setValue] = React.useState(0);

    return (
      <div>
        <Stepper
          {...defaultProps}
          options={[0, 1, 2]}
          value={value}
          onChange={setValue}
        />
        <button onClick={() => setValue(0)}>Reset</button>
        <div data-testid="output-external">{value}</div>
      </div>
    );
  }

  render(<Controlled />);

  const value = screen.getByLabelText(/tickets/i);
  const outputExternal = screen.getByTestId(/output-external/i);
  const btnPlus = screen.getAllByRole("button", opts)[1] as HTMLButtonElement;
  const resetButton = screen.getByText(/reset/i);

  expect(screen.getAllByText("0")).toHaveLength(2);

  fireEvent.click(btnPlus);
  expect(value.textContent).toBe("1");
  expect(outputExternal.textContent).toBe("1");

  fireEvent.click(btnPlus);
  expect(value.textContent).toBe("2");
  expect(outputExternal.textContent).toBe("2");

  fireEvent.click(resetButton);
  expect(value.textContent).toBe("0");
  expect(outputExternal.textContent).toBe("0");
});
