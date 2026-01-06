import React from "react";
import { render } from "../../../test/utils";
import SelectInput from "../index";

const options = [
  { name: "United Kingdom", value: "GB" },
  { name: "United States", value: "US" },
  { name: "Germany", value: "DE" },
];

test("Component: SelectInput -> Should render correctly", () => {
  const { container } = render(
    <SelectInput id="test-input" screenReaderErrorPrefix="Error:">
      {options.map(({ name, value }) => (
        <option key={name} value={value}>
          {name}
        </option>
      ))}
    </SelectInput>,
  );
  expect(container).toMatchSnapshot();
});
