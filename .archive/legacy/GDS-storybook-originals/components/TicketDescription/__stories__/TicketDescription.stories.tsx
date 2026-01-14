import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import Button from "../../Button";
import TicketDescription, {
  TICKET_DESCRIPTION_ICONS,
  type IconName,
} from "../TicketDescription";
import styled from "styled-components";
import Link from "../../Link";
import {
  AddToAppleWalletIcon,
  AddToGoogleWalletIcon,
} from "../../../icons-with-colours";
import { TicketInEnvelopeIcon } from "../../../icons";

type FeatureArgs = {
  $color: "primary" | "secondary";
  icon: IconName;
  titleCopy: string;
  subCopy: string | React.ReactElement;
};

type StoryArgs = React.ComponentProps<typeof TicketDescription> & FeatureArgs;

const Spacer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;

const meta: Meta<StoryArgs> = {
  component: TicketDescription,
  title: "Components/TicketDescription",
  args: {
    $color: "secondary",
    titleCopy: "",
    subCopy: "",
  },
  argTypes: {
    $color: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
    },
    icon: {
      control: { type: "select" },
      options: Object.keys(TICKET_DESCRIPTION_ICONS),
    },
    titleCopy: {
      control: "text",
    },
    subCopy: {
      control: "text",
    },
    children: {
      control: "text",
    },
  },
  render: ({ $color, icon, titleCopy, subCopy, children }) => {
    return (
      <TicketDescription>
        <TicketDescription.Header icon={icon}>
          <TicketDescription.Title>{titleCopy}</TicketDescription.Title>
          <TicketDescription.Description $color={$color}>
            {subCopy}
          </TicketDescription.Description>
        </TicketDescription.Header>
        {children}
      </TicketDescription>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Postal: Story = {
  args: {
    icon: "postal",
    titleCopy: "This is Not Your Ticket",
    subCopy:
      "Tickets will be sent to you in the mail, bring them with you to enter the event",
  },
};

export const WillCall: Story = {
  args: {
    icon: "willCall",
    titleCopy: "This Is Not Your Ticket",
    subCopy:
      "Tickets will be available for collection at the venue, please bring photo ID",
  },
};

export const Print: Story = {
  args: {
    icon: "print",
    titleCopy: "This Is Not Your Ticket",
    subCopy:
      "Please print your ticket at home and bring them with you to enter the event",
  },
};

export const TransferComplete: Story = {
  args: {
    icon: "transferComplete",
    titleCopy: "Transfer Complete",
    subCopy: "Sent to: Firstname Surname",
  },
};

export const Cancelled: Story = {
  args: {
    icon: "cancelled",
    titleCopy: "Your ticket has been cancelled",
    subCopy: (
      <>
        If you have any questions, please{" "}
        <Link>visit our fan support pages</Link>
      </>
    ),
  },
};

export const AppOnly: Story = {
  args: {
    icon: "appOnly",
    titleCopy: "Download the Ticketmaster App",
    subCopy:
      "Access your tickets in the Ticketmaster App or add to your mobile wallet",
  },
};

export const ResaleSold: Story = {
  args: {
    icon: "resaleSold",
    titleCopy: "Ticket Sold",
    subCopy: "Sold for €45.00 on 2/4/2024",
  },
};

export const TransferPending: Story = {
  args: {
    icon: "transferPending",
    titleCopy: "Transfer Pending",
    subCopy: "Sent to: email@email.com",
    children: (
      <Spacer>
        <Button type="submit" fillVariant="outline">
          Cancel Transfer
        </Button>
      </Spacer>
    ),
  },
};

export const ResaleWithShareListing: Story = {
  args: {
    icon: "resale",
    titleCopy: "Listed for Rsale",
    subCopy: "Listed on 2/4/2024",
    children: (
      <Spacer>
        <Button type="submit" fillVariant="outline">
          Share Listing
        </Button>
        <span style={{ marginTop: "12px" }} />
        <Button type="submit" fillVariant="ghost">
          Cancel Listing
        </Button>
      </Spacer>
    ),
  },
};

export const TicketError: Story = {
  args: {
    icon: "error",
    titleCopy: "There was an Error Loading Your tickets",
    subCopy: "Please try again",
    children: (
      <Spacer>
        <Button type="submit" fillVariant="fill">
          Reload Tickets
        </Button>
      </Spacer>
    ),
  },
};

export const TicketInfo: Story = {
  args: {
    icon: "info",
    titleCopy: "Link your tickets",
    subCopy:
      "To view and manage your tickets, please claim them below by signing into your Ticketmaster Account.",
  },
};

export const ResaleWarning: Story = {
  args: {
    icon: "error",
    titleCopy: "Not Yet Listed for Resale",
    subCopy:
      "Please complete your seller details for this listing to be made active",
    children: (
      <Spacer>
        <Button type="submit" fillVariant="outline">
          Go to Seller Details
        </Button>
        <span style={{ marginTop: "12px" }} />
        <Button type="submit" fillVariant="ghost">
          Cancel Listing
        </Button>
      </Spacer>
    ),
  },
};

export const AppOnlyWithAppleWallet: Story = {
  args: {
    icon: "appOnly",
    titleCopy: "Download the Ticketmaster App",
    subCopy:
      "Access your tickets in the Ticketmaster App or add to your mobile wallet",
    children: (
      <Spacer>
        <AddToAppleWalletIcon width="108px" height="32px" />
      </Spacer>
    ),
  },
};

export const AppOnlyWithGoogleWallet: Story = {
  args: {
    icon: "appOnly",
    titleCopy: "Download the Ticketmaster App",
    subCopy:
      "Access your tickets in the Ticketmaster App or add to your mobile wallet",
    children: (
      <Spacer>
        <AddToGoogleWalletIcon width="268px" height="36px" />
      </Spacer>
    ),
  },
};

export const ResaleListing: Story = {
  args: {
    icon: "resale",
    titleCopy: "Listed for Resale",
    subCopy: "Listed on 2/4/204",
    children: (
      <Spacer>
        <Button type="submit" fillVariant="outline">
          Cancel Listing
        </Button>
      </Spacer>
    ),
  },
};

export const WithCustomIcon: Story = {
  render: () => (
    <TicketDescription>
      <TicketDescription.Header overrideIcon={<TicketInEnvelopeIcon />}>
        <TicketDescription.Title>
          This is not your voucher
        </TicketDescription.Title>
        <TicketDescription.Description>
          Vouchers will be sent to you in the mail, bring them with you to enter
          the event
        </TicketDescription.Description>
      </TicketDescription.Header>
    </TicketDescription>
  ),
};
