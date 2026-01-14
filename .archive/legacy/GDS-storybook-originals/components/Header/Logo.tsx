import React from "react";
import styled from "styled-components";
import { Theme } from "../../themes/types";

type ThemeProps = { theme: Theme };

const logoBgImage = ({
  theme: {
    logoSvg: { viewBox, pathData },
  },
}: ThemeProps) =>
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}' fill='#fff'>${pathData}</svg>`,
  );

const logoHeight = 30;
const logoWidth =
  (intendedHeight: number) =>
  ({
    theme: {
      logoSvg: { width, height },
    },
  }: ThemeProps) => {
    const aspectRatio = height / width;
    return intendedHeight / aspectRatio;
  };

const LogoSvg = styled.div`
  width: ${logoWidth(logoHeight)}px;
  height: ${logoHeight}px;
  background-image: url("data:image/svg+xml,${logoBgImage}");
  background-repeat: no-repeat;
`;

const Logo = () => <LogoSvg />;

export default Logo;
