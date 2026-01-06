import React from "react";
import { Meta } from "@storybook/react-webpack5";
import UnstyledList, { UnstyledListItem } from "../UnstyledList";

const meta: Meta<typeof UnstyledList> = {
  component: UnstyledList,
  title: "Utils/UnstyledList",
  args: {
    gap: "amphitheatre",
    children: (
      <>
        <UnstyledListItem>First Item</UnstyledListItem>
        <UnstyledListItem>Second Item</UnstyledListItem>
        <UnstyledListItem>Third Item</UnstyledListItem>
        <UnstyledListItem>...and so on</UnstyledListItem>
      </>
    ),
  },
};

export default meta;

export const Basic = {};
