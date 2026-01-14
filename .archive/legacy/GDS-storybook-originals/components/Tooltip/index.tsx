"use client";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import { elevation, spacing, textStyle } from "../../dimensions";
import { PositionX, PositionY } from "./types";
import ArrowTip from "./ArrowTip";
import { useDelayedTooltipToggle } from "./useDelayedTooltipToggle";
import { getLogicalBoundingRect } from "../../utils/getLogicalBoundingRect";

const defaultPositionX = "centre";
const defaultPositionY = "top";
const defaultDesktopBreakpoint = 900;
const defaultZIndex = 2;

export type TooltipProps = {
  /** Action item (i.e. button or link) that allows the tooltip to be accessible by setting aria-describedby to the id prop  */
  children: ReactNode;
  /** boolean to enable click events for the tooltip to hide/show
   * @default false
   */
  enableClick?: boolean;
  /** boolean to enable hover events for the tooltip to hide/show
   *  @default false
   */
  enableHover?: boolean;
  /** height of header to reposition tooltip */
  headerHeight?: number;
  /** unique id to use for accessibility purposes */
  id: string;
  /** message that the tooltip displays when show */
  message: ReactNode;
  /** set value for the X location of the tooltip when visible in window */
  positionX?: PositionX;
  /** set value for the Y location of the tooltip when visible in window */
  positionY?: PositionY;
  /**keeps position from being overidden */
  fixPosition?: boolean;
  /** root container that the tooltip is contained in */
  root?: HTMLElement | null;
  /** z-index of the tooltip */
  zIndex?: number;
  /** breakpoint for desktop */
  desktopBreakpoint?: number;
};

export type TooltipBodyProps = {
  /** message that the tooltip displays when show */
  children: ReactNode;
};

const Body = ({ children }: TooltipBodyProps) => (
  <Container>{children}</Container>
);

function Tooltip({
  children,
  enableClick = false,
  enableHover = false,
  headerHeight = 0,
  id,
  message,
  positionX = defaultPositionX,
  positionY = defaultPositionY,
  root,
  fixPosition,
  zIndex = defaultZIndex,
  desktopBreakpoint = defaultDesktopBreakpoint,
}: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const [overridePositionX, setOverridePositionX] = useState<PositionX | null>(
    null,
  );
  const [overridePositionY, setOverridePositionY] = useState<PositionY | null>(
    null,
  );
  const [showTooltip, setShowTooltip] = useState(false);

  const { handleHideTooltip, handleShowTooltip, handleToggleTooltip } =
    useDelayedTooltipToggle(tooltipRef, showTooltip, setShowTooltip);

  // overrides the set position props when the tooltip is not fully in the window frame
  const overridePosition = useCallback(() => {
    if (!tooltipRef.current) return;

    const tooltipElement = tooltipRef.current;
    const tooltipRect = getLogicalBoundingRect(tooltipElement);

    const containerRect = root ? getLogicalBoundingRect(root) : null;
    const containerHeight = containerRect?.blockEnd || window.innerHeight;
    const containerEnd = containerRect?.inlineEnd || window.innerWidth;
    const containerStart = containerRect?.inlineStart || 0;
    const containerTop = containerRect?.blockStart || 0;

    const calculateHorizontalOverflow = () => {
      // 192 is the distance between the start and end tooltip positions
      // This distance will always be the same number
      const tooltipWidth = 192;

      const direction = getComputedStyle(tooltipElement).direction;
      if (direction === "rtl") {
        return {
          overflowStart: tooltipRect.inlineStart > containerStart,
          overflowEnd: tooltipRect.inlineEnd < containerEnd,
          willOverflowStart:
            tooltipRect.inlineStart + tooltipWidth > containerStart,
          willOverflowEnd: tooltipRect.inlineEnd - tooltipWidth < containerEnd,
        };
      } else {
        return {
          overflowStart: tooltipRect.inlineStart < containerStart,
          overflowEnd: tooltipRect.inlineEnd > containerEnd,
          willOverflowStart:
            tooltipRect.inlineEnd - tooltipWidth < containerStart,
          willOverflowEnd: tooltipRect.inlineEnd + tooltipWidth > containerEnd,
        };
      }
    };
    const overflowBottom =
      tooltipRect.blockStart + tooltipRect.height > containerHeight;
    const overflowTop = tooltipRect.blockStart - headerHeight < containerTop;

    const { overflowStart, overflowEnd, willOverflowEnd, willOverflowStart } =
      calculateHorizontalOverflow();

    if (overflowStart) {
      setOverridePositionX("start");

      if (willOverflowEnd) {
        setOverridePositionX("centre");
      }
    } else if (overflowEnd && !fixPosition) {
      setOverridePositionX("end");

      if (willOverflowStart) {
        setOverridePositionX("centre");
      }
    }

    if (positionY === "bottom" && overflowBottom) {
      setOverridePositionY("top");
    } else if (positionY === "top" && overflowTop) {
      setOverridePositionY("bottom");
    }
  }, [fixPosition, headerHeight, positionY, root]);

  const resetDefaultPosition = useCallback(() => {
    setOverridePositionX(positionX);
    setOverridePositionY(positionY);
  }, [positionX, positionY]);

  useEffect(() => {
    resetDefaultPosition();
    if (showTooltip) overridePosition();
  }, [overridePosition, resetDefaultPosition, showTooltip]);

  return (
    <TooltipWrapper
      onClick={enableClick ? handleToggleTooltip : () => {}}
      onMouseEnter={enableHover ? handleShowTooltip : () => {}}
      onMouseLeave={enableHover ? handleHideTooltip : () => {}}
      onFocus={enableClick || enableHover ? handleShowTooltip : () => {}}
      onBlur={enableClick || enableHover ? handleHideTooltip : () => {}}
    >
      <Display
        ref={tooltipRef}
        role="tooltip"
        id={id}
        $showTooltip={showTooltip}
        $positionY={overridePositionY || positionY}
        $positionX={overridePositionX || positionX}
        $zIndex={zIndex}
        $desktopBreakpoint={desktopBreakpoint}
      >
        <ArrowTip
          positionX={overridePositionX || positionX}
          positionY={overridePositionY || positionY}
        />
        <Body>{message}</Body>
      </Display>
      {children}
    </TooltipWrapper>
  );
}

