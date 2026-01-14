import { addPx } from "./utils";

function mediaTemplates<T extends Record<string, `${number}px`>>(
  breakpoints: T,
) {
  return Object.fromEntries(
    Object.entries(breakpoints).map(([key, value]) => [
      key,
      `min-width: ${value}`,
    ]),
  ) as { [K in keyof T]: `min-width: ${T[K]}` };
}

const _breakpoints_ = {
  small: 512,
  medium: 1024,
  large: 1680,
} as const;

export const breakpoints = addPx(_breakpoints_);

export const media = mediaTemplates(breakpoints);
