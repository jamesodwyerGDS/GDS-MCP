import React from "react";
import { useTheme } from "styled-components";

type BrandLogoProps = {
  /**
   * Color for logo, defaults to white
   *
   * @default '#FFFFFF'
   */
  color?: string;
  className?: string;
};

const BrandLogo = ({ color, className }: BrandLogoProps) => {
  const { logoSvg, colors } = useTheme();

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill={color ?? colors.text.inverse}
      width="100%"
      height="100%"
      viewBox={logoSvg.viewBox}
      dangerouslySetInnerHTML={{ __html: logoSvg.pathData }}
      aria-hidden="true"
    />
  );
};

export default BrandLogo;
