"use client";
import styled, { css } from "styled-components";
import { spacing, textStyle } from "../../dimensions";

const chipWidth = "40px";

type Props = { isCentered?: boolean; isSmall?: boolean };

const isCentered = (props: Props) =>
  props.isCentered
    ? css`
        text-align: center;

        &::before {
          inset-inline-start: 50%;
          margin-inline-start: calc(${chipWidth} / -2);
        }
      `
    : css`
        &::before {
          inset-inline-start: 0;
        }
      `;

const isSmall = ({ isSmall }: Props) =>
  isSmall
    ? css`
        ${textStyle.blanc};
        padding-bottom: ${spacing.lounge};
      `
    : css`
        ${textStyle.vinson};
        padding-bottom: ${spacing.club};
      `;

/** @deprecated in favour of Title Accents */
const SectionHeading = styled.h2<Props>`
  ${isCentered};
  ${isSmall};

  position: relative;
  margin: 0;

  &::before {
    position: absolute;
    bottom: 0;
    display: block;
    width: ${chipWidth};
    border-bottom: 4px solid ${(props) => props.theme.base.secondary};
    content: "";
  }
`;

export default SectionHeading;
