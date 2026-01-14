import React from "react";
import { Meta } from "@storybook/react-webpack5";
import Stack from "../Stack";
import TextInput from "../../TextInput";

const meta: Meta<typeof Stack> = {
  component: Stack,
  title: "Utils/Stack",
  args: {
    gap: "amphitheatre",
    children: (
      <>
        <TextInput
          id="email"
          label="Email"
          type="email"
          screenReaderErrorPrefix="Error:"
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          screenReaderErrorPrefix="Error:"
        />
      </>
    ),
  },
};

export default meta;

export const Basic = {};
