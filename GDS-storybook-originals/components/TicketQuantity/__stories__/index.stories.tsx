import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import TicketQuantity from "..";
import { CreditCardAndTicketIcon } from "../../../icons";

const meta: Meta<typeof TicketQuantity> = {
  component: TicketQuantity,
  title: "Components/TicketQuantity",
  args: {
    quantity: 2,
    color: "primary",
    a11yLabel: "Ticket count:",
  },
};

export default meta;

type Story = StoryObj<typeof TicketQuantity>;

export const Basic: Story = {};

export const WithCustomIcon: Story = {
  args: {
    icon: <CreditCardAndTicketIcon />,
  },
};
