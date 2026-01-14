import styled from "styled-components";
import { spacing } from "../../dimensions";
import { mainHeader } from "../../colors";

export const Header = styled.header`
  ${mainHeader};

  display: flex;
  align-items: center;
  padding: ${spacing.auditorium};
  color: ${(props) => props.theme.text.inverse};
`;

export const Logo = styled.span`
  flex: 0 0 120px;
`;
