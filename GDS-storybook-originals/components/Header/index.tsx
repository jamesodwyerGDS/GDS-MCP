"use client";
import * as React from "react";
import { Header as StyledHeader, Logo } from "./index.styles";

export type Props = { children?: React.ReactNode; logo: React.ReactNode };

const Header = ({ logo, children }: Props): JSX.Element => (
  <StyledHeader>
    <Logo>{logo}</Logo>
    {children}
  </StyledHeader>
);

export default Header;
