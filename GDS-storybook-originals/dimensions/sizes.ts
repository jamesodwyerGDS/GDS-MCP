import { addPx } from "./utils";

export const _minTapSize_ = 44;
export const minTapSize = addPx(_minTapSize_);

const iSize = {
  viewBox: 24,
  margin: 10,
  padding: 3,
} as const;

const _iconSize_ = {
  ...iSize,
  // We use a type assertion here to get the exact number value in the type
  total: (iSize.viewBox + iSize.margin * 2) as 44,
} as const;

const iconSize = addPx(_iconSize_);
export { _iconSize_, iconSize };
