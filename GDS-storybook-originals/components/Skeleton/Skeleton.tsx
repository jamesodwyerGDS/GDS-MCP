import React from "react";
import styled, { keyframes } from "styled-components";

type Props = {
  width?: string;
  height?: string;
  className?: string;
};

const Skeleton = ({ width = "100%", height = "25px", ...props }: Props) => {
  return <Shimmer $width={width} $height={height} {...props} />;
};

const shimmer = (color1: string, color2: string) => keyframes`
  0%, 100% {
    background-color: ${color1};
  }
  50% {
    background-color: ${color2}; 
  }
`;

const Shimmer = styled.div<{
  $width: string;
  $height: string;
}>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};

  /* static background colour for when user prefers reduced motion */
  background-color: ${(props) => props.theme.base.bgAlt};

  animation: 2s 900ms ease-in-out infinite
    ${({ theme }) => shimmer(theme.base.bgAlt, theme.base.borderLight)};
`;

export default Skeleton;
