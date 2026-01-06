"use client";
import React, { ComponentPropsWithoutRef } from "react";
import {
  Item,
  TitleWrapper,
  InfoICircledFilled,
  Title,
  DismissButton,
  DismissA11yLabel,
  ExclamationMarkCircledFilled,
  CheckmarkCircledFilled,
  Message,
} from "./index.styles";
import { CrossIcon } from "../../icons";

type Props = {
  variant?: "info" | "success" | "warning" | "danger";
  size?: "moderate" | "normal";
  title: React.ReactNode;
  children?: React.ReactNode;
  dismissable?: {
    onDismiss: () => void;
    dismissLabel: string;
    dismissRef?: React.Ref<HTMLButtonElement>;
  };
  ariaLabelledById?: string;
  ariaDescribedById?: string;
} & ComponentPropsWithoutRef<"div">;

const icons = {
  info: <InfoICircledFilled />,
  success: <CheckmarkCircledFilled />,
  warning: <ExclamationMarkCircledFilled />,
  danger: <ExclamationMarkCircledFilled />,
};

/** @deprecated in favour of AlertBox */
const AlertBoxLegacy = ({
  variant = "info",
  size = "normal",
  title,
  children,
  // @ts-expect-error TODO: Fix this
  dismissable: { onDismiss, dismissLabel, dismissRef } = {},
  // avoids accessing properties on undefined optional prop
  ariaLabelledById,
  ariaDescribedById,
  ...rest
}: Props) => (
  <Item {...rest}>
    <TitleWrapper $variant={variant} $size={size} $isTitleOnly={!children}>
      <Title id={ariaLabelledById}>
        {icons[variant]} {title}
      </Title>
      {onDismiss ? (
        <DismissButton onClick={onDismiss} ref={dismissRef}>
          <CrossIcon />
          <DismissA11yLabel>{dismissLabel}</DismissA11yLabel>
        </DismissButton>
      ) : null}
    </TitleWrapper>
    {children && (
      <Message $size={size} id={ariaDescribedById}>
        {children}
      </Message>
    )}
  </Item>
);

export default AlertBoxLegacy;
