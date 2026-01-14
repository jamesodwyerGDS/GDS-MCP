import styled from "styled-components";
import { spacing, textStyle } from "../../dimensions";
import { unstyledlist } from "../../utils/snippets";

export const List = styled.dl`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
`;

export const FullWidthItem = styled.div`
  flex-basis: 100%;
  flex-grow: 1;
  flex-shrink: 0;

  /*
  Note(MH): I'm not a big fan of this margin-bottom instead of doing margin-top 
  on the other elements, but this one is the one that might not appear, so it 
  needs to take all the layout with it if it doesn't appear.
  */
  margin-bottom: ${spacing.hall};
  padding-bottom: ${spacing.club};
  border-bottom: 1px solid ${(props) => props.theme.base.border};

  /*
  If it's the only item, make sure it doesn't add extra layout
  */
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const LineWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const Item = styled.div`
  flex-grow: 1;
  flex-shrink: 1;

  & + & {
    position: relative;
    margin-inline-start: ${spacing.auditorium};
    padding-inline-start: ${spacing.club};
    border-inline-start: 1px solid ${(props) => props.theme.base.border};
  }

  /* 
  This is needed to enable the overflow-wrap property to work on the flex item.
  */
  &:first-child {
    min-width: 0;
  }
`;

export const Title = styled.dt`
  ${textStyle.snowdon};
  color: ${(props) => props.theme.base.primary};
`;

export const Details = styled.dd`
  ${textStyle.fiji}
  margin: 0;
  /* Bold fiji font weight overridden, temporary as SeatInfo is to be restyled soon */
  font-weight: 400;
  overflow-wrap: anywhere;
`;

export const InlineList = styled.dl`
  ${unstyledlist};

  display: flex;
  flex-wrap: wrap;
`;

export const InlineItem = styled.div`
  margin-inline-end: 0.5em;
  white-space: pre-wrap;
`;

export const InlineTitle = styled.dt`
  display: inline-block;
`;

export const InlineDetails = styled.dd`
  display: inline-block;
  margin: 0;
  font-weight: bold;
  overflow-wrap: anywhere;
`;

export const Description = styled.p`
  ${textStyle.etna};
  margin: 0;
  color: ${(props) => props.theme.text.secondary};
`;

export const ItemNoDivider = styled(Item)`
  text-align: center;

  & + & {
    border-inline-start: none;
  }
  &:first-child {
    text-align: start;
  }
  &:last-child {
    text-align: end;
  }
`;

export const TitleNoDivider = styled(Title)`
  ${textStyle.snowdon};
  color: ${(props) => props.theme.text.secondary};
`;

export const DetailsNoDivider = styled(Details)`
  ${textStyle.vinson};
  color: ${(props) => props.theme.text.primary};
`;

export const FullWidthItemNoDivider = styled(FullWidthItem)`
  border: none;
`;
