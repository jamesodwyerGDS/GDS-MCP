import { css } from "styled-components";

// TODO: replace these snippet values with tokens

/** This is the default canvas level to build screens on */
const level0 = css``;

/** This level is used to provide heirarchy within content that is laid on level 0 */
const level1 = css`
  box-shadow: 0px 1px 4px 0px rgba(18, 18, 18, 0.15);
`;

/** This level is used for any sticky elements on the page such as a header or a footer */
const level2 = css`
  box-shadow: 0px 2px 8px 0px rgba(18, 18, 18, 0.15);
`;

/** This level is used if there are more than one sticky elements on the page and you want to establish hierarchy between them */
const level3 = css`
  box-shadow: 0px 3px 12px 0px rgba(18, 18, 18, 0.18);
`;

/** This level is always used with an overlay background for elements such as modals or drawers */
const level4 = css`
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.35);
`;

export const elevation = { level0, level1, level2, level3, level4 } as const;
