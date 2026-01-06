import React, { type PropsWithChildren, type FC } from "react";
import styled from "styled-components";
import { spacing, textStyle } from "../../dimensions";
import {
  ArrowTopRightIcon,
  BoxOfficeIcon,
  CheckmarkCircledFilledIcon,
  PostalTicketIcon,
  PrinterIcon,
  TicketErrorIcon,
  TicketMobileIcon,
  ArrowsRefreshIcon,
  ExclamationMarkTriangleFilledIcon,
  InfoICircledFilledIcon,
  ClockIcon,
  TicketIcon,
  TicketClockIcon,
} from "../../icons";

export const TICKET_DESCRIPTION_ICONS = {
  postal: <PostalTicketIcon />,
  willCall: <BoxOfficeIcon />,
  print: <PrinterIcon />,
  transferComplete: <CheckmarkCircledFilledIcon fillColor="success" />,
  cancelled: <TicketErrorIcon />,
  appOnly: <TicketMobileIcon />,
  resaleSold: <CheckmarkCircledFilledIcon fillColor="success" />,
  transferPending: <ArrowTopRightIcon fillColor="primary" />,
  resale: <ArrowsRefreshIcon fillColor="resale" />,
  error: <ExclamationMarkTriangleFilledIcon fillColor="warning" />,
  info: <InfoICircledFilledIcon fillColor="info" />,
  notYourTicket: <ClockIcon />,
  telecharge: <TicketIcon />,
  reserved: <TicketClockIcon />,
};

type Props = {
  children: React.ReactNode;
};

type TicketDescription = FC<Props> & {
  Header: typeof Header;
  Title: typeof Title;
  Description: typeof Description;
};

const TicketDescription: TicketDescription = ({ children }: Props) => {
  return <>{children}</>;
};

export type IconName = keyof typeof TICKET_DESCRIPTION_ICONS;

type HeaderProps =
  | {
      overrideIcon?: never;
      /** Selects a predefined icon */
      icon: IconName;
      image?: never;
    }
  | {
      /**
       * Use custom Icon to render instead of a predefined one
       * This is useful when the available icons don’t cover your use case
       */
      overrideIcon: React.ReactNode;
      icon?: never;
      image?: never;
    }
  | {
      overrideIcon?: never;
      icon?: never;
      /** Provide an image element to render instead of an icon */
      image: React.ReactNode;
    };

const Header = ({
  children,
  overrideIcon,
  icon,
  image,
}: PropsWithChildren<HeaderProps>) => {
  return (
    <Stack>
      {overrideIcon && overrideIcon}
      {icon && TICKET_DESCRIPTION_ICONS[icon]}
      {image && image}
      <CopyWrapper>{children}</CopyWrapper>
    </Stack>
  );
};

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.hall};
  align-items: center;
  align-self: stretch;
  justify-content: center;
`;

export const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lounge};
  align-items: center;
  align-self: stretch;
`;

export const Title = styled.p`
  margin: 0px;
  color: ${(props) => props.theme.text.primary};
  ${textStyle.nevis}
  text-align: center;
`;

export const Description = styled.p<{ $color?: "secondary" | "primary" }>`
  margin: 0px;
  color: ${({ $color, theme }) =>
    $color === "primary" ? theme.text.primary : theme.text.secondary};
  ${textStyle.etna}
  text-align: center;
`;

TicketDescription.Header = Header;
TicketDescription.Title = Title;
TicketDescription.Description = Description;

export default TicketDescription;
