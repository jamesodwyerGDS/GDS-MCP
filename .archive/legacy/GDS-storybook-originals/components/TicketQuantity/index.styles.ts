import styled from "styled-components";
import { hideVisually } from "polished";

export const Wrapper = styled.span<{ color?: string }>`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.theme.text[props.color as keyof typeof props.theme.text] ||
    props.color ||
    props.theme.text.secondary};
`;

export const VisuallyHidden = styled.span`
  ${hideVisually};
`;
