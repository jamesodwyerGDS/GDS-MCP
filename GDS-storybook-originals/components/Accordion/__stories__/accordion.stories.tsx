import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";

import Accordion from "../Accordion";
import { StarIcon } from "../../../icons";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: "Components/Accordion",
  args: {
    type: "single",
    showTopBorder: true,
    showBottomBorder: true,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: function Render(args) {
    return (
      <Accordion {...args}>
        <Accordion.Item>
          <Accordion.Header>Where can I find my tickets?</Accordion.Header>
          <Accordion.Panel>
            Log in to your <a href="#test">Ticketmaster</a> account and navigate
            to My Tickets - Upcoming Events. There you can view all your orders.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            How do I transfer tickets to a friend?
          </Accordion.Header>
          <Accordion.Panel>
            Select the order under My Tickets, click Transfer link, choose the
            tickets you want to transfer, and enter your friend’s email or phone
            number.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            What happens if the event is postponed and I cannot attend on the
            rescheduled date and so I would like a refund?
          </Accordion.Header>
          <Accordion.Panel>
            If the event is postponed, your tickets will remain valid for the
            rescheduled date.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  },
};

export const Multi: Story = {
  args: { type: "multi" },
  render: function Render(args) {
    return (
      <Accordion {...args}>
        <Accordion.Item>
          <Accordion.Header>Where can I find my tickets?</Accordion.Header>
          <Accordion.Panel>
            Log in to your Ticketmaster account and navigate to My Tickets -
            Upcoming Events. There you can view all your orders.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            How do I transfer tickets to a friend?
          </Accordion.Header>
          <Accordion.Panel>
            Select the order under My Tickets, click Transfer link, choose the
            tickets you want to transfer, and enter your friend’s email or phone
            number.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            What happens if the event is postponed and I cannot attend on the
            rescheduled date and so I would like a refund?
          </Accordion.Header>
          <Accordion.Panel>
            If the event is postponed, your tickets will remain valid for the
            rescheduled date.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  },
};

/**
 * The `Accordion.Item` component accepts a `defaultOpen` boolean prop.
 * This value defaults to `false`.
 */
export const DefaultOpen: Story = {
  render: function Render(args) {
    return (
      <Accordion {...args}>
        <Accordion.Item>
          <Accordion.Header>Where can I find my tickets?</Accordion.Header>
          <Accordion.Panel>
            Log in to your Ticketmaster account and navigate to My Tickets -
            Upcoming Events. There you can view all your orders.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item defaultOpen>
          <Accordion.Header>
            How do I transfer tickets to a friend?
          </Accordion.Header>
          <Accordion.Panel>
            Select the order under My Tickets, click Transfer link, choose the
            tickets you want to transfer, and enter your friend’s email or phone
            number.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            What happens if the event is postponed and I cannot attend on the
            rescheduled date and so I would like a refund?
          </Accordion.Header>
          <Accordion.Panel>
            If the event is postponed, your tickets will remain valid for the
            rescheduled date.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  },
};

/**
 * The `Accordion.Header` and `Accordion.Panel` components both accept a `maxContentWidth` prop.
 * This value defaults to `"80ch"` for increased readability, but can be overridden with any valid CSS width string.
 */
export const WithMaxWidthOveridden: Story = {
  render: function Render(args) {
    return (
      <Accordion {...args}>
        <Accordion.Item>
          <Accordion.Header maxContentWidth="100%">
            Where can I find my tickets?
          </Accordion.Header>
          <Accordion.Panel maxContentWidth="100%">
            Log in to your <a href="#test">Ticketmaster</a> account and navigate
            to My Tickets - Upcoming Events. There you can view all your orders.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header maxContentWidth="100%">
            How do I transfer tickets to a friend?
          </Accordion.Header>
          <Accordion.Panel maxContentWidth="100%">
            Select the order under My Tickets, click Transfer link, choose the
            tickets you want to transfer, and enter your friend’s email or phone
            number.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header maxContentWidth="100%">
            What happens if the event is postponed and I cannot attend on the
            rescheduled date and so I would like a refund?
          </Accordion.Header>
          <Accordion.Panel maxContentWidth="100%">
            If the event is postponed, your tickets will remain valid for the
            rescheduled date.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  },
};

export const LeadingIcon: Story = {
  render: function Render(args) {
    return (
      <Accordion {...args}>
        <Accordion.Item>
          <Accordion.Header leadingIcon={<StarIcon />}>
            Where can I find my tickets?
          </Accordion.Header>
          <Accordion.Panel>
            Log in to your Ticketmaster account and navigate to My Tickets -
            Upcoming Events. There you can view all your orders.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header leadingIcon={<StarIcon />}>
            How do I transfer tickets to a friend?
          </Accordion.Header>
          <Accordion.Panel>
            Select the order under My Tickets, click Transfer link, choose the
            tickets you want to transfer, and enter your friend’s email or phone
            number.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header leadingIcon={<StarIcon />}>
            What happens if the event is postponed and I cannot attend on the
            rescheduled date and so I would like a refund?
          </Accordion.Header>
          <Accordion.Panel>
            If the event is postponed, your tickets will remain valid for the
            rescheduled date.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  },
};

export const WithoutTopAndBottomBorders: Story = {
  args: {
    showTopBorder: false,
    showBottomBorder: false,
  },
  render: function Render(args) {
    return (
      <Accordion {...args}>
        <Accordion.Item>
          <Accordion.Header>Where can I find my tickets?</Accordion.Header>
          <Accordion.Panel>
            Log in to your <a href="#test">Ticketmaster</a> account and navigate
            to My Tickets - Upcoming Events. There you can view all your orders.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            How do I transfer tickets to a friend?
          </Accordion.Header>
          <Accordion.Panel>
            Select the order under My Tickets, click Transfer link, choose the
            tickets you want to transfer, and enter your friend’s email or phone
            number.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            What happens if the event is postponed and I cannot attend on the
            rescheduled date and so I would like a refund?
          </Accordion.Header>
          <Accordion.Panel>
            If the event is postponed, your tickets will remain valid for the
            rescheduled date.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  },
};

export const RTL: Story = {
  ...Multi,
  globals: {
    addonRtl: "rtl",
  },
};
