"use client";
import * as React from "react";
import Toggle from "../Toggle";
import ChevronIcon from "../../icons/dist/ChevronIcon";
import SeatInfo from "../SeatInfo";
import {
  Header,
  HeaderCol1,
  HeaderCol2,
  BorderRow,
  PriceRow,
  CtaWrapper,
  FeesRow,
  Button,
  SplitPrice,
} from "./index.styles";

type SeatData = {
  title: string;
  details?: string;
};

type Props = {
  title: React.ReactNode;
  quantity?: React.ReactNode;
  price?: string;
  feeContent?: React.ReactNode;
  priceRowCta?: React.ReactNode;
  section?: SeatData;
  row?: SeatData;
  seat?: SeatData;
  level?: SeatData;
  restrictions?: React.ReactNode;
  portal?: React.ReactNode;
  isDisplaySeatDetailsInline?: boolean;
  timedEntryDetails?: string;
  description?: string;
  splitPrice?: string;
  customSeatInfo?: React.ReactNode;
  ticketInfoCta?: React.ReactNode;
  ticketInfoCtaSlot?: "left" | "right";
  seatInfoVariant?: "default" | "noDivider";
};

/**
 * @deprecated Replaced by TicketTopSection and TicketTopSectionGeneric
 * TicketTopSection is for tickets with seating information (seat / row / section)
 * TicketTopSectionGeneric is mainly for General Admission tickets, or tickets without seating information
 * title has become headerTitle
 * quantity is deprecated
 * price / priceRowCta / feeContent no longer shown in this part of the ticket, and has been deprecated
 * section / row / seat is similar, but now takes a SeatLocation type
 * restrictions no longer shown here - deprecated
 * portal no longer shown here - deprecated
 * isDisplaySeatDetailsInline no longer used - deprecated
 * timedEntryDetails no longer used - deprecated
 * description no longer used - deprecated
 * splitPrice no longer used - deprecated
 * customSeatInfo no longer used - deprecated
 * ticketInfoCta - Instead of handing in a ReactNode, you now hand in TicketInfoButtonData, which contains both an
 * accessible description for the button, and a callback function to be called when the button is clicked.
 * ticketInfoCtaSlot no longer used - deprecated
 * seatInfoVariant no longer used - deprecated
 */
const TicketInfo = ({
  title,
  quantity,
  price,
  feeContent,
  priceRowCta,
  section,
  row,
  seat,
  level,
  restrictions,
  portal,
  isDisplaySeatDetailsInline = false,
  timedEntryDetails,
  description,
  splitPrice,
  customSeatInfo,
  ticketInfoCta,
  ticketInfoCtaSlot = "left",
  seatInfoVariant = "default",
}: Props) => (
  <div>
    <Header>
      <HeaderCol1 slot={ticketInfoCtaSlot}>
        {title}
        {ticketInfoCta}
      </HeaderCol1>
      {quantity && <HeaderCol2>{quantity}</HeaderCol2>}
    </Header>
    <BorderRow>
      {customSeatInfo ? (
        customSeatInfo
      ) : (
        <SeatInfo
          section={section}
          row={row}
          seat={seat}
          level={level}
          isDisplayInline={isDisplaySeatDetailsInline}
          timedEntryDetails={timedEntryDetails}
          description={description}
          styleVariant={seatInfoVariant}
        />
      )}
    </BorderRow>
    {restrictions && <BorderRow>{restrictions}</BorderRow>}
    {portal && <BorderRow>{portal}</BorderRow>}
    {price ? (
      feeContent ? (
        <Toggle>
          {({ getTogglerProps, isExpanded }) => (
            <>
              <PriceRow>
                <Button {...getTogglerProps()}>
                  <div>
                    <strong>{price}</strong>
                    {splitPrice && <SplitPrice>{splitPrice}</SplitPrice>}
                  </div>
                  <ChevronIcon rotate={isExpanded ? "-180" : "0"} />
                </Button>
                {priceRowCta && <CtaWrapper>{priceRowCta}</CtaWrapper>}
              </PriceRow>
              {isExpanded && <FeesRow>{feeContent}</FeesRow>}
            </>
          )}
        </Toggle>
      ) : (
        <PriceRow>
          <div>
            <strong>{price}</strong>
            {splitPrice && <SplitPrice>{splitPrice}</SplitPrice>}
          </div>
          {priceRowCta && <CtaWrapper>{priceRowCta}</CtaWrapper>}
        </PriceRow>
      )
    ) : (
      priceRowCta && (
        <PriceRow>
          <CtaWrapper>{priceRowCta}</CtaWrapper>
        </PriceRow>
      )
    )}
  </div>
);

export default TicketInfo;
