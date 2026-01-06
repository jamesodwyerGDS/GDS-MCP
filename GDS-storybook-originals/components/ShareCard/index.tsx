"use client";
import * as React from "react";
import styled from "styled-components";
import BrandLogo from "../BrandLogo";
import { spacing, textStyle } from "../../dimensions";
import DisplayHeading from "../DisplayHeading/DisplayHeading";

/**
 * @beta
 * This component is subject to breaking changes as we test and gather feedback.
 */
export type ShareCardProps = {
  imageUrl: string;
  cardTitle: string;
  pretext: string;
  text: string;
  subtext: string;
  headingLevel: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
};

const ShareCard = React.forwardRef<HTMLDivElement, ShareCardProps>(
  (
    { imageUrl, cardTitle, pretext, text, subtext, headingLevel, onError },
    ref,
  ) => (
    <Card ref={ref}>
      <BlurredBackground imageUrl={imageUrl} />
      <Content>
        <DisplayHeading inverse uppercase size="medium" as={headingLevel}>
          {cardTitle}
        </DisplayHeading>
        <MidSection>
          <ImageWrapper>
            <EventImage src={imageUrl} onError={onError} />
            <DateText>{pretext}</DateText>
          </ImageWrapper>
          <TextWrapper>
            <EventTitleText>{text}</EventTitleText>
            <VenueText>{subtext}</VenueText>
          </TextWrapper>
        </MidSection>
        <BrandWrapper>
          <BrandLogo />
        </BrandWrapper>
      </Content>
    </Card>
  ),
);

ShareCard.displayName = "ShareCard";

const Card = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 1fr;
  width: 390px;
  height: auto;
  min-height: 659px;
  padding: ${spacing.arena};
  border-radius: 16px;
  overflow: hidden;
  color: ${(props) => props.theme.text.inverse};
  text-align: center;

  background-color: ${(props) => props.theme.base.bgInverse};
`;

const BlurredBackground = styled.div<{ imageUrl: string }>`
  position: absolute;
  inset: 0;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-position: center;
  background-size: cover;
  transform: scale(1.05);
  filter: blur(32px);
`;

const Content = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  place-content: center;
  grid-area: 1 / 1;
  gap: ${spacing.stadium};
  border-radius: 16px;
`;

const MidSection = styled.div`
  max-width: 326px;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  display: grid;
`;

const EventImage = styled.img`
  display: block;
  grid-area: 1 / 1;
  width: 100%;
  height: auto;
  max-height: 218px;
  object-fit: contain;
`;

// The -webkit- prefixes are needed to make line-clamping work until the non-prefixed line-clamp is widely supported.
const DateText = styled.p`
  display: -webkit-box;
  grid-area: 1 / 1;
  align-self: end;
  justify-self: start;
  max-width: 302px;
  margin: 0;
  padding: ${spacing.hall} ${spacing.auditorium} 0;
  overflow: hidden;
  background: ${(props) => props.theme.base.bgInverse};
  ${textStyle.etna};
  -webkit-line-clamp: 1;
  /* The -webkit- prefixes are needed to make line-clamping work until the non-prefixed line-clamp is widely supported. */
  /* stylelint-disable-next-line property-no-deprecated */
  -webkit-box-orient: block-axis;
`;

const TextWrapper = styled.div`
  width: 100%;
  padding-bottom: ${spacing.hall};
  text-align: start;
  background: ${(props) => props.theme.base.bgInverse};
`;

const EventTitleText = styled.p`
  display: -webkit-box;
  margin: 0;
  padding: ${spacing.hall} ${spacing.auditorium} 0;

  overflow: hidden;
  ${textStyle.vinson};

  text-transform: uppercase;

  -webkit-line-clamp: 4;
  /* The -webkit- prefixes are needed to make line-clamping work until the non-prefixed line-clamp is widely supported. */
  /* stylelint-disable-next-line property-no-deprecated */
  -webkit-box-orient: block-axis;
`;

const VenueText = styled.p`
  display: -webkit-box;
  margin: 0;
  padding: ${spacing.hall} ${spacing.auditorium} 0;
  overflow: hidden;
  color: ${(props) => props.theme.text.inverse};
  background: ${(props) => props.theme.base.bgInverse};

  ${textStyle.etna};

  -webkit-line-clamp: 1;
  /* The -webkit- prefixes are needed to make line-clamping work until the non-prefixed line-clamp is widely supported. */
  /* stylelint-disable-next-line property-no-deprecated */
  -webkit-box-orient: block-axis;
`;

const BrandWrapper = styled.div`
  width: 100px;
  height: 18px;
  margin: auto;
`;

export default ShareCard;
