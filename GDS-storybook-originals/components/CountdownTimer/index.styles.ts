import styled, { css } from "styled-components";
import { spacing, textStyle } from "../../dimensions";

export type SizingProps = {
  $textPosition?: "bottom" | "start";
  $sizeVariant?: "regular" | "small";
};

export type ColorProps = {
  $colourVariant: "light" | "dark";
};

export type DisplayVariant = {
  $timeOnly?: boolean;
};

export const Container = styled.div<SizingProps>`
  display: flex;
  flex-direction: ${({ $textPosition }) =>
    $textPosition === "bottom" ? "column" : "row-reverse"};
  align-items: center;
  justify-content: center;
`;

export const TimerContainer = styled.div<
  SizingProps & ColorProps & DisplayVariant
>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $textPosition }) =>
    $textPosition === "bottom" ? "center" : "flex-end"};
  ${({ $textPosition }) =>
    $textPosition === "bottom"
      ? `margin-top: ${spacing.club}`
      : `margin-inline-end: ${spacing.hall}`};
  color: ${({ theme, $colourVariant }) =>
    $colourVariant === "light" ? theme.base.bg : theme.base.bgInverse};

  ${({ $timeOnly }) =>
    $timeOnly
      ? css`
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin: 0;
          padding: 0;
        `
      : null}
`;

const animationBezier = "cubic-bezier(.1, .85, .25, 1)";

export const Circle = styled.circle<ColorProps>`
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: all 3s ${animationBezier};
  will-change: stroke-dashoffset;
  fill: transparent;
  stroke: ${({ theme, $colourVariant }) =>
    $colourVariant === "light" ? theme.base.bg : theme.base.bgInverse};
  stroke-width: 60px;
`;

export const MaskCircle = styled.circle<ColorProps>`
  fill: ${({ theme, $colourVariant }) =>
    $colourVariant === "light" ? theme.base.bg : theme.base.bgInverse};
  stroke: ${({ theme, $colourVariant }) =>
    $colourVariant === "light" ? theme.base.bg : theme.base.bgInverse};
  stroke-width: 2;
`;

export const InnerCircle = styled.circle`
  transform-origin: 50% 50%;
  transition: all 3s ${animationBezier};
  will-change: r;
`;

export const TimeLeft = styled.span`
  min-width: 70px;
  text-align: start;

  ${textStyle.boising}
`;

export const Time = styled.span<SizingProps & DisplayVariant>`
  font-variant-numeric: tabular-nums;

  ${({ $sizeVariant }) =>
    $sizeVariant === "small"
      ? css`
          ${textStyle.vinson}
        `
      : textStyle.matterhorn}

  /* This is a fix to layout shifting caused by Averta font having varying numeric glyph widths */
  ${({ $textPosition, $sizeVariant, $timeOnly }) =>
    $textPosition === "start" && !$timeOnly
      ? css`
          min-width: ${$sizeVariant === "small" ? "57px" : "70px"};
          text-align: start;
        `
      : null}
`;
