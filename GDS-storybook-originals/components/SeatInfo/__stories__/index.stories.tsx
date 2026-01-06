import { Meta } from "@storybook/react-webpack5";
import SeatInfo from "..";

const meta: Meta<typeof SeatInfo> = {
  component: SeatInfo,
  title: "Components/SeatInfo",
  args: {
    timedEntryDetails: "",
    description: "",
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
    isDisplayInline: false,
  },
  tags: ["deprecated"],
};

export default meta;

export const Basic = {};

export const NoLevel = {
  args: { level: undefined },
};

export const NoSeatDetails = {
  args: { level: undefined, seat: { title: "Seat" } },
};

export const NoRowDetails = {
  args: { level: undefined, row: { title: "Row" } },
};

export const TimedEntry = {
  args: { timedEntryDetails: "Timed Entry Details Text" },
};

export const DisplayInline = {
  args: { isDisplayInline: true },
};

export const DisplayInlineNoRow = {
  args: { isDisplayInline: true, row: { title: "Row" } },
};

export const WithDescription = {
  args: {
    level: undefined,
    seat: undefined,
    row: undefined,
    section: {
      title: "Section",
      details: "Floor - standing room only",
    },
    description: "This is unreserved general admission",
  },
};

export const NoDivider = {
  args: {
    styleVariant: "noDivider",
  },
};
