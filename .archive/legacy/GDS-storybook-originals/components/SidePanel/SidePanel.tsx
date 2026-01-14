"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import {
  Dialog,
  DialogDescription,
  DialogDismiss,
  DialogHeading,
  Heading,
  HeadingLevel,
  HeadingLevelProps,
  useDialogStore,
  useStoreState,
} from "@ariakit/react";
import { RemoveScroll } from "react-remove-scroll";

import { elevation, iconSize, spacing, textStyle } from "../../dimensions";
import SquareButton from "../SquareButton";
import { CrossIcon, ArrowIcon } from "../../icons";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { SidePanelContext, useSidePanelContext } from "./SidePanelContext";
import { usePortalElement } from "../../hooks/usePortalElement";

export type Placement = "left" | "right" | "start" | "end";

type SidePanelProps = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen?: boolean;
  /**
   * Side Panel placement
   *
   * Determines from which side the SidePanel will appear.
   * 'start': From the start of the viewport (usually left for LTR languages) and 'end': From the end of the viewport (usually right for LTR languages).
   * @default 'end'
   */
  placement?: Placement;
  /**
   * Determines the positioning of the SidePanel.
   *
   * - `false`: The Panel will be fixed to the viewport.
   * - `true`: The Panel will be absolutely positioned within its container (not applicable when on mobile), confined by the container's boundaries. The body remains scrollable, and clicking outside won't close the SidePanel.
   *
   * @default false
   */
  isContained?: boolean;
  /**
   * Max viewport width for Mobile (inclusive)
   * Renders the SidePanel always fixed to the viewport
   */
  mobileMaxViewportWidth: string;
  /**
   * Determines whether to show an overlay behind the SidePanel when open.
   * If false, the overlay will be transparent.
   * @default true
   */
  showOverlay?: boolean;
  /**
   * String describing the panel that is read out for assistive technology.
   * As this will probably always be the same as the title of the panel, you can reuse the string.
   */
  ariaLabel: string;
  /**
   * CSS class to apply custom styling to the SidePanel.
   *
   * Note: Try to minimize style overrides to maintain consistent design across everywhere.
   */
  className?: string;

  /**
   * Function to enable elements when sidepanel is open
   */
  getPersistentElements?: () => Iterable<Element>;
  /**
   * Determines whether the SidePanel should be wider.
   * When true, the SidePanel width will be 548px instead of the default 420px.
   * @default false
   */
  extraWide?: boolean;
};

const SidePanel = ({
  isOpen = false,
  onClose,
  placement = "end",
  children,
  isContained = false,
  showOverlay = true,
  mobileMaxViewportWidth,
  ariaLabel,
  className,
  getPersistentElements,
  extraWide = false,
}: SidePanelProps) => {
  const isMobile = useMediaQuery(`(max-width : ${mobileMaxViewportWidth})`);

  const dialogStore = useDialogStore({
    open: isOpen,
    setOpen(open) {
      if (!open) {
        onClose();
      }
    },
  });

  const contextValue = useMemo(
    () => ({
      isContained,
    }),
    [isContained],
  );

  const mounted = useStoreState(dialogStore, "mounted");
  const portalElement = usePortalElement();

  if (!mounted) return null;

  return (
    <SidePanelContext.Provider value={contextValue}>
      <RemoveScroll
        forwardProps
        allowPinchZoom
        enabled={isMobile || !isContained ? isOpen : false}
      >
        <StyledSidePanel
          hideOnInteractOutside={!isContained}
          store={dialogStore}
          portalElement={portalElement}
          backdrop={
            isContained ? false : <Overlay $showOverlay={showOverlay} />
          }
          modal={isMobile || !isContained}
          portal={isMobile || !isContained}
          // The implementation of AriKit for body scroll lock doesn't work for iCCP since it resets window scroll on iOS, temporary use a custom solution until fixed on their side
          preventBodyScroll={false}
          getPersistentElements={getPersistentElements}
          aria-modal
          className={className}
          $placement={placement}
          $isContained={isContained}
          $mobileMaxViewportWidth={mobileMaxViewportWidth}
          $extraWide={extraWide}
          // aria-labelledby does not work reliably in Chrome/Firefox w VoiceOver, so we use aria-label instead (GDS-278)
          aria-label={ariaLabel}
          {...(ariaLabel ? { "aria-labelledby": undefined } : {})}
        >
          {children}
        </StyledSidePanel>
      </RemoveScroll>
    </SidePanelContext.Provider>
  );
};

