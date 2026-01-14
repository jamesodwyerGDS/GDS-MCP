import { css } from "styled-components";
import { linearGradient } from "polished";
import { weakest, muted } from "./modifiers";
import { Theme } from "../themes/types";

type Props = {
  theme: Theme;
};

export const getGradient =
  (key: keyof NonNullable<Theme["gradients"]>, fallback: string) =>
  ({ theme }: Props) => {
    const gradient = theme.gradients?.[key];
    if (!gradient) return `background-color: ${fallback}`;
    return linearGradient(gradient);
  };

const legacyGetGradient =
  (key: keyof NonNullable<Theme["gradients"]>, cssFallback?: string | null) =>
  (angle?: string | null) =>
  ({ theme }: Partial<Props> = {}) => {
    if (!theme?.gradients || !theme?.gradients[key])
      return css`
        background-color: ${cssFallback};
      `;
    const { colorStops, toDirection, fallback } = theme.gradients[key];
    return linearGradient({
      colorStops,
      toDirection: angle || toDirection,
      fallback,
    });
  };

export const oldGreyWhistleTest = ({ theme }: Props) => {
  return css`
    background-image: linear-gradient(
      to bottom,
      ${weakest(theme.base.bgAlt)},
      ${weakest(muted(theme.base.bgInverse))}
    );
  `;
};

export const justLikeAPill =
  (angle?: string) =>
  ({ theme }: Props) =>
    legacyGetGradient("justLikeAPill", theme.base.primary)(angle);

export const mrBlueSky =
  (angle?: string) =>
  ({ theme }: Props) =>
    legacyGetGradient("mrBlueSky", theme.base.primary)(angle);

export const ticketFoil = ({ theme }: Props) =>
  legacyGetGradient("ticketFoil", theme.base.primary)();
