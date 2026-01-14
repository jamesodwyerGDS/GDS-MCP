import React from "react";
import { render } from "../../../test/utils";
import TicketQuantity from "..";
import PhoneIcon from "../../../icons/dist/PhoneIcon";

test("Component: TicketQuantity - no number passed in", () => {
  const { container } = render(
    <TicketQuantity quantity={0} a11yLabel="Ticket count:" />,
  );

  expect(container).toMatchSnapshot();
});

test("Component: TicketQuantity - no quantity prop passed in", () => {
  const { container } = render(
    <TicketQuantity quantity={3} a11yLabel="Ticket count:" />,
  );

  expect(container).toMatchSnapshot();
});

test("Component: TicketQuantity - number passed in", () => {
  const { container } = render(
    <TicketQuantity quantity={1} a11yLabel="Ticket count:" />,
  );

  expect(container).toMatchSnapshot();
});

test("Component: TicketQuantity with Icon - number passed in", () => {
  const Icon = <PhoneIcon />;
  const { container } = render(
    <TicketQuantity quantity={1} icon={Icon} a11yLabel="Ticket count:" />,
  );

  expect(container).toMatchSnapshot();
});

test("Component: TicketQuantity - color passed in", () => {
  const { container } = render(
    <TicketQuantity quantity={1} color="link" a11yLabel="Ticket count:" />,
  );

  expect(container).toMatchSnapshot();
});
