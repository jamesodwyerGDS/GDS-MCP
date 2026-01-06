import styled, { css } from "styled-components";
import { inputReset } from "../../utils/snippets";
import { browserDefaultFocus } from "../../utils/focus";
import { Theme } from "../../themes/types";
import { spacing } from "../../dimensions";

type ThemeProps = { theme: Theme };

const thumbStyles = ({ theme }: ThemeProps) => css`
  width: ${spacing.amphitheatre};
  height: ${spacing.amphitheatre};
  border: 1px solid ${theme.base.bgInverse};
  border-radius: 50%;
  background-color: ${theme.base.bg};
  cursor: pointer;

  @media (forced-colors: active) {
    width: auto;
    height: auto;
    border: initial;
    border-radius: initial;
    background-color: initial;
    box-shadow: initial;
    cursor: initial;
  }
`;

const thumbDisabled = ({ theme }: ThemeProps) => css`
  border: 1px solid ${theme.base.border};
  background-color: ${theme.base.borderLight};
  cursor: not-allowed;
`;

const thumbFocus = () => css`
  ${browserDefaultFocus};
`;

const trackStyles = ({ theme }: ThemeProps) => css`
  height: ${spacing.lounge};
  border-radius: 2px;
  background-color: ${theme.base.borderDark};

  @media (forced-colors: active) {
    height: auto;
    background-color: initial;
  }
`;

const thumbFocusStyles = css`
  &::-webkit-slider-thumb {
    ${thumbFocus};
  }
  &::-moz-range-thumb {
    ${thumbFocus};
  }
  &::after {
    position: absolute;
    inset: -16px;
    content: "";
  }
`;

export const Range = styled.input`
  ${inputReset};

  width: 100%;
  height: 100%;
  padding: ${spacing.hall} 0;
  background-color: transparent;
  outline: none;
  appearance: none;

  &::-moz-focus-outer {
    border: 0;
  }

  &::-webkit-slider-thumb {
    ${thumbStyles};

    transform: translateY(calc(-50% + 3px)); /* Centre vertically in Chrome */
    appearance: none; /* Chrome doesn't apply any styles without this */
  }

  &::-moz-range-thumb {
    ${thumbStyles};
  }

  &::-webkit-slider-runnable-track {
    ${trackStyles};
  }

  &::-moz-range-track {
    ${trackStyles};

    border-color: transparent; /* needed to switch FF to "styleable" control */
  }

  &::-moz-range-progress {
    ${trackStyles};
  }

  &:disabled {
    cursor: not-allowed;

    &::-webkit-slider-thumb {
      ${thumbDisabled};
    }
    &::-moz-range-thumb {
      ${thumbDisabled};
    }
  }

  &:not(:disabled):active {
    &::-webkit-slider-thumb {
      background-color: ${({ theme }) => theme.base.bgInverse};
    }
    &::-moz-range-thumb {
      background-color: ${({ theme }) => theme.base.bgInverse};
    }
  }

  &:not(:disabled):focus-visible {
    ${thumbFocusStyles};
  }

  @supports not selector(:focus-visible) {
    &:not(:disabled):focus {
      ${thumbFocusStyles};
    }
  }

  &:not(:disabled):hover {
    &::-webkit-slider-thumb {
      border-width: 2px;
    }
    &::-moz-range-thumb {
      border-width: 2px;
    }
  }

  @media (forced-colors: active) {
    height: auto;
    background-color: initial;
    outline: initial;
    appearance: auto;

    &::-moz-focus-outer {
      border: initial;
    }

    &::-webkit-slider-thumb {
      transform: none;
      appearance: auto;
    }

    &::-moz-range-track {
      border-color: initial;
    }
  }
`;
