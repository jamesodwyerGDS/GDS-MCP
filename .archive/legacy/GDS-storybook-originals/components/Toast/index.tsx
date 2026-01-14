"use client";
import React, { ComponentPropsWithoutRef } from "react";
import styled, { css } from "styled-components";
import { spacing } from "../../dimensions";
import {
  CheckmarkCircledFilledIcon,
  CrossIcon,
  ExclamationMarkDiamondFilledIcon,
  InfoICircledFilledIcon,
} from "../../icons";
import SquareButton from "../SquareButton";
import { WarningFilledIcon } from "../../icons-with-colours";
import { light } from "../../colors/modifiers";

type Variant = "info" | "success" | "warning" | "error";

// We use aria roles to ensure screen readers timely announce the messages as they appear
// The `role` attribute should be used only for content that has changed, or to bring the user's attention to it immediately. Check the Accessibility section in the docs for more details.
type AriaRole = "status" | "alert" | "log";

export type Props = {
  message: string;
  variant?: Variant;
  role: AriaRole;
  dismissable: {
    onDismiss: () => void;
    dismissLabel: string;
    dismissRef?: React.Ref<HTMLButtonElement>;
  };
} & Omit<ComponentPropsWithoutRef<"div">, "role">;

const icons = {
  // TODO: update info to new color from the extended color palette when GDS 2.0 DS is completed
  info: <InfoICircledFilledIcon fillColor={light("#024ddf")} />, // palette.neptune
  success: <CheckmarkCircledFilledIcon fillColor="success" />,
  warning: <WarningFilledIcon size="1.5em" />,
  error: <ExclamationMarkDiamondFilledIcon fillColor="danger" />,
};

const Toast = ({
  message,
  variant,
  dismissable: { onDismiss, dismissLabel, dismissRef },
  role,
  ...rest
}: Props) => {
  return (
    <Box {...rest}>
      <MessageWrapper>
        {variant && <IconWrapper>{icons[variant]}</IconWrapper>}
        <Message role={role}>{message}</Message>
      </MessageWrapper>
      <DismissButton
        onClick={onDismiss}
        ref={dismissRef}
        variant="inverse"
        label={dismissLabel}
        icon={<CrossIcon fillColor="selected" size="1.3em" />}
      />
    </Box>
  );
};

export default Toast;

const gap = css`
  ${spacing.hall}
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 336px;
  /* Instead of adding padding at the bottom, we add margin bottom to the span Message.
     This ensures the correct spacing for short and long messages.
  */
  padding-top: ${spacing.auditorium};
  padding-inline-end: ${spacing.auditorium};
  padding-inline-start: ${spacing.auditorium};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.base.bgInverse};
`;

const MessageWrapper = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  margin-inline-end: ${gap};
`;

const Message = styled.span`
  margin-inline-end: ${gap};
  margin-bottom: ${spacing.hall};
  color: ${({ theme }) => theme.text.inverse};
  line-height: 1.5;
`;

export const DismissButton = styled(SquareButton)`
  margin-top: calc(${spacing.theatre} / -2);
  margin-inline-end: calc(${spacing.hall} * -1);
  margin-bottom: ${spacing.lounge};
  padding-inline-end: ${gap};
  padding-inline-start: ${gap};
  border: none; /* Remove the border coming from inverse styling */
`;
