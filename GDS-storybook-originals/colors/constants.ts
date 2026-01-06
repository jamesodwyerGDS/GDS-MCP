import { css } from "styled-components";
import { Theme } from "../themes/types";

export const mainHeader = ({ theme }: { theme: Theme }) => css`
  background-color: ${theme.base.primary};
`;
