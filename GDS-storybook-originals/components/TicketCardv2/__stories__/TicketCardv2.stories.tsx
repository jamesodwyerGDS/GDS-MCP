import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import TicketCardv2 from "..";
import styled from "styled-components";
import {
  TicketTopSection,
  TicketTopSectionGeneric,
} from "../../TicketTopSection";

const meta: Meta<typeof TicketCardv2> = {
  component: TicketCardv2,
  title: "Components/TicketCardv2",
};

export default meta;

type Story = StoryObj<typeof TicketCardv2>;

const CardFiller = styled.div`
  width: 300px;
  height: 400px;
`;

export const Primary: Story = {
  args: {
    status: "primary",
  },
  render: (args) => (
    <TicketCardv2 {...args}>
      <CardFiller />
    </TicketCardv2>
  ),
};

export const PrimaryWithoutBranding: Story = {
  args: {
    status: "primary",
    excludeLogo: true,
  },
  render: (args) => (
    <TicketCardv2 {...args}>
      <CardFiller />
    </TicketCardv2>
  ),
};

export const Resale: Story = {
  args: {
    status: "resale",
  },
  render: (args) => (
    <TicketCardv2 {...args}>
      <CardFiller />
    </TicketCardv2>
  ),
};

export const Disabled: Story = {
  args: {
    status: "disabled",
  },
  render: (args) => (
    <TicketCardv2 {...args}>
      <CardFiller />
    </TicketCardv2>
  ),
};

export const Transfer: Story = {
  args: {
    status: "transfer",
  },
  render: (args) => (
    <TicketCardv2 {...args}>
      <CardFiller />
    </TicketCardv2>
  ),
};

export const Upsell: Story = {
  args: {
    status: "upsell",
  },
  render: (args) => (
    <TicketCardv2 {...args}>
      <CardFiller />
    </TicketCardv2>
  ),
};

const wayfindingLight = {
  background: "#FEB3B3",
  foreground: "#000",
};

const wayfindingDark = {
  background: "#267554",
  foreground: "#fff",
};

export const WithWayfindingLight: Story = {
  args: {
    wayfindingColors: wayfindingLight,
  },
  render: (args) => (
    <TicketCardv2 {...args}>
      <CardFiller />
    </TicketCardv2>
  ),
};

export const WithWayfindingDark: Story = {
  args: {
    wayfindingColors: wayfindingDark,
    status: "primary",
  },
  render: (args) => (
    <TicketCardv2 {...args}>
      <CardFiller />
    </TicketCardv2>
  ),
};

export const WithTicketTopSection: Story = {
  args: {
    wayfindingColors: wayfindingDark,
  },
  render: (args) => (
    <TicketCardv2 {...args}>
      <TicketTopSection
        wayfindingColors={args.wayfindingColors}
        headerTitle="Reserved Seating"
        row={{ title: "row", value: "37" }}
        seat={{ title: "seat", value: "204" }}
        section={{ title: "section", value: "254" }}
        type="primary"
      />
    </TicketCardv2>
  ),
};

export const WithTicketTopSectionGenericLight: Story = {
  args: {
    wayfindingColors: wayfindingLight,
  },
  render: (args) => (
    <TicketCardv2 wayfindingColors={args.wayfindingColors} status="primary">
      <TicketTopSectionGeneric
        wayfindingColors={args.wayfindingColors}
        headerTitle="Standard Adult Ticket"
        mainText="General Admission"
        subText="REF: FLOOR-98-00"
        type="primary"
      />
    </TicketCardv2>
  ),
};

export const WithTicketTopSectionGenericDark: Story = {
  args: {
    wayfindingColors: wayfindingDark,
  },
  render: (args) => (
    <TicketCardv2 wayfindingColors={args.wayfindingColors} status="primary">
      <TicketTopSectionGeneric
        wayfindingColors={args.wayfindingColors}
        headerTitle="Standard Adult Ticket"
        mainText="General Admission"
        subText="REF: FLOOR-98-00"
        type="primary"
      />
    </TicketCardv2>
  ),
};
