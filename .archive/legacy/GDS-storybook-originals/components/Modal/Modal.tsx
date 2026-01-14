"use client";
import React, { ComponentProps, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import {
  Dialog,
  DialogHeading,
  DialogDescription,
  DialogDismiss,
  useDialogStore,
  useStoreState,
} from "@ariakit/react";
import { RemoveScroll } from "react-remove-scroll";
import { elevation, iconSize, spacing, textStyle } from "../../dimensions";
import { CrossIcon, ExclamationMarkDiamondFilledIcon } from "../../icons";
import { WarningFilledIcon } from "../../icons-with-colours";
import { ModalContext, useModalContext } from "./ModalContext";
import { Size, Variant } from "./types";
import SquareButton from "../SquareButton";
import { usePortalElement } from "../../hooks/usePortalElement";

const IconStyle = styled.div`
  width: var(--gds-modal-leading-icon-size);
  height: var(--gds-modal-leading-icon-size);
`;

const icons = {
  warning: <IconStyle as={WarningFilledIcon} />,
  error: <IconStyle as={ExclamationMarkDiamondFilledIcon} fillColor="danger" />,
} as const;

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen?: boolean;
  /**
   * Aria Role, use `alertdialog` for alerts
   *
   * @default `dialog`
   */
  role?: "dialog" | "alertdialog";
  /**
   * String describing the modal that is read out for assistive technology.
   * As this will probably always be the same as the title of the modal, you can reuse the string.
   */
  ariaLabel: string;
  variant?: Variant;
  /**
   *  Modal size for larger screens, not relevant when on mobile viewport
   *
   * @default `standard`
   */
  size?: Size;
  /**
   * Indicates if the modal has a banner image, allowing the Cross button to be displayed in dark theme
   *
   * @default false
   */
  hasImage?: boolean;
  /**
   * Max viewport width for Mobile (inclusive)
   * Renders the Modal always with fluid width
   */
  mobileMaxViewportWidth: string;
};

const Modal = ({
  role = "dialog",
  ariaLabel,
  isOpen = false,
  onClose,
  children,
  variant = "standard",
  size = "md",
  hasImage = false,
  mobileMaxViewportWidth,
}: ModalProps) => {
  const dialogStore = useDialogStore({
    open: isOpen,
    setOpen(open) {
      if (!open) {
        onClose();
      }
    },
  });

  const [modalRef, setModalRef] = useState<HTMLDivElement | null>(null);
  const [hasScroll, setHasScroll] = useState(false);

  const contextValue = useMemo(
    () => ({
      variant,
      hasImage,
      hasScroll,
      setHasScroll,
      size,
      mobileMaxViewportWidth,
    }),
    [variant, hasImage, hasScroll, size, mobileMaxViewportWidth],
  );
  const portalElement = usePortalElement();

  useEffect(() => {
    const tag = modalRef;

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
  }, [setHasScroll, modalRef]);

  const mounted = useStoreState(dialogStore, "mounted");

  if (!mounted) return null;

  return (
    <ModalContext.Provider value={contextValue}>
      <RemoveScroll
        forwardProps
        allowPinchZoom
        enabled={isOpen}
        ref={(ref: HTMLDivElement) => setModalRef(ref)}
      >
        <StyledModal
          store={dialogStore}
          portalElement={portalElement}
          role={role}
          open={isOpen}
          onClose={onClose}
          backdrop={false}
          // The implementation of AriKit for body scroll lock doesn't work for iCCP since it resets window scroll on iOS, temporary use a custom solution until fixed on their side
          preventBodyScroll={false}
          render={(props) => (
            <Overlay $open={isOpen}>
              <div
                {...props}
                // aria-labelledby does not work reliably in Chrome/Firefox w VoiceOver, so we use aria-label instead (GDS-278)
                aria-label={ariaLabel}
                {...(ariaLabel ? { "aria-labelledby": undefined } : {})}
              />
            </Overlay>
          )}
          aria-modal="true"
          $size={size}
          $hasScroll={hasScroll}
          $mobileMaxViewportWidth={mobileMaxViewportWidth}
        >
          {children}
        </StyledModal>
      </RemoveScroll>
    </ModalContext.Provider>
  );
};

const Header = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { hasScroll } = useModalContext();

  return (
    <StyledHeader $hasScroll={hasScroll} className={className}>
      <LeadingIcon />
      {children}
    </StyledHeader>
  );
};

const LeadingIcon = () => {
  const { variant } = useModalContext();

  if (variant === "standard") {
    return null;
  }

  return icons[variant];
};

const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { variant } = useModalContext();

  return (
    <StyledTitle className={className} $hasRightOffset={variant === "standard"}>
      {children}
    </StyledTitle>
  );
};

const CloseButton = ({
  label,
  disabled = false,
}: {
  label: string;
  disabled?: boolean;
}) => {
  const { hasImage } = useModalContext();

  return (
    <CloseButtonWrapper>
      <DialogDismiss
        render={({ ref: _, ...props }) => {
          return (
            <StyledIconButton
              {...props}
              variant={hasImage ? "primary" : "ghost"}
              label={label}
              icon={<CrossIcon size="1em" />}
              $dark={hasImage}
              disabled={disabled}
            />
          );
        }}
      />
    </CloseButtonWrapper>
  );
};

