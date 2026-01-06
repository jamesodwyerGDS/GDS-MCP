"use client";
import React, { Fragment } from "react";
import useCountdown from "../../hooks/useCountdown";
import { _spacing_, media, spacing, textStyle } from "../../dimensions";
import styled, { css, DefaultTheme } from "styled-components";
import { barely, muted, weak, weakest } from "../../colors";

type FillVariant = "ghost" | "outline" | "fill";

type Labels = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type Size = "small" | "medium" | "large" | "responsive";

type Props = {
  /** Date to countdown till */
  date: string | number | Date;
  /** Determines the countdown time elements style */
  fillVariant?: FillVariant;
  /** Determines whether days are excluded */
  hideDays?: boolean;
  /** Determines whether hours are excluded */
  hideHours?: boolean;
  /** Determines whether seconds are excluded */
  hideSeconds?: boolean;
  /** Determines whether the the countdown time elements color is inverse or not */
  inverse?: boolean;
  /** Labels for all time elements */
  labels: Labels;
  /** Determines the countdown size */
  size: Size;
  /** Aria Label for the time left in countdown */
  timeLeftLabel: string;
  /** Determines whether the the countdown container and its unit components should take the empty space remaining */
  fullWidth?: boolean;
};

type PropsAndTheme = Props & {
  disabled: boolean;
  theme: DefaultTheme;
  $fullWidth?: boolean;
};

/**
 * @beta
 * This component is subject to breaking changes as we test and gather feedback.
 */
const Countdown = (props: Props) => {
  const {
    date,
    hideDays,
    hideHours,
    hideSeconds,
    labels,
    size,
    timeLeftLabel,
    fullWidth = false,
  } = props;
  const { days, hours, minutes, seconds } =
    useCountdown({
      to: date,
      showDays: !hideDays,
      showHours: !hideHours,
      showSeconds: !hideSeconds,
    }) ?? {};

  const time = [
    { id: "days", label: labels.days, value: days },
    { id: "hours", label: labels.hours, value: hours },
    { id: "minutes", label: labels.minutes, value: minutes },
    { id: "seconds", label: labels.seconds, value: seconds },
  ];

  return (
    <Container
      aria-atomic="true"
      aria-label={timeLeftLabel}
      data-component="Countdown"
      data-version="1.0.0"
      role="timer"
      $fullWidth={fullWidth}
    >
      {time.map((item, index) => {
        const { label, value } = item;
        const prevDisabled = !time[index - 1] || !time[index - 1].value;
        const daysDisabled = !time[0].value;
        const disabled = value === 0 && prevDisabled && daysDisabled;
        const formattedTime = value?.toString().padStart(2, "0");
        let showColon = time[time.length - 1] !== time[index];

        if (value === undefined) return;
        if (item.id === "minutes" && hideSeconds) showColon = false;

        return (
          <Fragment key={label}>
            <Wrapper {...props} disabled={disabled} $fullWidth={fullWidth}>
              <Time $size={size}>{formattedTime}</Time>
              <Label {...props} disabled={disabled}>
                {label}
              </Label>
            </Wrapper>
            {showColon && (
              <Colon {...props} disabled={disabled}>
                :
              </Colon>
            )}
          </Fragment>
        );
      })}
    </Container>
  );
};

export default Countdown;

const backgroundAndBorderStyles = ({
  disabled,
  fillVariant = "fill",
  inverse = false,
  theme,
}: PropsAndTheme) => {
  const backgroundColor = inverse
    ? disabled
      ? barely(theme.base.borderDark)
      : barely(theme.base.bg)
    : disabled
      ? theme.base.bgAlt
      : theme.base.borderLight;

  const borderColor = inverse
    ? disabled
      ? barely(theme.base.borderDark)
      : weakest(theme.base.borderDark)
    : disabled
      ? theme.base.borderLight
      : theme.base.borderMidtone;

  switch (fillVariant) {
    case "outline":
      return css`
        border: 2px solid ${borderColor};
      `;
    case "fill":
      return css`
        background-color: ${backgroundColor};
      `;
    case "ghost":
    default:
      return;
  }
};

