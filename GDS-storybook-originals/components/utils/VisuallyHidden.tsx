"use client";
import styled from "styled-components";
import { hideVisually } from "polished";

const VisuallyHidden = styled.span`
  ${hideVisually};
`;

export default VisuallyHidden;
