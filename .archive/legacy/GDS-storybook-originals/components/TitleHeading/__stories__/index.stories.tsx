import { Meta, StoryObj } from "@storybook/react-webpack5";
import TitleHeading from "..";

const meta: Meta<typeof TitleHeading> = {
  component: TitleHeading,
  title: "Components/TitleHeading",
  args: {
    children: "Title heading",
    size: "xLarge",
  },
  argTypes: {
    size: {
      // Provide options array to make sure they are displayed in size order instead of alphabetically
      options: ["xLarge", "large", "medium", "small", "xSmall"],
    },
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export default meta;

type Story = StoryObj<typeof TitleHeading>;

export const Basic: Story = {};

/**
 * The `size` prop accepts: `"xLarge"` (default), `"large"`, `"medium"`, `"small"`, `"xSmall"`
 */
export const Sizes: Story = {
  args: { size: "medium" },
};

/**
 * The TitleHeading defaults to a `<h1>` element. You can keep the styling, but change the underlying element with the styled-components `as` prop:
 */
export const AsHeadingLevel2: Story = {
  args: { as: "h2" },
  parameters: {
    docs: { canvas: { sourceState: "shown" } },
  },
};

/**
 * Only the last line of the TitleHeading is underlined when it wraps onto multiple lines:
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