type HeaderProps = {
  children: React.ReactNode;
} & (
  | { backButtonLabel: string; closeButtonLabel?: string }
  | { closeButtonLabel: string; backButtonLabel?: string }
);

const Header = ({
  closeButtonLabel,
  backButtonLabel,
  children,
}: HeaderProps) => {
  return (
    <StyledHeader>
      {backButtonLabel ? <BackButton label={backButtonLabel} /> : null}
      <StyledTitleContainer
        $padStart={!!backButtonLabel}
        $padEnd={!!closeButtonLabel}
      >
        {children}
      </StyledTitleContainer>
      {closeButtonLabel ? <CloseButton label={closeButtonLabel} /> : null}
    </StyledHeader>
  );
};

const Title = ({
  level,
  children,
}: {
  /**
   * Specifies the heading level, only applicable when the SidePanel isContained.
   *
   * @default 1, or 2 when the Panel `isContained`.
   */
  level?: Extract<HeadingLevelProps, "level">;
  children: React.ReactNode;
}) => {
  const { isContained } = useSidePanelContext();
  return (
    <HeadingLevel level={isContained ? level || 2 : 1}>
      <StyledTitle>{children}</StyledTitle>
    </HeadingLevel>
  );
};

const Subtitle = ({
  level,
  children,
}: {
  /**
   * Specifies the heading level, only applicable when the SidePanel `isContained`.
   *
   * @default 2, or 3 when `isContained` is true.
   */
  level?: Extract<HeadingLevelProps, "level">;
  children: React.ReactNode;
}) => {
  const { isContained } = useSidePanelContext();
  return (
    <HeadingLevel level={isContained ? level || 3 : 2}>
      <StyledSubtitle>{children}</StyledSubtitle>
    </HeadingLevel>
  );
};

const CloseButton = ({ label }: { label: string }) => {
  return (
    <DialogDismiss
      render={({ onClick }) => (
        <StyledIconButton
          variant={"ghost"}
          label={label}
          onClick={onClick}
          icon={<CrossIcon size="1em" />}
          $placement="end"
        />
      )}
    />
  );
};

const BackButton = ({ label }: { label: string }) => {
  return (
    <DialogDismiss
      render={({ onClick }) => (
        <StyledIconButton
          variant={"ghost"}
          label={label}
          onClick={onClick}
          icon={<ArrowIcon size="1em" />}
          $placement="start"
        />
      )}
    />
  );
};

const TopWideContainer = ({
  className,
  sticky = false,
  children,
}: {
  className?: string;
  sticky?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <StyledTopWideContainer className={className} $sticky={sticky}>
      {children}
    </StyledTopWideContainer>
  );
};

const Content = ({
  hasPadding = true,
  children,
  labelId,
}: {
  hasPadding?: boolean;
  labelId?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasScroll, setHasScroll] = useState<boolean>(false);

  useEffect(() => {
    const tag = ref.current;

    if (!tag) return;

    const resizeObserver = new ResizeObserver(() => {
      const overflowY = getComputedStyle(tag, null).overflowY;

      if (
        tag.scrollHeight > tag.clientHeight &&
        (overflowY === "auto" || overflowY === "scroll")
      ) {
        setHasScroll(true);
      } else {
        setHasScroll(false);
      }
    });

    resizeObserver.observe(tag);

    return () => resizeObserver.disconnect();
  }, [setHasScroll]);

  return (
    <StyledContent
      $hasPadding={hasPadding}
      ref={ref}
      tabIndex={hasScroll ? 0 : -1}
      aria-labelledby={labelId}
    >
      {children}
    </StyledContent>
  );
};

const StyledSidePanel = styled(Dialog)<{
  $placement: Placement;
  $isContained: boolean;
  $mobileMaxViewportWidth: string;
  $extraWide?: boolean;
}>`
  --gds-side-panel-padding-size: ${spacing.theatre};
  --gds-side-panel-border-color: ${(props) => props.theme.base.borderMidtone};
  ${elevation.level4};
  position: fixed;
  inset: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;

  background-color: ${(props) => props.theme.base.bg};
  transform: translateX(
    ${(props) =>
      props.$placement === "left" || props.$placement === "start"
        ? "-100%"
        : "100%"}
  );
  transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);

  /* For RTL languages the panel needs to come in from the opposite direction */
  :dir(rtl) {
    transform: translateX(
      ${(props) =>
        props.$placement === "left" || props.$placement === "start"
          ? "100%"
          : "-100%"}
    );
  }

  &[data-enter] {
    transform: translateX(0);
  }

  /* Styles that applicable on Desktop only */
  ${(props) =>
    `@media not all and (max-width: ${props.$mobileMaxViewportWidth})`} {
    position: ${(props) => props.$isContained && "absolute"};
    width: ${(props) =>
      props.$isContained ? "100%" : props.$extraWide ? "548px" : "420px"};
    ${(props) =>
      props.$placement === "left" || props.$placement === "start"
        ? css`
            inset-inline-end: auto;
            inset-inline-start: 0;
          `
        : css`
            inset-inline-end: 0;
            inset-inline-start: auto;
          `};
  }
`;

