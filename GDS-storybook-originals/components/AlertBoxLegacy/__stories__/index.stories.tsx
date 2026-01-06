import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import AlertBoxLegacy from "..";
import Button from "../../Button";

const meta: Meta<typeof AlertBoxLegacy> = {
  component: AlertBoxLegacy,
  title: "Components/AlertBoxLegacy",
  args: {
    title: "I am an alert title",
    variant: "info",
    size: "normal",
    children: "Just some text as a child",
    ariaDescribedById: "AlertDescription",
    ariaLabelledById: "AlertLabel",
  },
  tags: ["deprecated"],
};

export default meta;

type Story = StoryObj<typeof AlertBoxLegacy>;

export const Basic: Story = { args: { children: undefined } };

export const WithChildren: Story = {};

export const WithCustomChildren: Story = {
  args: {
    children: (
      <>
        <p>I am an alert message</p>
        <p>
          <a href="https://www.ticketmaster.co.uk">
            <span>You can put whatever children you want in here</span>
          </a>
        </p>
        <Button>I&apos;m a button</Button>
      </>
    ),
  },
};

export const DismissableWarning: Story = {
  args: {
    variant: "warning",
    dismissable: {
      onDismiss: () => {},
      dismissLabel: "Close",
    },
  },
};

export const DismissableDanger: Story = {
  args: {
    variant: "danger",
    dismissable: {
      onDismiss: () => {},
      dismissLabel: "Close",
    },
  },
};

export const Warning: Story = { args: { variant: "warning" } };

export const Success: Story = { args: { variant: "success" } };

export const Danger: Story = { args: { variant: "danger" } };

export const ModerateTitleOnly = {
  args: { children: undefined, size: "moderate" },
};

export const Moderate = {
  args: { size: "moderate" },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
