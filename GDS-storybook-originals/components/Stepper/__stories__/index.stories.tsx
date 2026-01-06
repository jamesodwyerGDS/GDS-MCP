import React from "react";
import Stepper from "..";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import InputExample from "../../../docs/InputExample";

const meta: Meta<typeof Stepper> = {
  component: Stepper,
  title: "Components/Stepper",
  args: {
    defaultValue: 0,
    options: [0, 1, 2, 3, 4],
    ariaLabel: "tickets",
  },
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const Basic: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const DisabledPrimary: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledSecondary: Story = {
  args: {
    disabled: true,
    variant: "secondary",
  },
};

export const Controlled: Story = {
  args: {
    defaultValue: undefined,
    options: [0, 2, 4, 6, 8, 10, 12],
    ariaLabel: "tickets-controlled",
  },
  render: (args) => {
    const defaultValue = 4;
    const { options } = args;

    return (
      <InputExample defaultValue={defaultValue}>
        {([value, setValue]: [number, (val: number) => void]) => (
          <>
            <Stepper {...args} value={value} onChange={setValue} />
            <p>
              Current value: <strong>{value}</strong>
            </p>
            <div style={{ display: "flex", gap: "0.5em" }}>
              <button onClick={() => setValue(options[0])}>Min</button>
              <button onClick={() => setValue(options[options.length - 1])}>
                Max
              </button>
              <button onClick={() => setValue(defaultValue)}>Reset</button>
            </div>
          </>
        )}
      </InputExample>
    );
  },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
