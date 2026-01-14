import { Meta, StoryObj } from "@storybook/react-webpack5";
import DisplayHeading from "../DisplayHeading";

const meta: Meta<typeof DisplayHeading> = {
  component: DisplayHeading,
  title: "Components/DisplayHeading",
  args: {
    children: "Title heading",
    size: "medium",
  },
  tags: ["beta"],
  parameters: {
    betaNotice:
      "This component is in beta and subject to breaking changes. It will be updated after the design typography changes are implemented.",
  },
};

export default meta;

type Story = StoryObj<typeof DisplayHeading>;

/**
 * The DisplayHeading defaults to a `<h1>` element. You can keep the styling, but change the underlying element with the styled-components `as` prop:
 */
export const AsHeadingLevel2: Story = {
  args: { as: "h2" },
  parameters: {
    docs: { canvas: { sourceState: "shown" } },
  },
};

/**
 * Only the last line of the DisplayHeading is underlined when it wraps onto multiple lines:
 */
export const LongTitle: Story = {
  args: {
    children:
      "This is a very very very long title which wraps onto multiple lines",
  },
};

export const RTL = {
  globals: {
    addonRtl: "rtl",
  },
};

export const Inverse: Story = {
  args: {
    inverse: true,
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};
