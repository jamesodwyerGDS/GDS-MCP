import React from "react";
import { Unstyled } from "@storybook/addon-docs/blocks";
import styled, { useTheme } from "styled-components";
import type { Theme } from "../../themes/types";
import Swatch from "./Swatch";

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

type Gradient = keyof NonNullable<Theme["gradients"]>;

export const GradientSwatches = () => {
  const theme = useTheme();
  if (!theme.gradients) return null;

  const keys = Object.keys(theme.gradients) as Gradient[];

  return (
    <Unstyled>
      <Row>
        {keys.map((key) => (
          <Swatch
            key={key}
            gradient={key}
            title={`${key} | ${theme.gradients![key].colorStops.join(" · ")}`}
          />
        ))}
      </Row>
    </Unstyled>
  );
};