const StyledHeader = styled.header`
  --gds-side-panel-icon-size: 32px;
  position: relative;
  padding: var(--gds-side-panel-padding-size);
  border-bottom: 1px solid var(--gds-side-panel-border-color);
`;

const StyledIconButton = styled(SquareButton)<{ $placement: "start" | "end" }>`
  position: absolute;
  top: var(--gds-side-panel-padding-size);
  width: var(--gds-side-panel-icon-size);
  height: var(--gds-side-panel-icon-size);
  ${(props) =>
    props.$placement === "start"
      ? css`
          inset-inline-start: var(--gds-side-panel-padding-size);
        `
      : css`
          inset-inline-end: var(--gds-side-panel-padding-size);
        `}

  /* 
    *   Increase clickable area for accessibility to 44px (iconSize.total) because the icon size in the design is 32px
    *   Calculate the difference (44px - 32px = 12px), divide by 2 for each side (6px),
    *   and apply it inward with a negative inset. 
    */
  &::after {
    position: absolute;
    inset: calc((${iconSize.total} - var(--gds-side-panel-icon-size)) / 2 * -1);
    width: ${iconSize.total};
    height: ${iconSize.total};
    content: "";
  }
`;

const StyledTitleContainer = styled.div<{
  $padStart: boolean;
  $padEnd: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lounge};
  justify-content: center;
  /* To make the title and the icons align on the same line */
  min-height: var(--gds-side-panel-icon-size);
  padding-inline-end: ${(props) =>
    props.$padEnd
      ? `calc(var(--gds-side-panel-icon-size) + ${spacing.hall})`
      : 0};
  padding-inline-start: ${(props) =>
    props.$padStart
      ? `calc(var(--gds-side-panel-icon-size) + ${spacing.hall})`
      : 0};
`;

const StyledTitle = styled(DialogHeading)`
  position: relative;
  ${textStyle.fiji}
  margin: 0;
`;

const StyledSubtitle = styled(Heading)`
  ${textStyle.etna}
  margin: 0;
  color: ${(props) => props.theme.text.secondary};
`;

const StyledDescription = styled(DialogDescription)`
  ${textStyle.rainier}
  margin: 0;
  color: ${(props) => props.theme.text.primary};
`;

const StyledContent = styled.div<{ $hasPadding?: boolean }>`
  ${({ $hasPadding }) =>
    $hasPadding &&
    css`
      padding: var(--gds-side-panel-padding-size);
    `}
  overflow-y: auto;
`;

const StyledTopWideContainer = styled.div<{ $sticky: boolean }>`
  ${(props) =>
    props.$sticky &&
    css`
      position: sticky;
      top: calc(var(--gds-side-panel-padding-size) * -1);
    `}
  margin-top: calc(var(--gds-side-panel-padding-size) * -1);
  margin-inline-end: calc(var(--gds-side-panel-padding-size) * -1);
  margin-bottom: ${spacing.amphitheatre};
  margin-inline-start: calc(var(--gds-side-panel-padding-size) * -1);
  padding: ${spacing.amphitheatre} var(--gds-side-panel-padding-size);
`;

const StyledFooter = styled.div`
  padding: var(--gds-side-panel-padding-size);
  border-top: 1px solid var(--gds-side-panel-border-color);
`;

const Overlay = styled.div<{ $showOverlay: boolean }>`
  position: fixed;
  inset: 0;
  background-color: ${(props) =>
    props.$showOverlay ? props.theme.base.overlay : "transparent"};

  &[data-enter] {
    opacity: 1;
    transition: opacity 400ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-leave] {
    opacity: 0;
  }
`;

SidePanel.Header = Header;
SidePanel.Title = Title;
SidePanel.Subtitle = Subtitle;
SidePanel.Content = Content;
SidePanel.TopWideContainer = TopWideContainer;
SidePanel.Description = StyledDescription;
SidePanel.Footer = StyledFooter;

export default SidePanel;
