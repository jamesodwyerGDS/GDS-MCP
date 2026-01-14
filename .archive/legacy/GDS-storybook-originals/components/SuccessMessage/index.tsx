"use client";
import * as React from "react";
import styled from "styled-components";
import { spacing, textStyle } from "../../dimensions";
import SuccessIcon from "../../icons/dist/CheckmarkCircledFilledIcon";

type Props = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
};
const SuccessMessage = ({ children, className, ...rest }: Props) => {
  if (!children) return null;

  return (
    <Container className={className} {...rest}>
      <SuccessIcon size="1.2em" />
      <Text>{children}</Text>
    </Container>
  );
};

export default SuccessMessage;

const Container = styled.div`
  ${textStyle.etna};
  display: flex;
  margin-top: ${spacing.club};
  color: ${(props) => props.theme.status.success};
`;

const Text = styled.p`
  margin: 0;
  margin-inline-start: ${spacing.lounge};
  color: ${(props) => props.theme.text.primary};
  vertical-align: middle;
`;
