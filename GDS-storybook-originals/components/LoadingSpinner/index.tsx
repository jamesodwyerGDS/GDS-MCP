"use client";
import * as React from "react";
import styled from "styled-components";
import { spacing, textStyle } from "../../dimensions";
import { Spinner, Size, ColorVariant } from "../shared/Spinner";

type Props = {
  message?: string;
  size?: Size;
  colorVariant?: ColorVariant;
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

const LoadingSpinner = ({
  message,
  size = "small",
  colorVariant = "primary",
  className,
  ...rest
}: Props) => {
  return (
    <Container className={className} {...rest}>
      <Spinner size={size} colorVariant={colorVariant} />
      {message && <Message $colorVariant={colorVariant}>{message}</Message>}
    </Container>
  );
};

export default LoadingSpinner;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Message = styled.p<{ $colorVariant: ColorVariant }>`
  ${textStyle.boising};
  margin: ${spacing.auditorium} 0 0;
  color: ${(props) =>
    props.$colorVariant === "inverse"
      ? props.theme.text.inverse
      : props.theme.text.primary};
`;
