import styled, { css } from "styled-components";
import { spacing, iconSize } from "../../dimensions";
import { buttonreset, visuallyhidden } from "../../utils/snippets";
import {
  InfoICircledFilledIcon as InfoICircledFilledBase,
  ExclamationMarkCircledFilledIcon as ExclamationMarkCircledFilledBase,
  CheckmarkCircledFilledIcon as CheckmarkCircledFilledBase,
} from "../../icons";

const itemBorderRadius = "4px";

export const Item = styled.div`
  flex-shrink: 0;

  width: 100%;
  overflow: hidden;
`;

const variants = {
  info: css`
    color: ${(props) => props.theme.text.inverse};
    background-color: ${(props) => props.theme.status.default};
  `,
  success: css`
    color: ${(props) => props.theme.text.inverse};
    background-color: ${(props) => props.theme.status.success};
  `,
  warning: css`
    color: ${(props) => props.theme.text.primary};
    background-color: ${(props) => props.theme.status.warning};
  `,
  danger: css`
    color: ${(props) => props.theme.text.inverse};
    background-color: ${(props) => props.theme.status.danger};
  `,
};

const alertType = ({ $variant }: { $variant: keyof typeof variants }) =>
  variants[$variant];

const titleWrapperRadius = ({ $isTitleOnly }: { $isTitleOnly?: boolean }) =>
  $isTitleOnly
    ? css`
        border-radius: ${itemBorderRadius};
      `
    : css`
        border-radius: ${itemBorderRadius} ${itemBorderRadius} 0 0;
      `;

export const TitleWrapper = styled.div<{
  $variant: keyof typeof variants;
  $size: keyof typeof spacing;
  $isTitleOnly?: boolean;
}>`
  ${titleWrapperRadius};
  ${alertType};

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${({ $size }) => spacing[$size]} ${spacing.auditorium};
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const iconStyles = css`
  align-self: flex-start;
  margin-inline-end: ${iconSize.margin};
`;

export const InfoICircledFilled = styled(InfoICircledFilledBase)`
  ${iconStyles};
`;

export const ExclamationMarkCircledFilled = styled(
  ExclamationMarkCircledFilledBase,
)`
  ${iconStyles};
`;

export const CheckmarkCircledFilled = styled(CheckmarkCircledFilledBase)`
  ${iconStyles};
`;

export const DismissButton = styled.button`
  ${buttonreset};
`;

export const DismissA11yLabel = styled.span`
  ${visuallyhidden};
`;

export const Message = styled.div<{ $size: keyof typeof spacing }>`
  /* top and bottom padding adjustable with size prop, left padding to align message text with AlertBox title */
  padding-top: ${({ $size }) => spacing[$size]};
  padding-inline-end: ${spacing.auditorium};
  padding-bottom: ${({ $size }) => spacing[$size]};
  padding-inline-start: calc(
    ${iconSize.viewBox} + ${iconSize.margin} + ${spacing.auditorium}
  );

  border-color: ${(props) => props.theme.base.border};
  border-style: solid;
  border-width: 0 1px 1px;
  border-radius: 0 0 ${itemBorderRadius} ${itemBorderRadius};
  text-align: start;
  background-color: ${(props) => props.theme.base.bg};
  /*
  Direct descendant selector needed for some reason. Without it, we seem to 
  remove the space, resulting in the styles being applied to 
  .MessageClassName:first-child / .MessageClassName:last-child. Weird. 
  Can't reproduce with a standard styled-components build either: 
  https://codesandbox.io/embed/styled-components-53s90
  */
  & > :first-child {
    margin-top: 0;
  }

  & > :last-child {
    margin-bottom: 0;
  }
`;
