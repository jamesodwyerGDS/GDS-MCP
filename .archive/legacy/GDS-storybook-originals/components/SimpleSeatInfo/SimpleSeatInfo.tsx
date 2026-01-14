import React from "react";
import styled from "styled-components";
import { SeatInfoProps } from "../SeatInfov2/SeatInfov2";
import { textStyle, spacing } from "../../dimensions";

type SimpleSeatInfoProps = Pick<SeatInfoProps, "section" | "seat" | "row">;

const SimpleSeatInfo = ({ section, row, seat }: SimpleSeatInfoProps) => {
  const locationsParts = [
    ...(section?.value ? [section] : []),
    ...(row?.value ? [row] : []),
    ...(seat?.value ? [seat] : []),
  ];

  return (
    <StyledSeatInfo>
      <RowList>
        {locationsParts.map((item, index) => {
          if (!item) return null;
          return (
            <RowItem key={item.title}>
              <LocationLabel>{item.title.toUpperCase()}</LocationLabel>
              <LocationDescription>
                {item?.value}
                {index < locationsParts.length - 1 && <span>,</span>}
              </LocationDescription>
            </RowItem>
          );
        })}
      </RowList>
    </StyledSeatInfo>
  );
};

export default SimpleSeatInfo;

const StyledSeatInfo = styled.div`
  ${textStyle.snowdon};
  margin: 0;
  color: ${(props) => props.theme.text.secondary};
`;

const RowList = styled.dl`
  display: flex;
  gap: ${spacing.lounge};
`;

const RowItem = styled.div`
  display: flex;
  gap: ${spacing.lounge};
`;

const LocationLabel = styled.dt`
  margin: 0;
`;

const LocationDescription = styled.dd`
  margin: 0;
`;
