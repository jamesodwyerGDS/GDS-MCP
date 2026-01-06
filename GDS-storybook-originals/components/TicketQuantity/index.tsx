"use client";
import * as React from "react";
import { Wrapper, VisuallyHidden } from "./index.styles";
import TicketIcon from "../../icons/dist/TicketIcon";

type Props = {
  quantity: number;
  icon?: React.ReactNode;
  color?: string;
  a11yLabel: string;
};

const TicketQuantity = ({ quantity, icon, color, a11yLabel }: Props) => (
  <Wrapper color={color}>
    {icon || <TicketIcon />}
    <VisuallyHidden>{a11yLabel}</VisuallyHidden>
    <span aria-hidden="true">{`\u00D7`}</span>
    {quantity}
  </Wrapper>
);

export default TicketQuantity;
