import styled from "styled-components";
import { spacing, textStyle, elevation } from "../../dimensions";

export const Card = styled.div`
  ${elevation.level1};
  padding: ${spacing.arena} ${spacing.amphitheatre};
  border-radius: 4px;
  background-color: ${(props) => props.theme.base.bg};
`;

export const Title = styled.h2`
  ${textStyle.fiji};
  margin: 0;
  line-height: 1;
`;

export const Body = styled.div`
  margin-top: ${spacing.arena};
`;
