import React from "react";
import { render } from "../../../test/utils";
import Card from "..";

test("Component: Card -> Should render correctly", () => {
  const { container } = render(
    <Card>
      <Card.Title>Title</Card.Title>
      <Card.Body>Lorem ipsum</Card.Body>
    </Card>,
  );

  expect(container).toMatchSnapshot();
});
