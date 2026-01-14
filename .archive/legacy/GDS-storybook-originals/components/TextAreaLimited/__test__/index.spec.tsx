import React from "react";
import { render } from "../../../test/utils";
import TextAreaLimited from "..";

test("Component: TextAreaLimited -> Should render correctly", () => {
  const { container } = render(
    <TextAreaLimited
      id="test-input"
      label="Your Message"
      characterLimit={40}
      renderCharacterLimit={(limit) => <p>{limit}</p>}
      screenReaderErrorPrefix="Error:"
    />,
  );
  expect(container).toMatchSnapshot();
});
