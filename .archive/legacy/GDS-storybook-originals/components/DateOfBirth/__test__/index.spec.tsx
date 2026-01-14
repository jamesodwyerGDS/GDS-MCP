import React from "react";
import { render } from "../../../test/utils";
import DateOfBirth from "..";

jest.useFakeTimers();

test("Component: DateOfBirth", () => {
  // Mock date for Jest so snapshots don't start failing when the year changes
  jest.setSystemTime(new Date("2019-06-01"));

  const { container } = render(
    <DateOfBirth
      label="Date of birth"
      dayAriaLabel="birth day"
      monthAriaLabel="birth month"
      yearAriaLabel="birth year"
      dayProps={{ name: "test" }}
      required={true}
      screenReaderErrorPrefix="Error:"
    />,
  );

  expect(container).toMatchSnapshot();
});
