import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { TicketTopSection } from "..";
import TicketCardv2 from "../../TicketCardv2";

const meta: Meta<typeof TicketTopSection> = {
  component: TicketTopSection,
  title: "Components/TicketTopSection/TicketTopSection",
  args: {
    type: "primary",
    headerTitle: "Reserved Seat Ticket",
    row: { title: "row", value: "37" },
    seat: { title: "seat", value: "204" },
    section: { title: "section", value: "254" },
    ticketInfoButtonData: {
      accessibleDescription: "Ticket info",
      callback: () => {},
    },
  },
};

export default meta;
type Story = StoryObj<typeof TicketTopSection>;

export const Primary: Story = {};

export const Transfer: Story = {
  args: {
    type: "transfer",
  },
};

export const Resale: Story = {
  args: {
    type: "resale",
  },
};

export const Disabled: Story = {
  args: {
    type: "disabled",
  },
};

export const WithWayfindingLight: Story = {
  args: {
    wayfindingColors: {
      background: "#FEB3B3",
      foreground: "#000",
    },
  },
};

export const WithWayfindingDark: Story = {
  args: {
    wayfindingColors: {
      background: "#267554",
      foreground: "#fff",
    },
  },
};

export const UpsellShouldNotShowWayfinding: Story = {
  args: {
    wayfindingColors: {
      background: "#267554",
      foreground: "#fff",
    },
    type: "upsell",
  },
};

export const InTicketCard: Story = {
  args: {
    row: { title: "row", value: "37" },
    seat: { title: "seat", value: "204" },
    section: { title: "section", value: "LAWN33" },
  },
  render: (args) => (
    <TicketCardv2>
      <TicketTopSection {...args} />
    </TicketCardv2>
  ),
};

export const InTicketCardWithLongSection: Story = {
  args: {
    row: { title: "row", value: "37" },
    seat: { title: "seat", value: "204" },
    section: { title: "section", value: "LAWN33333333" },
  },
  render: (args) => (
    <TicketCardv2>
      <TicketTopSection {...args} />
    </TicketCardv2>
  ),
};

export const WithAccessibleTitle: Story = {
  args: {
    wayfindingColors: {
      background: "#FEB3B3",
      foreground: "#000",
    },
    headerTitle: "Reserved Seat Ticket",
    accessibleTitle: "WHEELCHAIR ACCESSIBLE",
  },
};

export const WithoutTitle: Story = {
  args: {
    type: "primary",
    row: { title: "row", value: "37" },
    seat: { title: "seat", value: "204" },
    section: { title: "section", value: "254" },
    headerTitle: undefined,
    ticketInfoButtonData: undefined,
  },
};

export const WithAddedValue: Story = {
  args: {
    type: "addedValue",
    row: { title: "row", value: "37" },
    seat: { title: "seat", value: "204" },
    section: { title: "section", value: "254" },
    headerTitle: "VOUCHER",
    ticketInfoButtonData: undefined,
    voucherDisclaimer: "ONLY VALID WITH ENTRY TICKET",
  },
};