const Content = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { hasScroll } = useModalContext();

  return (
    <StyledContent
      className={className}
      $hasScroll={hasScroll}
      tabIndex={hasScroll ? 0 : -1}
    >
      {children}
    </StyledContent>
  );
};

const Image = (props: ComponentProps<typeof StyledImage>) => {
  return <StyledImage {...props} />;
};

const Actions = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { hasScroll, mobileMaxViewportWidth } = useModalContext();

  return (
    <StyledActions
      $hasScroll={hasScroll}
      $mobileMaxViewportWidth={mobileMaxViewportWidth}
      className={className}
    >
      {children}
    </StyledActions>
  );
};

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  display: ${(props) => (props.$open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: ${spacing.amphitheatre} 0;
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.base.overlay};
  transition: opacity 400ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const StyledModal = styled(Dialog)<{
  $hasScroll: boolean;
  $size: Size;
  $mobileMaxViewportWidth: string;
}>`
  --gds-modal-bg-color: ${(props) => props.theme.colors.base.bg};
  --gds-modal-scroll-border-color: ${(props) => props.theme.base.borderMidtone};
  --gds-modal-padding-size: ${spacing.amphitheatre};
  --gds-modal-gap: ${spacing.auditorium};
  --gds-modal-leading-icon-size: 1.5em;
  ${elevation.level4};
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-height: 100%;
  overflow: auto;
  background-color: var(--gds-modal-bg-color);
  animation: 150ms cubic-bezier(0.16, 1, 0.3, 1) 0s 1 normal none running
    modalAnimation;

  ${(props) =>
    `@media not all and (max-width: ${props.$mobileMaxViewportWidth})`} {
    --gds-modal-padding-size: ${spacing.arena};
    --gds-modal-leading-icon-size: 2em;

    width: ${(props) => {
      if (props.$size === "sm") {
        return "400px";
      }
      if (props.$size === "md") {
        return "600px";
      }
      // large
      return "740px";
    }};
  }

  @keyframes modalAnimation {
    0% {
      transform: translateY(2%) scale(0.96);
      opacity: 0;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
`;

const StyledHeader = styled.header<{ $hasScroll: boolean }>`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.club};
  padding: var(--gds-modal-padding-size) var(--gds-modal-padding-size)
    ${spacing.auditorium};
  background-color: var(--gds-modal-bg-color);

  ${(props) =>
    props.$hasScroll &&
    css`
      border-bottom: 1px solid var(--gds-modal-scroll-border-color);
    `}
`;

const StyledTitle = styled(DialogHeading)<{ $hasRightOffset: boolean }>`
  ${textStyle.matterhorn}
  margin: 0;
  ${(props) =>
    props.$hasRightOffset &&
    css`
      padding-inline-end: calc(${iconSize.total} + ${spacing.auditorium});
    `}
`;

const StyledDescription = styled(DialogDescription)`
  ${textStyle.rainier}
  margin: 0;
  color: ${(props) => props.theme.text.primary};
`;

const StyledContent = styled.div<{ $hasScroll: boolean }>`
  padding: ${(props) => (props.$hasScroll ? spacing.auditorium : 0)}
    var(--gds-modal-padding-size) ${spacing.auditorium};
  background-color: var(--gds-modal-bg-color);
`;

const StyledImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-top: 0;
  margin-inline-start: 0;
  object-fit: cover;
`;

const CloseButtonWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;
const StyledIconButton = styled(SquareButton)<{ $dark: boolean }>`
  --gds-modal-icon-size: 32px;
  position: absolute;
  top: var(--gds-modal-padding-size);
  inset-inline-end: var(--gds-modal-padding-size);
  width: var(--gds-modal-icon-size);
  height: var(--gds-modal-icon-size);

  ${(props) =>
    props.$dark &&
    css`
      background-color: ${(props) => props.theme.base.bgInverse};
    `}

  /* 
    *   Increase clickable area for accessibility to 44px (iconSize.total) because the icon size in the design is 32px
    *   Calculate the difference (44px - 32px = 12px), divide by 2 for each side (6px),
    *   and apply it inward with a negative inset. 
    */
  &::after {
    position: absolute;
    inset: calc((${iconSize.total} - var(--gds-modal-icon-size)) / 2 * -1);
    width: ${iconSize.total};
    height: ${iconSize.total};
    content: "";
  }
`;

const StyledActions = styled.div<{
  $hasScroll: boolean;
  $mobileMaxViewportWidth: string;
}>`
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.club};
  justify-content: flex-end;
  padding: ${spacing.auditorium} var(--gds-modal-padding-size)
    var(--gds-modal-padding-size);
  background-color: var(--gds-modal-bg-color);

  ${(props) =>
    props.$hasScroll &&
    css`
      border-top: 1px solid var(--gds-modal-scroll-border-color);
    `}

  ${(props) =>
    `@media not all and (max-width: ${props.$mobileMaxViewportWidth})`} {
    flex-direction: row-reverse;
    gap: ${spacing.auditorium};
    justify-content: flex-start;
  }
`;

Modal.Header = Header;
Modal.Title = Title;
Modal.Content = Content;
Modal.Description = StyledDescription;
Modal.Image = Image;
Modal.CloseButton = CloseButton;
Modal.Actions = Actions;

export default Modal;
