import React from "react";
import styled, { useTheme } from "styled-components";
import { iconSize, textStyle } from "../../dimensions";
import IconButton from "../utils/IconButton";
import { InfoICircledIcon } from "../../icons";
import { BrandColors, TicketType } from "../TicketCardv2";
import { statusesWithWayfinding } from "../TicketCardv2/TicketCardv2";
import VisuallyHidden from "../utils/VisuallyHidden";

export type TicketInfoButtonData = {
  /**
   * Description to be read by screen readers
   */
  accessibleDescription: string;
  /**
   * Callback to execute when ticket info button is clicked.
   * Ticket info CTA button is only shown when this is provided
   */
  callback: () => void;
};

type TicketInfoHeaderProps = {
  /**
   * Title displayed under header title. One of the Accessible Ticket types
   * ex (Wheelchair Accessible, Ambulant Disabled, etc.)
   */
  accessibleTitle?: string;
  /**
   * Title text to display. Usually the ticket description ex. 'Standard Admission', 'General Admission', etc.
   */
  headerTitle: string;
  /**
   * Optional data used to display the ticket info button
   */
  ticketInfoButtonData?: TicketInfoButtonData;
  /**
   * Ticket type - controls text color
   */
  type: TicketType;
  /**
   * Optional wayfinding colors. Affects header border color and logo color
   * Only used if status is 'primary'
   */
  wayfindingColors?: BrandColors;
};

const ticketTypesWithDisabledColor = ["disabled", "transfer", "resale"];

const TicketInfoHeader = ({
  accessibleTitle,
  headerTitle,
  ticketInfoButtonData,
  type,
  wayfindingColors,
}: TicketInfoHeaderProps) => {
  const theme = useTheme();

  const getIconFillColor = () => {
    if (wayfindingColors && statusesWithWayfinding.includes(type)) {
      return wayfindingColors.foreground;
    } else if (ticketTypesWithDisabledColor.includes(type)) {
      return theme.text.secondary;
    } else {
      return "info";
    }
  };

  // Displays accessibleTitle as headerTitle if no headerTitle is given / is empty string
  return (
    <HeaderContainer>
      <HeaderTitle
        $type={type}
        $wayfindingColors={wayfindingColors}
        translate="no"
      >
        {headerTitle || accessibleTitle}
      </HeaderTitle>
      {accessibleTitle && headerTitle && (
        <AccessibleTitle
          $type={type}
          $wayfindingColors={wayfindingColors}
          translate="no"
        >
          {accessibleTitle}
        </AccessibleTitle>
      )}
      {ticketInfoButtonData?.callback && (
        <CtaContent>
          <TicketInfoButton onClick={ticketInfoButtonData.callback}>
            <VisuallyHidden>
              {ticketInfoButtonData.accessibleDescription}
            </VisuallyHidden>
            <InfoICircledIcon fillColor={getIconFillColor()} />
          </TicketInfoButton>
        </CtaContent>
      )}
    </HeaderContainer>
  );
};

export default TicketInfoHeader;

const HeaderContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 0.5fr 3fr 0.5fr;
  width: 100%;
`;

const HeaderTitle = styled.h3<{
  $type: TicketType;
  $wayfindingColors?: BrandColors;
}>`
  grid-row-start: 1;
  grid-column-start: 2;
  margin: 0;
  ${({ $type }) => {
    if ($type === "addedValue") return textStyle.fiji;
    return textStyle.boising;
  }};
  color: ${({ $type, $wayfindingColors, theme }) => {
    if ($wayfindingColors && statusesWithWayfinding.includes($type)) {
      return $wayfindingColors.foreground;
    } else if (ticketTypesWithDisabledColor.includes($type)) {
      return theme.text.secondary;
    } else {
      return "initial";
    }
  }};
  text-align: center;
`;

const AccessibleTitle = styled.h3<{
  $type: TicketType;
  $wayfindingColors?: BrandColors;
}>`
  ${textStyle.snowdon}
  grid-row-start: 2;
  grid-column-start: 2;
  margin: 0;
  color: ${({ $type, $wayfindingColors, theme }) => {
    if ($wayfindingColors && statusesWithWayfinding.includes($type)) {
      return $wayfindingColors.foreground;
    } else {
      return theme.text.secondary;
    }
  }};
  text-align: center;
`;

const CtaContent = styled.div`
  display: flex;
  grid-row-start: 1;
  grid-column-start: 3;
  align-items: center;
  justify-content: flex-end;
  height: 1.25rem;
`;

const TicketInfoButton = styled(IconButton)`
  position: relative;
  inset-inline-end: -${iconSize.margin};
  cursor: pointer;
`;
