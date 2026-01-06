import React from "react";
import { Meta } from "@storybook/react-webpack5";
import IconButton from "../IconButton";
import { InfoICircledFilledIcon } from "../../../icons";
import VisuallyHidden from "../VisuallyHidden";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: "Utils/IconButton",
  args: {
    children: (
      <>
        <VisuallyHidden>More information</VisuallyHidden>
        <InfoICircledFilledIcon />
      </>
    ),
  },
};

export default meta;

export const Basic = {};
