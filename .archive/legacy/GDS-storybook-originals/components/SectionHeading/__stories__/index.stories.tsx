import { Meta, StoryObj } from "@storybook/react-webpack5";
import SectionHeading from "..";

const meta: Meta<typeof SectionHeading> = {
  component: SectionHeading,
  title: "Components/SectionHeading",
  args: {
    isCentered: false,
    isSmall: false,
    children: "Example heading",
  },
  parameters: {
    deprecationNotice:
      "This component has been deprecated in favour of `Title Accents`.",
  },
  tags: ["deprecated"],
};

export default meta;

type Story = StoryObj<typeof SectionHeading>;

export const Basic: Story = {};

export const Centered: Story = {
  args: {
    isCentered: true,
  },
};

export const Small: Story = {
  args: {
    isSmall: true,
  },
};

export const RTL = {
  globals: {
    addonRtl: "rtl",
  },
};
