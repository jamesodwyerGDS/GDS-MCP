import styled from "styled-components";
import { textStyle, spacing } from "../../dimensions";
import { browserDefaultFocus } from "../../utils/focus";
import { inputReset } from "../../utils/snippets";
import InputField from "../InputField";

/* Edit me to add/remove columns  */
const COLS = [4.5, 1, 5, 1, 6];
/* e.g. 5ch 1ch 5ch 1ch 6ch */
const GRID_COLUMNS = COLS.map((x) => x + "ch").join(" ");
/* IE11 ch is smaller so we need to +1 */
const MS_COLS = COLS.map((x) => (x === 1 ? x : x + 1));
/* We need the total width of cols to hard-code container width */
const MS_WIDTH = MS_COLS.reduce((total, x) => total + x) + "ch";
/* e.g. 6ch 1ch 6ch 1ch 7ch */
const MS_GRID_COLUMNS = MS_COLS.map((x) => x + "ch").join(" ");

/* stylelint-disable property-no-vendor-prefix */
/* stylelint-disable value-no-vendor-prefix */
export const Container = styled(InputField.Row)<{ errorMessage?: string }>`
  display: grid;
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -ms-grid;
  grid-template-columns: ${GRID_COLUMNS};
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -ms-grid-columns: ${MS_GRID_COLUMNS};
  align-items: center;
  width: ${MS_WIDTH}; /* IE doesn't understand max-content so set width to sum of all columns */
  width: max-content; /* So we don't have to hard-code the width */
  border-color: ${(props) =>
    props.errorMessage
      ? props.theme.status.danger
      : props.theme.base.borderDark};
  border-style: solid;
  border-width: ${(props) => (props.errorMessage ? "2px" : "1px")};
  border-radius: 2px;
  overflow: hidden;

  &:focus-within {
    ${browserDefaultFocus};
  }

  /* IE11 grid requires children specify their exact row/column */
  & > * {
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -ms-grid-row-align: center;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -ms-grid-row: 1;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -ms-grid-column-span: 1;

    &:nth-child(1) {
      /* stylelint-disable-next-line property-no-vendor-prefix */
      -ms-grid-column: 1;
    }

    &:nth-child(2) {
      /* stylelint-disable-next-line property-no-vendor-prefix */
      -ms-grid-column: 2;
    }

    &:nth-child(3) {
      /* stylelint-disable-next-line property-no-vendor-prefix */
      -ms-grid-column: 3;
    }

    &:nth-child(4) {
      /* stylelint-disable-next-line property-no-vendor-prefix */
      -ms-grid-column: 4;
    }

    &:nth-child(5) {
      /* stylelint-disable-next-line property-no-vendor-prefix */
      -ms-grid-column: 5;
    }
  }
`;
/* stylelint-enable */

export const Input = styled.input`
  ${inputReset};
  ${textStyle.rainier};
  width: auto;
  padding: ${spacing.club};
  font-variant-numeric: tabular-nums;
  text-align: center;
  appearance: textfield;

  &:focus {
    outline: 0;
  }

  &::placeholder {
    color: ${(props) => props.theme.text.secondary};
    font-weight: 400;
    opacity: 1;
  }

  &::-webkit-inner-spin-button {
    margin: 0;
    appearance: none;
  }

  &:invalid {
    box-shadow: none; /* Disable Firefox red outline on blur of invalid input */
  }
`;

export const Divider = styled.div`
  color: ${(props) => props.theme.text.secondary};
  line-height: 1;
`;
