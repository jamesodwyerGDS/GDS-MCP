import styled from "styled-components";
import { spacing, textStyle } from "../../dimensions";
import { buttonreset } from "../../utils/snippets";

export const BorderRow = styled.div`
  margin-top: ${spacing.hall};
  padding-top: ${spacing.hall};
  border-top: 1px solid ${(props) => props.theme.base.border};
`;

export const Header = styled.div`
  display: flex;
`;

export const HeaderCol1 = styled.div<{ slot: "left" | "right" }>`
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  justify-content: ${({ slot }) => {
    switch (slot) {
      case "left":
        return "initial";
      case "right":
        return "space-between";
    }
  }};
`;

export const HeaderCol2 = styled.div`
  flex-shrink: 0;

  margin-inline-start: ${spacing.auditorium};
`;

export const PriceRow = styled(BorderRow)`
  display: flex;
  align-items: center;

  & > * + * {
    margin-inline-start: ${spacing.auditorium};
  }
`;

export const CtaWrapper = styled.div`
  margin-inline-start: auto;
`;

export const FeesRow = styled.div`
  ${textStyle.etna};
  color: ${(props) => props.theme.text.secondary};

  & > * + * {
    margin-top: ${spacing.hall};
  }
`;

export const Button = styled.button`
  ${buttonreset};

  display: flex;
  align-items: flex-end;
`;

export const SplitPrice = styled.div`
  ${textStyle.etna};
  color: ${(props) => props.theme.text.secondary};
`;
