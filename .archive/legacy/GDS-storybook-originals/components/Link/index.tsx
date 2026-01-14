"use client";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { buttonreset } from "../../utils/snippets";
import { dark } from "../../colors/modifiers";

type Variant = "primary" | "inverse";

type OwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
  variant?: Variant;
  children?: ReactNode;
};

type Props<E extends React.ElementType> = OwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof OwnProps>;

const Link = <E extends React.ElementType = "a">({
  variant = "primary",
  children,
  ...rest
}: Props<E>) => {
  return (
    <StyledLink $variant={variant} {...rest}>
      {children}
    </StyledLink>
  );
};

export default Link;

const StyledLink = styled.a<{ $variant: Variant }>`
  /*
  Button reset styles are applied in case this ends up being rendered as a 
  button element via the as prop.
  */
  ${buttonreset};

  color: ${(props) => props.theme._links[props.$variant].color};
  text-decoration: underline;

  /*
  Cursor styles are added in case this ends up being rendered as a different 
  element via the as prop.
  */
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${(props) => dark(props.theme._links[props.$variant].color)};
  }
`;
