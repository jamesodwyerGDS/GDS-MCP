import styled from "styled-components";
import { ComboboxItem, ComboboxList, ComboboxPopover } from "@ariakit/react";
import { elevation, minTapSize, spacing } from "../../dimensions";
import InputField from "../InputField";
import { browserDefaultFocus } from "../../utils/focus";
import { ChevronIcon } from "../../icons";
import IconButton from "../utils/IconButton";

export const Row = styled(InputField.Row)<{ width: string }>`
  width: ${(props) => props.width};
`;

export const FlagWrapper = styled.div`
  position: absolute;
  top: 0.9em;
  z-index: 1;
  height: 1em;
  padding-inline-start: ${spacing.auditorium};
`;

export const CountryNameInput = styled(InputField.Input)<{
  showFlags?: boolean;
  selected?: boolean;
  autocomplete?: boolean;
}>`
  position: ${(props) =>
    props.showFlags && props.selected ? "relative" : "initial"};
  padding-inline-end: ${minTapSize};
  text-indent: ${(props) =>
    props.showFlags && props.selected ? "1.5em" : "initial"};
  caret-color: ${(props) => (props.autocomplete ? "inherit" : "transparent")};
`;

export const Popover = styled(ComboboxPopover)<{ $translateX?: string }>`
  ${elevation.level3};
  margin: ${spacing.lounge} 0 0;
  border: 1px solid ${(props) => props.theme.base.borderDark};
  border-radius: 2px;
  background-color: ${(props) => props.theme.base.bg};
  opacity: 0;
  transition: all 200ms cubic-bezier(0.3, 0, 0.2, 1);

  &[data-enter] {
    transform: translateY(0)
      translateX(${(props) => props.$translateX || "0px"});
    opacity: 1;
  }
`;

export const PopupCountriesList = styled(ComboboxList)`
  max-height: min(var(--popover-available-height, 300px), 300px);
  padding: ${spacing.club};
  overflow-y: auto;
`;

export const StyledSelectItem = styled(ComboboxItem)`
  display: flex;
  gap: ${spacing.club};
  align-items: center;
  justify-content: flex-start;
  padding: ${spacing.club} ${spacing.club};
  border-radius: 0;
  user-select: none;

  &:not([aria-selected="true"]):hover {
    color: ${(props) => props.theme.text.inverse};
    background-color: ${(props) => props.theme.base.primary};
  }

  &:focus-visible,
  &[data-active-item="true"] {
    ${browserDefaultFocus}
  }
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 0;
  inset-inline-end: 0;

  &:disabled {
    background-color: ${(props) => props.theme.colors.base.borderMidtone};
  }

  &:focus-visible {
    ${browserDefaultFocus}
  }

  &[aria-expanded="true"] > svg {
    transform: rotate(-180deg);
  }
`;

export const ChevronIconWrapper = styled.div`
  position: absolute;
  top: 0;
  inset-inline-end: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${minTapSize};
  height: ${minTapSize};
  pointer-events: none;
`;

export const StyledChevronIcon = styled(ChevronIcon)`
  ${CountryNameInput}[aria-expanded="true"] + ${ChevronIconWrapper} & {
    transform: rotate(-180deg);
  }
`;
