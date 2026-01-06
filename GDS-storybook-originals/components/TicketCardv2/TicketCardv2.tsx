import React from "react";
import styled, { DefaultTheme } from "styled-components";
import { elevation, spacing } from "../../dimensions";
import { mix } from "polished";
import BrandLogo from "../BrandLogo";

export type BrandColors = {
  background: string;
  foreground: string;
};

export type TicketType =
  | "disabled"
  | "membership"
  | "primary"
  | "resale"
  | "reserved"
  | "transfer"
  | "upsell"
  | "addedValue";

type Props = {
  /**
   * Content to display within card
   */
  children: React.ReactNode;
  /**
   * Exclude logo from top bar
   * @default false
   */
  excludeLogo?: boolean;
  /**
   * Type of ticket
   * @default 'primary'
   */
  status?: TicketType;
  /**
   * Optional wayfinding colors. Affects header border color and logo color
   * Only used if status is 'primary'
   * @type BrandColors
   */
  wayfindingColors?: BrandColors;
} & React.ComponentPropsWithoutRef<"div">;

const TicketCardv2 = ({
  children,
  excludeLogo = false,
  status = "primary",
  wayfindingColors,
  ...rest
}: Props) => {
  return (
    <Card {...rest}>
      <TicketHeaderBorder
        excludeLogo={excludeLogo}
        status={status}
        wayfindingColors={status === "primary" ? wayfindingColors : undefined}
      />
      <ChildrenWrapper $type={status} $wayfindingColors={wayfindingColors}>
        {children}
      </ChildrenWrapper>
    </Card>
  );
};

type TicketHeaderBorderProps = {
  /**
   * Exclude logo from top bar
   */
  excludeLogo: boolean;
  /**
   * Status of ticket
   */
  status: TicketType;
  /**
   * Optional wayfinding colors. Affects header border color and logo color
   * @type BrandColors
   */
  wayfindingColors?: BrandColors;
};

const TicketHeaderBorder = ({
  excludeLogo,
  status,
  wayfindingColors,
}: TicketHeaderBorderProps) => {
  return (
    <TicketHeaderBorderContainer
      $thinBorder={excludeLogo}
      $status={status}
      $wayfinding={wayfindingColors}
    >
      {!excludeLogo && <BrandLogo color={wayfindingColors?.foreground} />}
    </TicketHeaderBorderContainer>
  );
};

export default TicketCardv2;

export const Card = styled.div`
  ${elevation.level1};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${(props) => props.theme.base.bg};
`;

export const getBackgroundColor = (
  type: TicketType,
  wayfinding?: BrandColors,
) => {
  if (wayfinding && statusesWithWayfinding.includes(type)) {
    return wayfinding.background;
  } else {
    return "initial";
  }
};

export const ChildrenWrapper = styled.div<{
  $type: TicketType;
  $wayfindingColors?: BrandColors;
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const TicketHeaderBorderContainer = styled.div<{
  $thinBorder?: boolean;
  $status: TicketType;
  $wayfinding?: BrandColors;
}>`
  display: flex;
  width: 100%;
  height: ${({ $thinBorder }) =>
    $thinBorder ? spacing.lounge : spacing.amphitheatre};
  padding: ${({ $thinBorder }) => ($thinBorder ? 0 : "0.3rem 0")};
  background-color: ${(props) => {
    const { $status, theme, $wayfinding } = props;
    return getHeaderBackgroundColor($status, theme, $wayfinding);
  }};
`;

export const statusesWithWayfinding: TicketType[] = ["primary", "resale"];

const getHeaderBackgroundColor = (
  status: TicketType,
  theme: DefaultTheme,
  $wayfinding?: BrandColors,
) => {
  if ($wayfinding && statusesWithWayfinding.includes(status)) {
    const { foreground, background } = $wayfinding;

    if (["#ffffff", "#fff"].includes(foreground.toLowerCase())) {
      return mix(0.1, "#000", background);
    } else {
      return mix(0.2, "#fff", background);
    }
  }

  const statusToColorDictionary: Record<TicketType, string> = {
    disabled: theme.status.default,
    membership: theme.base.primary,
    primary: theme.base.primary,
    resale: theme.colors.resale,
    reserved: theme.base.primary,
    transfer: theme.status.default,
    upsell: theme.base.primary,
    addedValue: theme.base.primary,
  };

  return statusToColorDictionary[status];
};
