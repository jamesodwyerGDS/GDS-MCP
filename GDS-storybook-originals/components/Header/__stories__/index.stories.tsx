import React from "react";
import styled from "styled-components";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import Logo from "../Logo";
import Header from "..";
import IconButton from "../../utils/IconButton";
import VisuallyHidden from "../../utils/VisuallyHidden";
import { UserIcon } from "../../../icons";

const meta: Meta<typeof Header> = {
  component: Header,
  title: "Components/Header",
  args: {
    logo: <Logo />,
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Basic: Story = {};

export const WithAccountButton: Story = {
  render: (args) => (
    <Header {...args}>
      <Flex>
        <IconButton>
          <VisuallyHidden>My account</VisuallyHidden>
          <UserIcon />
        </IconButton>
      </Flex>
    </Header>
  ),
};

export const RTL = {
  ...WithAccountButton,
  globals: {
    addonRtl: "rtl",
  },
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-inline-start: auto;
`;
