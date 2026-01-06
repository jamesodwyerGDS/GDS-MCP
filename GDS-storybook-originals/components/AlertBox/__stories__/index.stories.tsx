import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import AlertBox from "..";
import Link from "../../Link";

const meta: Meta<typeof AlertBox> = {
  component: AlertBox,
  title: "Components/AlertBox",
  args: {
    title: "This is the title",
    variant: "info",
    ariaDescribedById: "AlertDescription",
    ariaLabelledById: "AlertLabel",
    children:
      "This is the optional body of the message. Try to keep it short and concise.",
    nested: false,
  },
};

export default meta;

type Story = StoryObj<typeof AlertBox>;

export const Basic: Story = { args: { children: undefined } };

export const Nested: Story = { args: { nested: true } };

export const WithFormattedTitle: Story = {
  args: {
    title: (function Render() {
      return (
        <>
          Hummingbirds are the only birds that can fly backward.{" "}
          <Link href="/">Learn more</Link>
        </>
      );
    })(),
    nested: true,
  },
};

export const WithChildren: Story = {};

export const WithCustomChildren: Story = {
  args: {
    children: (
      <>
        <p>A paragraph element... perhaps a list:</p>
        <ul>
          <li>List item one</li>
          <li>List item two</li>
        </ul>
      </>
    ),
  },
};

export const Warning: Story = { args: { variant: "warning" } };

export const Success: Story = { args: { variant: "success" } };

export const Danger: Story = { args: { variant: "danger" } };

export const PageWarning: Story = {
  args: {
    variant: "warning",
    title: "This message pops up in a modal.",
    ariaDescribedById: "pageWarning",
    children: "This page requires changes to be made before you can continue.",
  },
};

export const Alert: Story = {
  args: {
    variant: "danger",
    title: "This is an important, time-sensitive error message.",
    children: undefined,
    role: "alert",
  },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
