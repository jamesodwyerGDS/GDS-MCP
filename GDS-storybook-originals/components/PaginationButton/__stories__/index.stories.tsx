import React from "react";
import { StoryObj } from "@storybook/react-webpack5";
import PaginationButton from "..";

export default {
  title: "Components/PaginationButton",
  component: PaginationButton,
  args: {
    buttonLabel: "Show More",
    recapLabel: (
      <span>
        Showing <b>60</b> out of <b>320</b> events
      </span>
    ),
    total: 320,
    count: 60,
  },
};

type Story = StoryObj<typeof PaginationButton>;

export const Basic: Story = {};

export const Inverse: Story = {
  args: {
    inverse: true,
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const BadExample: Story = {
  args: {
    recapLabel: <p style={{ fontSize: "40px" }}>Please do not do this</p>,
  },
  tags: ["!dev"],
};

export const ReverseExample: Story = {
  args: {
    buttonLabel: "Back to Top",
    reverseChevron: true,
    recapLabel: (
      <span>
        Showing <b>320</b> out of <b>320</b> events
      </span>
    ),
    total: 320,
    count: 320,
  },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
