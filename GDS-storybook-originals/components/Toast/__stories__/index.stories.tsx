import { Meta, StoryObj } from "@storybook/react-webpack5";
import Toast from "..";

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: "Components/Toast",
  args: {
    message: "Your personal information has been updated",
    dismissable: {
      onDismiss: () => {},
      dismissLabel: "Close",
    },
    role: "status",
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Basic: Story = {};

export const Info: Story = { args: { variant: "info" } };

export const Success: Story = { args: { variant: "success" } };

export const Warning: Story = {
  args: {
    message: "Your information needs to be updated.",
    variant: "warning",
    role: "alert",
  },
};

export const Error: Story = {
  args: {
    message: "Connection error. Changes have not been saved.",
    variant: "error",
    role: "alert",
  },
};

export const Log: Story = {
  args: {
    message: "Connection error. Changes have not been saved.",
    variant: "info",
    role: "log",
  },
};

export const ShortMessage: Story = {
  args: { message: "Short message.", variant: "success" },
};

export const RTL = {
  globals: {
    addonRtl: "rtl",
  },
};
