import React from "react";
import styled, { css, useTheme } from "styled-components";
import { spacing } from "../../dimensions";
import { PositionX, PositionY } from "./types";
import { Theme } from "../../themes/types";

type Props = {
  positionX: PositionX;
  positionY: PositionY;
};

const ArrowTip = React.forwardRef<SVGSVGElement, Props>(function ArrowTip(
  { positionX, positionY }: Props,
  ref,
) {
  const theme = useTheme() as Theme;
  return (
    <Image
      ref={ref}
      $positionX={positionX}
      $positionY={positionY}
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 8.29289L14.7929 1.5L1.20711 1.5L8 8.29289Z"
        fill="white"
        stroke={theme.base.borderDark}
      />
      <path
        d="M0.417968 1.32534e-06L7.99805 7.58008L15.5781 0L0.417968 1.32534e-06Z"
        fill="white"
      />
    </Image>
  );
});

export default ArrowTip;

const Image = styled.svg<{
  $positionX: PositionX;
  $positionY: PositionY;
}>`
  ${({ $positionX }) => setArrowTipPositionX($positionX)}
  ${({ $positionY }) => setArrowTipPositionY($positionY)}

  position: absolute;

  ${({ $positionX }) =>
    $positionX === "custom" &&
    css`
      inset-inline-end: 0px;
      inset-inline-start: 0px;
      margin: 0 auto;
    `}
`;

const setArrowTipPositionX = ($positionX: PositionX) => {
  const displayStart = $positionX === "start";
  const displayEnd = $positionX === "end";

  return displayStart
    ? css`
        inset-inline-start: ${spacing.auditorium};
      `
    : displayEnd
      ? css`
          inset-inline-end: ${spacing.auditorium};
        `
      : css`
          inset-inline-start: calc(50% - ${spacing.club});
        `;
};

const setArrowTipPositionY = ($positionY: PositionY) =>
  $positionY === "top"
    ? css`
        bottom: -${spacing.club};
        transform: rotate(0deg);
      `
    : css`
        top: -${spacing.club};
        transform: rotate(180deg);
      `;
