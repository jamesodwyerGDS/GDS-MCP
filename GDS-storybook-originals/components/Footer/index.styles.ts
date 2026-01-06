import styled from "styled-components";
import { spacing } from "../../dimensions";

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  padding: ${spacing.auditorium};
  color: ${(props) => props.theme._footer.color};
  background-color: ${(props) => props.theme._footer.backgroundColor};
`;