Tooltip.Arrow = ArrowTip;
Tooltip.Body = Body;

export default Tooltip;

// TODO: find a solution where we don't need a wrapper around this component
// This needs to be completed before we can mark this as stable
const TooltipWrapper = styled.div`
  position: relative;
  width: fit-content;
  overflow: visible;
`;

const Container = styled.div`
  ${elevation.level2};
  padding: ${spacing.hall} ${spacing.auditorium};
  border: 1px solid ${({ theme }) => theme.base.borderDark};
  border-radius: ${spacing.lounge};
  text-wrap: wrap;
  background: ${({ theme }) => theme.base.bg};
`;

const Display = styled.div<{
  $showTooltip: boolean;
  $positionY: string;
  $positionX: string;
  $zIndex: number;
  $desktopBreakpoint?: number;
}>`
  ${textStyle.etna}

  ${({ $showTooltip }) => hideTooltip($showTooltip)}

  ${({ $positionY, $positionX }) => setDisplayLocation($positionX, $positionY)}

  position: absolute;
  z-index: ${({ $zIndex }) => $zIndex};
  min-width: 200px;
  max-width: 240px;
  color: ${({ theme }) => theme.text.secondary};
  line-height: ${spacing.theatre};
  transition: opacity 0.3s ease-in;

  ${({ $desktopBreakpoint }) => `
    @media (min-width: ${$desktopBreakpoint}px) {
      min-width: 16rem;
      max-width: 320px;
    }
  `}
`;

const setDisplayLocation = ($positionX: string, $positionY: string) => {
  const displayStart = $positionX === "start";
  const displayEnd = $positionX === "end";
  const displayTop = $positionY === "top";
  const displayBottom = $positionY === "bottom";

  return css`
    top: ${displayTop ? "-50%" : "auto"};
    bottom: ${displayBottom ? "0%" : "auto"};
    inset-inline-start: ${displayStart
      ? `calc(50% - ${spacing.hall})`
      : displayEnd
        ? `calc(50% + ${spacing.hall})`
        : "50%"};
    transform: translate(
      ${displayStart
        ? `-${spacing.hall}`
        : displayEnd
          ? `calc(-100% + ${spacing.hall})`
          : "-50%"},
      ${displayTop ? "-100%" : `calc(100% + ${spacing.hall})`}
    );

    /* For RTL languages we need to translate in the opposite direction */
    :dir(rtl) {
      transform: translate(
        ${displayStart
          ? `${spacing.hall}`
          : displayEnd
            ? `calc(100% - ${spacing.hall})`
            : "50%"},
        ${displayTop ? "-100%" : `calc(100% + ${spacing.hall})`}
      );
    }
  `;
};

const hideTooltip = ($showTooltip: boolean) =>
  !$showTooltip &&
  css`
    visibility: hidden;
    opacity: 0;
  `;
