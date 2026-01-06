import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { TicketTopSectionGeneric } from "..";
import TicketCardv2 from "../../TicketCardv2";

const meta: Meta<typeof TicketTopSectionGeneric> = {
  title: "Components/TicketTopSection/TicketTopSectionGeneric",
  component: TicketTopSectionGeneric,
  args: {
    mainText: "General Admission",
    headerTitle: "Standard Adult Ticket",
    ticketInfoButtonData: {
      accessibleDescription: "Ticket info",
      callback: () => alert("CTA clicked"),
    },
    type: "primary",
  },
};

export default meta;
type Story = StoryObj<typeof TicketTopSectionGeneric>;

export const Primary: Story = {};

export const WithRef: Story = {
  args: {
    subText: "REF: FLOOR-98-00",
  },
};

export const Disabled: Story = {
  args: {
    type: "disabled",
  },
};

export const InTicketCard: Story = {
  args: {
    subText: "REF: FLOOR-98-00",
  },
  render: (args) => (
    <TicketCardv2>
      <TicketTopSectionGeneric {...args} />
    </TicketCardv2>
  ),
};

export const Membership: Story = {
  args: {
    headerTitle: "Premium Membership",
    mainText: "8DF-FD8-8DF",
    subText: "Membership #",
  },
};

export const WithWayfindingLight: Story = {
  args: {
    wayfindingColors: {
      background: "#FEB3B3",
      foreground: "#000",
    },
    headerTitle: "Premium Membership",
    mainText: "8DF-FD8-8DF",
    subText: "Membership #",
  },
};

export const WithWayfindingDark: Story = {
  args: {
    wayfindingColors: {
      background: "#267554",
      foreground: "#fff",
    },
    headerTitle: "Premium Membership",
    mainText: "8DF-FD8-8DF",
    subText: "Membership #",
  },
};

export const MembershipInTicketCard: Story = {
  args: {
    headerTitle: "Premium Membership",
    mainText: "8DF-FD8-8DF",
    subText: "Membership #",
  },
  render: (args) => (
    <TicketCardv2>
      <TicketTopSectionGeneric {...args} />
    </TicketCardv2>
  ),
};

export const WayfindingInTicketCard: Story = {
  args: {
    headerTitle: "Premium Membership",
    mainText: "8DF-FD8-8DF",
    subText: "Membership #",
    wayfindingColors: {
      background: "#267554",
      foreground: "#fff",
    },
  },
  render: (args) => (
    <TicketCardv2 wayfindingColors={args.wayfindingColors}>
      <TicketTopSectionGeneric {...args} />
    </TicketCardv2>
  ),
};

export const ShouldNotShowWayfinding: Story = {
  args: {
    wayfindingColors: {
      background: "#267554",
      foreground: "#fff",
    },
    type: "upsell",
  },
};

export const WithAccessibleTitle: Story = {
  args: {
    headerTitle: "Reserved Seat Ticket",
    accessibleTitle: "WHEELCHAIR ACCESSIBLE",
  },
};
