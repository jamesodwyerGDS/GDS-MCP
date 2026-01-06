import React from "react";
import styled from "styled-components";
import { textStyle, spacing } from "../../dimensions";
import SeatInfov2, { type SeatLocation } from "../SeatInfov2";
import {
  getBackgroundColor,
  type BrandColors,
  type TicketType,
} from "../TicketCardv2";
import TicketInfoHeader, { TicketInfoButtonData } from "./TicketInfoHeader";
import SimpleSeatInfo from "../SimpleSeatInfo";

type TicketTopSectionProps = {
  /**
   * Title displayed under header title. One of the Accessible Ticket types
   * (ex. Wheelchair Accessible, Ambulant Disabled, etc.)
   */
  accessibleTitle?: string;
  /**
   * Title to display in header. Usually the ticket's description ex. 'Standard Admission', 'Standard Adult Ticket', etc.
   */
  headerTitle: string;
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
  /**
   * Title to display in header. Usually the ticket's description ex. 'Standard Admission', 'Standard Adult Ticket', etc.
   */
  voucherDisclaimer?: string;
};

const TicketTopSection = ({
  accessibleTitle,
  headerTitle,
  row,
  seat,
  section,
  ticketInfoButtonData,
  type,
  wayfindingColors,
  voucherDisclaimer,
}: TicketTopSectionProps) => {
  const shouldDisplayHeader =
    accessibleTitle || headerTitle || ticketInfoButtonData;

  if (type === "addedValue") {
    return (
      <TopSectionWrapper $type={type}>
        <TicketInfoHeader type={type} headerTitle={headerTitle} />
        <AddedValueInfoWrapper>
          {voucherDisclaimer && (
            <VoucherDisclaimer>{voucherDisclaimer}</VoucherDisclaimer>
          )}
          <SimpleSeatInfo row={row} seat={seat} section={section} />
        </AddedValueInfoWrapper>
      </TopSectionWrapper>
    );
  }

  return (
    <TopSectionWrapper $type={type} $wayfindingColors={wayfindingColors}>
      {shouldDisplayHeader && (
        <TicketInfoHeader
          accessibleTitle={accessibleTitle}
          ticketInfoButtonData={ticketInfoButtonData}
          type={type}
          headerTitle={headerTitle}
          wayfindingColors={wayfindingColors}
        />
      )}
      <SeatInfoWrapper>
        <SeatInfov2
          row={row}
          seat={seat}
          section={section}
          type={type}
          wayfindingColors={wayfindingColors}
        />
      </SeatInfoWrapper>
    </TopSectionWrapper>
  );
};

export default TicketTopSection;

export const TopSectionWrapper = styled.div<{
  $type: TicketType;
  $wayfindingColors?: BrandColors;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ $type }) =>
    $type === "addedValue" ? spacing.club : spacing.amphitheatre};
  width: 100%;
  padding: ${spacing.auditorium} ${spacing.hall};
  background-color: ${({ $type, $wayfindingColors }) =>
    getBackgroundColor($type, $wayfindingColors)};
`;

const SeatInfoWrapper = styled.div`
  padding: 0 ${spacing.hall};
`;

const AddedValueInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VoucherDisclaimer = styled.p`
  ${textStyle.snowdon};
  margin: 0;
`;
