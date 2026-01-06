import React from "react";
import DoubleRangeInput from "..";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import { useArgs } from "storybook/preview-api";
import Button from "../../Button";
import styled from "styled-components";
import { spacing } from "../../../dimensions";
import VisuallyHidden from "../../utils/VisuallyHidden";

const meta: Meta<typeof DoubleRangeInput> = {
  component: DoubleRangeInput,
  title: "Components/DoubleRangeInput",
  args: {
    id: "story-input",
    min: 5,
    max: 200,
    step: 1,
    value: undefined,
    minLabel: (
      <>
        Minimum<VisuallyHidden> in GBP</VisuallyHidden>
      </>
    ),
    maxLabel: (
      <>
        Maximum<VisuallyHidden> in GBP</VisuallyHidden>
      </>
    ),
    legend: "Price (Per Ticket)",
  },
};

export default meta;

type Story = StoryObj<typeof DoubleRangeInput>;

export const Price: Story = {
  args: {
    formatValue: (value) => `£${value}`,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const VariableInputValues: Story = {
  args: {
    inputSize: 7,
  },
};

/**
 * `errorMessage` displays an inline validation message.
 * `screenReaderErrorPrefix` is a visually hidden prefix announced to screen readers before the error message (e.g., "Error: ").
 */
export const ErrorOnMinInput: Story = {
  args: {
    errorMin: true,
    screenReaderErrorPrefix: "Error:",
    errorMinMessage: "This is an error message for the min input",
  },
};

export const ErrorOnMaxInput: Story = {
  args: {
    errorMax: true,
    screenReaderErrorPrefix: "Error:",
    errorMaxMessage: "This is an error message for the max input",
  },
};

export const Controlled: Story = {
  args: {
    value: [40, 50],
  },
  render: function Render(args) {
    const [, setArgs] = useArgs();
    return (
      <Container>
        <DoubleRangeInput {...args} onChange={(value) => setArgs({ value })} />
        <Button onClick={() => setArgs({ value: [10, 20] })} fullWidth>
          Update Range
        </Button>
      </Container>
    );
  },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.club};
  align-items: center;
`;
