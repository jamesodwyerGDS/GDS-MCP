"use client";
import * as React from "react";
import {
  List,
  FullWidthItem,
  LineWrapper,
  Item,
  Title,
  Details,
  InlineList,
  InlineItem,
  InlineTitle,
  InlineDetails,
  Description,
  FullWidthItemNoDivider,
  ItemNoDivider,
  TitleNoDivider,
  DetailsNoDivider,
} from "./index.styles";

type SeatData = {
  title: string;
  details?: string;
};

type Props = {
  timedEntryDetails?: string;
  level?: SeatData;
  section?: SeatData;
  row?: SeatData;
  seat?: SeatData;
  isDisplayInline?: boolean;
  description?: string;
  className?: string;
  styleVariant?: "default" | "noDivider";
};

const defaultSeatData = {
  title: "",
  details: "",
};

/**
 * @deprecated Replaced by SeatInfov2
 * level / section / row are similar, but take a 'title' and a 'value'
 * All other props are deprecated and no longer used
 * Ticket type must now be passed in to help with styling differences
 * Wayfinding colors can be passed in to affect text and background colors
 */
const SeatInfo = ({
  timedEntryDetails,
  level = defaultSeatData,
  section = defaultSeatData,
  row = defaultSeatData,
  seat = defaultSeatData,
  isDisplayInline = false,
  description,
  className,
  styleVariant = "default",
}: Props) => {
  const isStyleNoDivider = styleVariant === "noDivider";

  return timedEntryDetails ? (
    <strong className={className}>{timedEntryDetails}</strong>
  ) : isDisplayInline ? (
    <InlineList className={className}>
      {!!level.details && (
        <InlineItem>
          <InlineTitle>{level.title}</InlineTitle>{" "}
          <InlineDetails translate="no">{level.details}</InlineDetails>
        </InlineItem>
      )}
      {!!section.details && (
        <InlineItem>
          <InlineTitle>{section.title}</InlineTitle>{" "}
          <InlineDetails translate="no">{section.details}</InlineDetails>
        </InlineItem>
      )}
      {!!row.details && (
        <>
          <InlineItem>
            <InlineTitle>{row.title}</InlineTitle>{" "}
            <InlineDetails translate="no">{row.details}</InlineDetails>
          </InlineItem>
          {!!seat.details && (
            <InlineItem>
              <InlineTitle>{seat.title}</InlineTitle>{" "}
              <InlineDetails translate="no">{seat.details}</InlineDetails>
            </InlineItem>
          )}
        </>
      )}
    </InlineList>
  ) : (
    <>
      <List>
        {!!level.details &&
          (isStyleNoDivider ? (
            <FullWidthItemNoDivider>
              <TitleNoDivider>{level.title}</TitleNoDivider>
              <DetailsNoDivider translate="no">
                {level.details}
              </DetailsNoDivider>
            </FullWidthItemNoDivider>
          ) : (
            <FullWidthItem>
              <Title>{level.title}</Title>
              <Details translate="no">{level.details}</Details>
            </FullWidthItem>
          ))}
        {(!!section.details || !!row.details) &&
          (isStyleNoDivider ? (
            <LineWrapper>
              {!!section.details && (
                <ItemNoDivider>
                  <TitleNoDivider>{section.title}</TitleNoDivider>
                  <DetailsNoDivider translate="no">
                    {section.details}
                  </DetailsNoDivider>
                </ItemNoDivider>
              )}
              {!!row.details && (
                <>
                  <ItemNoDivider>
                    <TitleNoDivider>{row.title}</TitleNoDivider>
                    <DetailsNoDivider translate="no">
                      {row.details}
                    </DetailsNoDivider>
                  </ItemNoDivider>
                  <ItemNoDivider>
                    <TitleNoDivider>{seat.title}</TitleNoDivider>
                    <DetailsNoDivider translate="no">
                      {seat.details || "-"}
                    </DetailsNoDivider>
                  </ItemNoDivider>
                </>
              )}
            </LineWrapper>
          ) : (
            <LineWrapper>
              {!!section.details && (
                <Item>
                  <Title>{section.title}</Title>
                  <Details translate="no">{section.details}</Details>
                </Item>
              )}
              {!!row.details && (
                <>
                  <Item>
                    <Title>{row.title}</Title>
                    <Details translate="no">{row.details}</Details>
                  </Item>
                  <Item>
                    <Title>{seat.title}</Title>
                    <Details translate="no">{seat.details || "-"}</Details>
                  </Item>
                </>
              )}
            </LineWrapper>
          ))}
      </List>
      {description && <Description>{description}</Description>}
    </>
  );
};

export default SeatInfo;