const secondaryColor = ({
  disabled,
  inverse = false,
  theme,
}: PropsAndTheme) => {
  const color = inverse
    ? disabled
      ? theme.text.secondary
      : weak(theme.text.inverse)
    : disabled
      ? muted(theme.text.secondary)
      : theme.text.secondary;

  return color;
};

const primaryColor = ({ disabled, inverse = false, theme }: PropsAndTheme) => {
  const color = inverse
    ? disabled
      ? theme.text.secondary
      : theme.text.inverse
    : disabled
      ? theme.base.borderMidtone
      : theme.text.primary;

  return color;
};

const fontSize = {
  small: "24px",
  medium: "32px",
  large: "44px",
};

// Time has spacing after the text, this is
// needed for centering Time with the unit label.
const paddingCenterAlign = {
  small: "1px",
  medium: "2px",
  large: spacing.lounge,
};

// Ghost variant should not not have extra padding to the top/bottom.
const aspectRatio = ({ fillVariant = "fill" }: Props) => {
  return fillVariant === "ghost" ? 0 : 1 / 1;
};

const boxSize = ({ size = "large" }: Props) => {
  const sizes = {
    small: { style: textStyle.kilimanjaro, width: "80px", minWidth: "64px" },
    medium: { style: textStyle.kilimanjaro, width: "96px", minWidth: "80px" },
    large: { style: textStyle.everest, width: "144px", minWidth: "104px" },
  };

  if (size === "responsive") {
    return css`
      ${sizes.small.style};
      width: ${sizes.small.width};
      min-width: ${sizes.small.minWidth};
      font-size: ${fontSize.small};
      line-height: ${fontSize.small};

      @media (${media.small}) {
        ${sizes.medium.style};
        width: ${sizes.medium.width};
        min-width: ${sizes.medium.minWidth};
        font-size: ${fontSize.medium};
        line-height: ${fontSize.medium};
      }

      @media (${media.medium}) {
        ${sizes.large.style};
        width: ${sizes.large.width};
        min-width: ${sizes.large.minWidth};
        font-size: ${fontSize.large};
        line-height: ${fontSize.large};
      }
    `;
  }

  const definedSize = sizes[size];
  return css`
    ${definedSize.style};
    width: ${definedSize.width};
    min-width: ${definedSize.minWidth};
    font-size: ${fontSize[size]};
    line-height: ${fontSize[size]};
  `;
};

const Colon = styled.p`
  ${textStyle.boising};
  margin: ${({ fillVariant }) =>
    fillVariant === "ghost" ? "0 0 22px 0" : "0"};
  padding: 0 ${spacing.lounge};
  color: ${primaryColor};
`;

const Container = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ $fullWidth }) => $fullWidth && `justify-content: space-between`};
`;

const Label = styled.p`
  ${textStyle.snowdon};
  margin: 0;
  color: ${secondaryColor};
`;

const Wrapper = styled.div`
  ${boxSize};
  ${backgroundAndBorderStyles};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: ${aspectRatio};
  color: ${primaryColor};
  ${({ $fullWidth }) => $fullWidth && `flex: 1`};
`;

const Time = styled.span<{ $size: Size }>`
  margin: 0;
  ${({ $size = "large" }) => {
    if ($size === "responsive") {
      return css`
        padding-inline-start: ${paddingCenterAlign.small};

        @media (${media.small}) {
          padding-inline-start: ${paddingCenterAlign.medium};
        }

        @media (${media.medium}) {
          padding-inline-start: ${paddingCenterAlign.large};
        }
      `;
    }
    return css`
      padding-inline-start: ${paddingCenterAlign[$size]};
    `;
  }};
`;
