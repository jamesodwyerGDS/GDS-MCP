import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import styled from "styled-components";
import Card from "..";
import Button from "../../Button";
import { PencilEditIcon } from "../../../icons";
import TextInput from "../../TextInput";
import Stack from "../../utils/Stack";
import { spacing } from "../../../dimensions";

const meta: Meta<typeof Card> = {
  component: Card,
  title: "Components/Card",
  args: {
    title: "Title content",
    body: "Body content",
  },
  render: (args) => {
    const { title, body } = args;
    return (
      <Card>
        <Card.Title>{title}</Card.Title>
        {body && <Card.Body>{body}</Card.Body>}
      </Card>
    );
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Basic = {};

export const TitleOnly: Story = {
  args: { body: null },
};

export const Complex: Story = {
  render: () => (
    <Card>
      <Flex>
        <Card.Title as="h3">Payment Information</Card.Title>
        <Button fillVariant="ghost" style={{ marginInlineStart: "auto" }}>
          <PencilEditIcon size="1em" style={{ marginInlineEnd: 4 }} />
          Edit
        </Button>
      </Flex>
      <Card.Body>
        <Stack>
          <TextInput
            id="name"
            label="Account holder"
            placeholder="Sarah"
            screenReaderErrorPrefix="Error:"
          />
          <TextInput
            id="number"
            label="Account number"
            placeholder="12345678"
            screenReaderErrorPrefix="Error:"
          />
          <TextInput
            id="sortCode"
            label="Sort code"
            placeholder="00-00-00"
            screenReaderErrorPrefix="Error:"
          />
        </Stack>
      </Card.Body>
    </Card>
  ),
};

export const RTL = {
  ...Complex,
  globals: {
    addonRtl: "rtl",
  },
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin: -${spacing.club} 0;
`;
