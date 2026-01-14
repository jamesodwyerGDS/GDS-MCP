import React from "react";
import styled, { DefaultTheme } from "styled-components";
import { textStyle } from "../../dimensions";
import {
  getBackgroundColor,
  statusesWithWayfinding,
  type BrandColors,
  type TicketType,
} from "../TicketCardv2";

export type SeatLocation = {
  /**
   * Title or label to display (ex. 'row')
   */
  title: string;
  /**
   * Value to display beside title (ex. '123')
   */
  value?: string;
};

export type SeatInfoProps = {
  /**
   * Row title and value
   */
  row?: SeatLocation;
  /**
   * Seat title and value
   */
  seat?: SeatLocation;
  /**
   * Section title and value
   */
  section?: SeatLocation;
  /**
   * Type or status of the ticket
   */
  type: TicketType;
  /**
   * Optional wayfinding colors. Affects header border color and logo color
   * Only used if status is 'primary'
   * @type BrandColors
   */
  wayfindingColors?: BrandColors;
};

const SeatInfov2 = ({
  seat,
  section,
  row,
  type,
  wayfindingColors,
}: SeatInfoProps) => {
  return (
    <RowList $type={type} $wayfindingColors={wayfindingColors}>
      <RowItem $slot="start">
        <LocationLabel $type={type} $wayfindingColors={wayfindingColors}>
          {section?.value ? section.title : ""}
        </LocationLabel>
        <LocationDescription
          $type={type}
          $wayfindingColors={wayfindingColors}
          $slot="start"
          translate="no"
        >
          {section?.value ? section.value : ""}
        </LocationDescription>
      </RowItem>
      <RowItem $slot="middle">
        <LocationLabel $type={type} $wayfindingColors={wayfindingColors}>
          {row?.value ? row.title : ""}
        </LocationLabel>
        <LocationDescription
          $type={type}
          $wayfindingColors={wayfindingColors}
          $slot="middle"
          translate="no"
        >
          {row?.value ? row.value : ""}
        </LocationDescription>
      </RowItem>
      <RowItem $slot="end">
        <LocationLabel $type={type} $wayfindingColors={wayfindingColors}>
          {seat?.value ? seat.title : ""}
        </LocationLabel>
        <LocationDescription
          $type={type}
          $wayfindingColors={wayfindingColors}
          $slot="end"
          translate="no"
        >
          {seat?.value ? seat.value : ""}
        </LocationDescription>
      </RowItem>
    </RowList>
  );
};

export type ColorVariant = undefined | "secondary";

export const getTextColor = (
  theme: DefaultTheme,
  type?: TicketType,
  wayfinding?: BrandColors,
  location?: "title" | undefined,
) => {
  if (!type) return theme.text.primary;

  if (wayfinding && statusesWithWayfinding.includes(type)) {
    const { foreground } = wayfinding;

    return foreground;
  } else if (location === "title") {
    return theme.text.secondary;
  } else {
    const overrideColors: Record<TicketType, ColorVariant> = {
      disabled: "secondary",
      membership: undefined,
      primary: undefined,
      resale: "secondary",
      reserved: undefined,
      transfer: "secondary",
      upsell: undefined,
      addedValue: undefined,
    };

    const overrideColor = overrideColors[type];

    return overrideColor ? theme.text.secondary : theme.text.primary;
  }
};

const RowList = styled.dl<{
  $type: TicketType;
  $wayfindingColors?: BrandColors;
}>`
  display: flex;
  justify-content: space-between;
  margin: 0;
  background-color: ${({ $type, $wayfindingColors }) => {
    return getBackgroundColor($type, $wayfindingColors);
  }};
`;

type Slot = "start" | "middle" | "end";

const RowItem = styled.div<{ $slot: Slot }>`
  display: grid;
  row-gap: 2px;
  grid-template-rows: repeat(2, min-content);
  justify-items: ${({ $slot }) => {
    switch ($slot) {
      case "start":
        return "flex-start";
      case "middle":
        return "center";
      case "end":
        return "flex-end";
      default:
        return "flex-start";
    }
  }};
`;

type ThemeProps = {
  $type: TicketType;
  $wayfindingColors?: BrandColors;
};

const LocationLabel = styled.dt<ThemeProps>`
  width: fit-content;
  margin: 0px;
  color: ${({ theme, $type, $wayfindingColors }) =>
    getTextColor(theme, $type, $wayfindingColors, "title")};
  ${textStyle.nevis}
  text-align: center;
  text-transform: uppercase;
`;

const LocationDescription = styled.dd<ThemeProps & { $slot: Slot }>`
  width: 100%;
  margin: 0px;
  overflow: hidden;
  color: ${({ theme, $type, $wayfindingColors }) =>
    getTextColor(theme, $type, $wayfindingColors)};
  ${textStyle.vinson}
  text-align: ${({ $slot }) => ($slot === "middle" ? "center" : $slot)};
  overflow-wrap: break-word;
`;

export default SeatInfov2;
