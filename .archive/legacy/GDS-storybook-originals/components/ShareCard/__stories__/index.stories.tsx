import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import ShareCard, { ShareCardProps } from "..";
import Button from "../../Button";
import { refToPng } from "../../../index";

const meta: Meta<typeof ShareCard> = {
  component: ShareCard,
  title: "Components/ShareCard",
  args: {
    imageUrl:
      "https://s1.ticketm.net/dam/a/b8c/5f4f5fab-6c0a-4fbd-bcfe-fdf7995dcb8c_RETINA_PORTRAIT_3_2.jpg",
    cardTitle: "I got in!",
    pretext: "Fri, 01 Jan 2024 19:30",
    text: "Event Title",
    subtext: "Venue Name",
    headingLevel: "h1",
  },
  tags: ["beta"],
};

export default meta;

type Story = StoryObj<typeof ShareCard>;

export const Basic: Story = {};

export const Clamped: Story = {
  args: {
    pretext:
      "Friday, 01 January 2024 19:30 Friday, 01 January 2024 19:30 Friday, 01 January 2024 19:30",
    text: "Event Title Event Title Event Title Event Title Event Title Event Title Event Title Event Title Event Title Event Title Event Title Event Title",
    subtext:
      "Venue Name Venue Name Venue Name Venue Name Venue Name Venue Name Venue Name Venue Name Venue Name Venue Name Venue Name Venue Name",
  },
};

/**
 * Example integration story.
 *
 * Shows how an application can attach a ref to ShareCard and generate
 * a downloadable PNG using the `refToPng` helper.
 *
 * This is intentionally kept outside the ShareCard API to ensure
 * the component remains purely presentational.
 */
export const WithDownload: Story = {
  render: (args: ShareCardProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    const handleDownload = async () => {
      try {
        const dataUrl = await refToPng(ref);
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "share-card.png";
        a.click();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Download failed", e);
      }
    };

    return (
      <>
        <ShareCard ref={ref} {...args} />
        <br />
        <Button type="button" onClick={handleDownload}>
          Download (Example)
        </Button>
      </>
    );
  },
};
