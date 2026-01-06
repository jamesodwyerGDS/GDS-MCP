import React from "react";
import styled from "styled-components";
import { spacing, textStyle } from "../../dimensions";
import type { BrandColors, TicketType } from "../TicketCardv2";
import TicketInfoHeader, { TicketInfoButtonData } from "./TicketInfoHeader";
import { TopSectionWrapper } from "./TicketTopSection";
import { getTextColor } from "../SeatInfov2";

type TicketTopSectionGenericProps = {
  /**
   * Title displayed under header title. One of the Accessible Ticket types
   * ex (Wheelchair Accessible, Ambulant Disabled, etc.)
   */
  accessibleTitle?: string;
  /**
   * Header title ex. 'Standard Admission', 'Standard Adult Ticket', etc.
   */
  headerTitle: string;
  /**
   * Large text to display. Used instead of seat location information. ex. 'General Admission'
   */
  mainText: string;
  /**
   * Small text to display below main text.
   * Used as a 'subText' for GA tickets, but must include label (ex. 'REF: FLOOR-98-00' )
   * Used as a label for the membership number on membership tickets (ex. 'Membership #')
   */
  subText?: string;
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
   * @type BrandColors
   */
  wayfindingColors?: BrandColors;
};

const TicketTopSectionGeneric = ({
  accessibleTitle,
  headerTitle,
  mainText,
  subText,
  ticketInfoButtonData,
  type,
  wayfindingColors,
}: TicketTopSectionGenericProps) => {
  return (
    <TopSectionWrapper $type={type} $wayfindingColors={wayfindingColors}>
      <TicketInfoHeader
        accessibleTitle={accessibleTitle}
        ticketInfoButtonData={ticketInfoButtonData}
        type={type}
        headerTitle={headerTitle}
        wayfindingColors={wayfindingColors}
      />
      <MainTextWrapper $type={type} $wayfindingColors={wayfindingColors}>
        <BodyText>{mainText}</BodyText>
        {subText ? <Reference translate="no">{subText}</Reference> : null}
      </MainTextWrapper>
    </TopSectionWrapper>
  );
};

export default TicketTopSectionGeneric;

const MainTextWrapper = styled.div<{
  $type?: TicketType;
  $wayfindingColors?: BrandColors;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.club} ${spacing.hall} 0;
  color: ${({ theme, $type, $wayfindingColors }) =>
    getTextColor(theme, $type, $wayfindingColors)};
`;

const BodyText = styled.p`
  margin: 0;
  ${textStyle.etna}
`;

const Reference = styled.p`
  margin: 0;
  ${textStyle.snowdon}
  text-align: center;
`;
