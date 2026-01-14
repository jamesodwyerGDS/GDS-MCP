import React from "react";
import styled from "styled-components";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import Skeleton from "../Skeleton";
import Stack from "../../utils/Stack";
import VisuallyHidden from "../../utils/VisuallyHidden";

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: "Components/Skeleton",
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {};

export const WithSetDimensions = {
  args: {
    width: "65ch",
    height: "4em",
  },
};

export const Multiple = {
  render: () => (
    <Stack>
      <VisuallyHidden>Loading content...</VisuallyHidden>
      <Row>
        <Skeleton width="100px" height="50px" />
        <Skeleton />
      </Row>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Stack>
  ),
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 200px;
`;
