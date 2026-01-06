import React from "react";
import styled from "styled-components";
import { elevation, spacing, textStyle } from "../../dimensions";
import { getGradient } from "../gradients";
import type { Theme } from "../../themes/types";

type Gradient = keyof NonNullable<Theme["gradients"]>;

type Props = {
  color?: string;
  gradient?: Gradient;
  title: string;
  subtitle?: string;
};

export default function Swatch({ color, gradient, title, subtitle }: Props) {
  return (
    <Container bg={color} gradient={gradient}>
      <SwatchInfo>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </SwatchInfo>
    </Container>
  );
}

const Container = styled.div<{ bg?: string; gradient?: Gradient }>`
  ${elevation.level3};
  display: grid;
  align-content: end;
  height: 12rem;
  ${(props) => props.bg && `background-color: ${props.bg}`};
  ${(props) => props.gradient && getGradient(props.gradient, "#fff")}
`;

const SwatchInfo = styled.div`
  padding: ${spacing.club};
  background-color: #fff;
`;

const Title = styled.p`
  ${textStyle.boising};
  margin: 0;
  overflow-wrap: anywhere;
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${(props) => props.theme.text.secondary};
`;
