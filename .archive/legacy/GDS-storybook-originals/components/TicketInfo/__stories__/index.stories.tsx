import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import TicketInfo from "..";
import VisuallyHidden from "../../utils/VisuallyHidden";
import { CircleFilledIcon } from "../../../icons";
import TicketCardv2 from "../../TicketCardv2";
import TicketQuantity from "../../TicketQuantity";
import styled from "styled-components";
import { spacing } from "../../../dimensions";

const PriceRowCta = () => <button>Delete</button>;
const TicketInfoCta = () => <button>i</button>;

const meta: Meta<typeof TicketInfo> = {
  component: TicketInfo,
  title: "Components/TicketInfo",
  args: {
    title: "Reserved seating",
    description: "Description here",
    price: "£60.00",
    level: {
      title: "Level",
      details: "Level 1",
    },
    section: {
      title: "Section",
      details: "Section 1",
    },
    row: {
      title: "Row",
      details: "12",
    },
    seat: {
      title: "Seat",
      details: "43",
    },
    restrictions: "Under 12s must be accompanied by an adult",
    portal: "Entrance Z",
    isDisplaySeatDetailsInline: false,
    timedEntryDetails: "",
    splitPrice: "£30.00 per Part",
    priceRowCta: <PriceRowCta />,
    quantity: <TicketQuantity quantity={2} a11yLabel="Ticket count: " />,
  },
  tags: ["deprecated"],
};

export default meta;

type Story = StoryObj<typeof TicketInfo>;

export const Basic: Story = {};

export const WithTitle: Story = {
  args: {
    title: (
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {/* Example code, not production ready! Don't copy! */}
        <CircleFilledIcon
          fillColor="primary"
          style={{ marginTop: 1, marginRight: 8 }}
        />
        <VisuallyHidden>Ticket type hidden label</VisuallyHidden> Adult
      </div>
    ),
  },
};

const TicketInfoRow = styled.div`
  & + & {
    margin-top: ${spacing.hall};
    padding-top: ${spacing.hall};
    border-top: 1px solid ${(props) => props.theme.base.border};
  }
`;

const upsellTitle = (
  <div style={{ width: "100%" }}>
    <TicketInfoRow>First Upsell</TicketInfoRow>
    <TicketInfoRow>Standard Upsell - No Delay</TicketInfoRow>
  </div>
);

export const WithUpsellTitle: Story = {
  args: {
    title: upsellTitle,
  },
};

export const WithTicketInfoCta: Story = {
  args: {
    ticketInfoCta: <TicketInfoCta />,
    restrictions: undefined,
    portal: undefined,
    isDisplaySeatDetailsInline: false,
    timedEntryDetails: "",
    splitPrice: undefined,
    priceRowCta: undefined,
    quantity: undefined,
  },
};

export const WithTicketInfoCtaSlotRight: Story = {
  args: {
    ticketInfoCta: <TicketInfoCta />,
    ticketInfoCtaSlot: "right",
  },
};

export const WithFeeContent: Story = {
  args: {
    feeContent: "Includes booking fee of £2.00",
  },
};

export const WithCustomSeatInfo: Story = {
  args: {
    title: "Title",
    restrictions: undefined,
    portal: undefined,
    isDisplaySeatDetailsInline: false,
    timedEntryDetails: "",
    splitPrice: undefined,
    priceRowCta: undefined,
    quantity: undefined,
    customSeatInfo: (
      <div style={{ color: "red" }}>
        Custom React node to override seat info, despite the section, row, seat
        props existing
      </div>
    ),
  },
};

export const InTicketCard: Story = {
  render: (args) => (
    <TicketCardv2>
      <div style={{ padding: spacing.auditorium }}>
        <TicketInfo {...args} />
      </div>
    </TicketCardv2>
  ),
};
