import { Meta, StoryObj } from "@storybook/react-webpack5";
import Link from "..";

const meta: Meta<typeof Link> = {
  component: Link,
  title: "Components/Link",
  args: {
    href: "#",
    variant: "primary",
    children: "Click me",
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Basic: Story = {};

export const Inverse: Story = {
  args: {
    variant: "inverse",
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

/**
 * Links cannot be `disabled` in the same way as buttons, but you can use the `aria-disabled` attribute to indicate that a link is not interactive.
 * This is useful for accessibility purposes, as it informs assistive technologies that the link is not clickable.
 */
export const Disabled: Story = {
  args: {
    "aria-disabled": "true",
  },
};

/**
 * Sometimes you need to trigger JavaScript behaviour via what looks like a link. Use the `as` prop to turn this into a button, then provide an `onClick` handler.
 */
export const AsButton: Story = {
  args: {
    as: "button",
    onClick: () => window.alert("clicked"),
  },
};

/**
 * Brandable via the `_links` property in the theme.
 */
export const Branded: Story = {
  args: {
    theme: { _links: { primary: { color: "green" } } },
  },
};
