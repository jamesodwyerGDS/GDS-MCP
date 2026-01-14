"use client";
import * as React from "react";
import styled from "styled-components";
import { spacing, textStyle } from "../../dimensions";
import ErrorIcon from "../../icons/dist/ExclamationMarkDiamondFilledIcon";
import VisuallyHidden from "../utils/VisuallyHidden";

type Props = {
  children?: React.ReactNode;
  /** Visually hidden prefix announced to screen readers before the error message (e.g., "Error: "). */
  screenReaderErrorPrefix: string;
  className?: string;
  id?: string;
};

const ErrorMessage = ({
  children,
  screenReaderErrorPrefix,
  className,
  ...rest
}: Props) => {
  if (!children) return null;

  const whiteSpace = " ";

  return (
    <Container className={className} {...rest}>
      <ErrorIcon size="1.2em" />
      <VisuallyHidden>
        {`${screenReaderErrorPrefix}${whiteSpace}`}
      </VisuallyHidden>
      <ErrorText>{children}</ErrorText>
    </Container>
  );
};

export default ErrorMessage;

const Container = styled.div`
  ${textStyle.etna};
  display: flex;
  margin-top: ${spacing.club};
  color: ${(props) => props.theme.status.danger};
`;

const ErrorText = styled.p`
  margin: 0;
  margin-inline-start: ${spacing.lounge};
  color: ${(props) => props.theme.text.primary};
  vertical-align: middle;
  overflow-wrap: anywhere;
`;
