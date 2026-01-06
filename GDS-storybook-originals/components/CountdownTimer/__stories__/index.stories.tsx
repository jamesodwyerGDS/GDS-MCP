import { Meta, StoryObj } from "@storybook/react-webpack5";
import CountdownTimer from "..";

const meta: Meta<typeof CountdownTimer> = {
  component: CountdownTimer,
  title: "Components/CountdownTimer",
  args: {
    sizeVariant: "regular",
    colourVariant: "light",
    textPosition: "bottom",
    timeLeftLabel: "Time Left",
    date: new Date(Date.now() + 60000),
    timeOnly: false,
    showDays: false,
    multiDay: false,
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export default meta;

type Story = StoryObj<typeof CountdownTimer>;

export const Basic: Story = {};

export const ShowDays: Story = {
  args: {
    date: new Date(Date.now() + 172800000),
    showDays: true,
  },
};

export const MultiDay: Story = {
  args: {
    date: new Date(Date.now() + 172800000),
    multiDay: true,
  },
};

export const Dark: Story = {
  args: {
    colourVariant: "dark",
  },
  globals: {
    backgrounds: { value: "light" },
  },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
