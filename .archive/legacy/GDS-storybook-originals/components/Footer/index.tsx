"use client";
import * as React from "react";
import { Footer as StyledFooter } from "./index.styles";

type Props = { children?: React.ReactNode; className?: string };

const Footer = ({ children, className }: Props) => (
  <StyledFooter className={className}>{children}</StyledFooter>
);

export default Footer;
