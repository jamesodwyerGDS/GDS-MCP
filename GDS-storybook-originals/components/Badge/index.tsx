"use client";
import React, { ComponentPropsWithoutRef } from "react";
import styled, { css } from "styled-components";
import { spacing, textStyle } from "../../dimensions";
import { Base, Status, BBadge, TText } from "../../themes/types";

export type Props = ComponentPropsWithoutRef<"div"> & {
  icon?: React.ReactNode;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
};

const Badge = ({
  children,
  icon,
  textColor,
  borderColor,
  backgroundColor,
  ...rest
}: Props) => {
  return (
    <LabelWrapper
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      {...rest}
    >
      {icon}
      <Label $textColor={textColor}>{children}</Label>
    </LabelWrapper>
  );
};

export default Badge;

const borderWidth = 1;

const LabelWrapper = styled.div<{
  $borderColor?: string;
  $backgroundColor?: string;
}>`
  display: inline-flex;
  gap: ${spacing.lounge};
  align-items: center;

  /* element height must be 22px as per design */
  padding-top: 1px;
  padding-bottom: 1px;

  font-size: 8px; /* The default size the icon renders is 1.5em, in this case returning us 12px as per design */

  /* Add horizontal padding for bordered or filled, not for text only badges */
  ${({ $backgroundColor, $borderColor }) =>
    ($backgroundColor || $borderColor) &&
    css`
      padding-inline-end: ${spacing.club};
      padding-inline-start: ${spacing.club};
    `}

  /* Border Styling */
  ${({ $borderColor, theme }) =>
    $borderColor &&
    css`
      /* element height must be 22px (including border) as per design */
      padding-top: 0;
      padding-bottom: 0;

      border-color: ${theme.base[$borderColor as keyof Base] ||
      theme.status[$borderColor as keyof Status] ||
      $borderColor};
      border-style: solid;
      border-width: ${borderWidth}px;
      border-radius: ${theme.space.lounge}px;
    `}

  /* Background Styling */
  ${({ $backgroundColor, theme }) =>
    $backgroundColor &&
    css`
      border-radius: 4px;
      background-color: ${theme.base[$backgroundColor as keyof Base] ||
      theme.badge[$backgroundColor as keyof BBadge] ||
      theme.status[$backgroundColor as keyof Status] ||
      $backgroundColor};
    `}
`;

const Label = styled.span<{
  $textColor?: string;
}>`
  ${textStyle.snowdon}

  /* Text Color Styling */
  ${({ $textColor, theme }) =>
    $textColor &&
    css`
      color: ${theme.text[$textColor as keyof TText] ||
      theme.status[$textColor as keyof Status] ||
      $textColor};
    `}
`;
