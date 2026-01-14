"use client";
import React, { ComponentPropsWithoutRef } from "react";
import styled, { css } from "styled-components";
import { spacing, iconSize, textStyle, elevation } from "../../dimensions";
import {
  CheckmarkCircledFilledIcon,
  ExclamationMarkDiamondFilledIcon,
  InfoICircledFilledIcon,
} from "../../icons";
import { WarningFilledIcon } from "../../icons-with-colours";

type Variant = "info" | "success" | "warning" | "danger" | "error";

// We use aria roles to ensure screen readers timely announce the messages as they appear
// The `role` attribute should be used only for content that has changed, or to bring the user's attention to it immediately. Check the Accessibility section in the docs for more details.
type AriaRole = "status" | "alert" | "log";

export type Props = {
  title: React.ReactNode;
  variant?: Variant;
  nested?: boolean;
  children?: React.ReactNode;
  ariaLabelledById?: string;
  ariaDescribedById?: string;
  role?: AriaRole;
} & Omit<ComponentPropsWithoutRef<"div">, "role" | "title">;

const icons = {
  info: <InfoICircledFilledIcon fillColor="info" />,
  success: <CheckmarkCircledFilledIcon fillColor="success" />,
  warning: <WarningFilledIcon size="1.5em" />,
  danger: <ExclamationMarkDiamondFilledIcon fillColor="danger" />,
  error: <ExclamationMarkDiamondFilledIcon fillColor="danger" />,
};

const AlertBox = ({
  title,
  variant = "info",
  nested = false,
  children,
  ariaLabelledById,
  ariaDescribedById,
  role,
  ...rest
}: Props) => {
  return (
    <Box $variant={variant} $nested={nested} role={role} {...rest}>
      <TitleWrapper>
        {icons[variant]}
        <Title id={ariaLabelledById} $nested={nested}>
          {title}
        </Title>
      </TitleWrapper>
      {!nested && children && (
        <ChildContainer id={ariaDescribedById}>{children}</ChildContainer>
      )}
    </Box>
  );
};

export default AlertBox;

const maxTextWidth = "90ch";

const Box = styled.div<{ $variant: Variant; $nested: boolean }>`
  --alert-border-color: ${({ $variant, theme }) =>
    $variant === "error" ? theme.status.danger : theme.status[$variant]};

  padding: ${spacing.auditorium};
  background-color: ${(props) => props.theme.base.bg};

  ${({ $nested }) => {
    if ($nested) {
      return css`
        border: 1px solid var(--alert-border-color);
        border-radius: 4px;
      `;
    }

    return css`
      ${elevation.level1};
      border-top: 8px solid var(--alert-border-color);
    `;
  }}
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: ${spacing.auditorium};
`;

const Title = styled.div<{ $nested: boolean }>`
  align-self: center;
  max-width: ${maxTextWidth};

  ${({ $nested }) => ($nested ? textStyle.rainier : textStyle.boising)}
`;

const ChildContainer = styled.div`
  max-width: ${maxTextWidth};
  margin-top: ${spacing.hall};
  /* padding to line child text up with title text */
  padding-inline-start: calc(${iconSize.viewBox} + ${spacing.auditorium});

  /* Remove margin from the children to prevent spacing doubling up with container padding */
  & > :first-child {
    margin-top: 0;
  }

  & > :last-child {
    margin-bottom: 0;
  }
`;
