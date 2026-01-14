import LoadingSpinner from "..";
import { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof LoadingSpinner> = {
  component: LoadingSpinner,
  title: "Components/LoadingSpinner",
  args: {
    message: "You spin me right round, baby, right round",
    size: "small",
    colorVariant: "primary",
  },
  argTypes: {
    size: { control: "inline-radio" },
  },
};

export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Basic: Story = {};

export const Small: Story = {
  args: { size: "small", message: undefined },
};

export const Medium: Story = {
  args: { size: "medium", message: undefined },
};

export const Large: Story = {
  args: { size: "large", message: undefined },
};

export const Secondary: Story = {
  args: { colorVariant: "secondary", message: undefined },
};

export const Inverse: Story = {
  args: { colorVariant: "inverse", message: undefined },
  globals: { backgrounds: { value: "dark" } },
};

export const Message: Story = {
  args: { size: "medium" },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
