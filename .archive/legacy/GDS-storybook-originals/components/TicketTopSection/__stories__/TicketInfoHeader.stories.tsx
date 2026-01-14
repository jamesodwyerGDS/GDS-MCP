import type { Meta, StoryObj } from "@storybook/react-webpack5";
import TicketInfoHeader from "../TicketInfoHeader";

const meta: Meta<typeof TicketInfoHeader> = {
  args: {
    headerTitle: "Reserved Seat Ticket",
  },
  component: TicketInfoHeader,
  title: "Components/TicketTopSection/TicketInfoHeader",
};

export default meta;
type Story = StoryObj<typeof TicketInfoHeader>;

export const Primary: Story = {
  args: {
    headerTitle: "Reserved Seat Ticket",
    ticketInfoButtonData: {
      accessibleDescription: "Ticket info",
      callback: () => alert("CTA clicked"),
    },
  },
};

export const Transfer: Story = {
  args: {
    type: "transfer",
    headerTitle: "Reserved Seat Ticket",
    ticketInfoButtonData: {
      accessibleDescription: "Ticket info",
      callback: () => alert("CTA clicked"),
    },
  },
};

export const Resale: Story = {
  args: {
    type: "resale",
    headerTitle: "Reserved Seat Ticket",
    ticketInfoButtonData: {
      accessibleDescription: "Ticket info",
      callback: () => alert("CTA clicked"),
    },
  },
};

export const WithoutCtaButton: Story = {
  args: {
    headerTitle: "Reserved Seat Ticket",
  },
};

export const WithAccessibleTitle: Story = {
  args: {
    type: "primary",
    accessibleTitle: "WHEELCHAIR ACCESSIBLE",
    ticketInfoButtonData: {
      accessibleDescription: "Ticket info",
      callback: () => alert("CTA clicked"),
    },
  },
};

export const WithAccessibleTitleAndNoHeaderTitle: Story = {
  args: {
    type: "primary",
    accessibleTitle: "WHEELCHAIR ACCESSIBLE",
    headerTitle: "",
    ticketInfoButtonData: {
      accessibleDescription: "Ticket info",
      callback: () => alert("CTA clicked"),
    },
  },
};

export const Disabled: Story = {
  args: {
    type: "disabled",
    accessibleTitle: "WHEELCHAIR ACCESSIBLE",
    ticketInfoButtonData: {
      accessibleDescription: "Ticket info",
      callback: () => alert("CTA clicked"),
    },
  },
};

export const WithWayfindingLight: Story = {
  args: {
    wayfindingColors: {
      background: "#FEB3B3",
      foreground: "#000",
    },
    type: "primary",
    accessibleTitle: "WHEELCHAIR ACCESSIBLE",
    ticketInfoButtonData: {
      accessibleDescription: "Ticket info",
      callback: () => alert("CTA clicked"),
    },
  },
};

export const WithWayfindingDark: Story = {
  globals: {
    backgrounds: { value: "dark" },
  },
  args: {
    wayfindingColors: {
      background: "#267554",
      foreground: "#fff",
    },
    type: "primary",
    accessibleTitle: "WHEELCHAIR ACCESSIBLE",
    ticketInfoButtonData: {
      accessibleDescription: "Ticket info",
      callback: () => alert("CTA clicked"),
    },
  },
};

export const ShouldNotShowWayfinding: Story = {
  args: {
    wayfindingColors: {
      background: "#267554",
      foreground: "#fff",
    },
    accessibleTitle: "WHEELCHAIR ACCESSIBLE",
    ticketInfoButtonData: {
      accessibleDescription: "Ticket info",
      callback: () => alert("CTA clicked"),
    },
    type: "upsell",
  },
};

export const WithAddedValue: Story = {
  args: {
    headerTitle: "VOUCHER",
    type: "addedValue",
  },
};
