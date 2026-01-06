"use client";
import React, { ReactNode, useId } from "react";
import styled from "styled-components";
import { spacing, textStyle } from "../../dimensions";
import PillButton from "../PillButton";
import { ChevronIcon } from "../../icons";

export type Props = {
  onClick: () => void;
  total: number;
  count: number;
  buttonLabel: string;
  recapLabel: ReactNode;
  reverseChevron?: boolean;
  inverse?: boolean;
  className?: string;
};

const PaginationButton = ({
  onClick,
  buttonLabel,
  recapLabel,
  count,
  total,
  reverseChevron = false,
  inverse = false,
  className,
}: Props) => {
  const progressPercentage = `${Math.ceil((count / total) * 100)}%`;
  const recapId = useId();

  return (
    <Container className={className}>
      <Recap id={recapId}>
        {recapLabel}
        <ProgressBar $percent={progressPercentage} />
      </Recap>
      <ShowMoreButton
        endIcon={<ChevronIcon rotate={reverseChevron ? -180 : 0} />}
        onClick={onClick}
        aria-describedby={recapId}
        inverse={inverse}
      >
        {buttonLabel}
      </ShowMoreButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Recap = styled.div`
  ${textStyle.etna};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.hall} ${spacing.amphitheatre};
  border-radius: ${spacing.amphitheatre};
  background-color: ${({ theme }) => theme.base.bgAlt};
`;

const ProgressBar = styled.div<{
  $percent: string;
}>`
  position: relative;
  width: 250px;
  height: ${spacing.lounge};
  margin-top: ${spacing.hall};
  border-radius: ${spacing.lounge};
  overflow: hidden;
  background-color: ${({ theme }) => theme.base.border};

  &::before {
    position: absolute;
    width: ${({ $percent }) => $percent};
    height: 100%;
    background-color: ${({ theme }) => theme.base.bgInverse};
    content: "";
  }
`;

const ShowMoreButton = styled(PillButton)`
  margin-top: ${spacing.hall};
`;

export default PaginationButton;
