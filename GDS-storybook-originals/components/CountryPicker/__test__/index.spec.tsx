import React from "react";
import { fireEvent, render, screen, waitFor } from "../../../test/utils";
import CountryPicker, { Country, CountryPickerProps } from "..";

const LABEL_MAIN = "Country";
const LABEL_CLEAR = "Clear selection";

const countries = (
  [
    { id: "1", name: "Argentina", countryCode: "AR", dialCode: "+54" },
    { id: "2", name: "Brazil", countryCode: "BR", dialCode: "+55" },
    { id: "3", name: "Colombia", countryCode: "CO", dialCode: "+57" },
  ] as const
).map((country) => ({
  ...country,
  stateFieldRequired: false,
}));

const baseProps: CountryPickerProps<Country> = {
  countries,
  label: LABEL_MAIN,
  labelClear: LABEL_CLEAR,
  screenReaderErrorPrefix: "Error:",
};

it("by default should render in a closed state with an empty input", () => {
  render(<CountryPicker {...baseProps} />);

  expect(
    screen.getByText(LABEL_MAIN, { selector: "label" }),
  ).toBeInTheDocument();
  expect(
    screen.getByLabelText(LABEL_MAIN, { selector: "input" }),
  ).toHaveDisplayValue("");
  expect(screen.queryAllByRole("option")).toHaveLength(0);
});

it("toggles dropdown list visibility when focus / blur is activated", async () => {
  render(<CountryPicker {...baseProps} />);

  const input = screen.getByRole("combobox");
  fireEvent.focus(input);

  expect(screen.queryAllByRole("option", { hidden: true })).toHaveLength(
    countries.length,
  );

  fireEvent.blur(input);

  await screen.queryAllByRole("option");
  expect(screen.queryAllByRole("option")).toHaveLength(0);
});

it("filters dropdown list items when a search is typed", () => {
  render(<CountryPicker {...baseProps} />);

  const input = screen.getByRole("combobox");

  fireEvent.change(input, { target: { value: "Argen" } });

  const options = screen.queryAllByRole("option");
  expect(options).toHaveLength(1);
  expect(options[0]).toHaveTextContent("Argentina");

  fireEvent.change(input, { target: { value: "" } });

  expect(screen.queryAllByRole("option")).toHaveLength(countries.length);
});

it("closes dropdown when search is typed and there are no matches", async () => {
  render(<CountryPicker {...{ ...baseProps, countries }} />);

  const input = screen.getByRole("combobox");
  fireEvent.change(input, { target: { value: "Sweden" } });

  await waitFor(() => {
    const options = screen.queryAllByRole("option");
    expect(options).toHaveLength(0);
    expect(screen.getByRole("button")).toHaveTextContent(LABEL_CLEAR);
  });
});

describe("canClearSelection", () => {
  it("shows all options after a search is entered, selection is made then dropdown re-opened", () => {
    render(<CountryPicker {...{ ...baseProps, canClearSelection: true }} />);

    const input = screen.getByRole("combobox");
    let options: HTMLElement[];

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.focus(input);

    options = screen.queryAllByRole("option");
    waitFor(() => {
      expect(options).toHaveLength(countries.length);
    });

    // Make a search
    fireEvent.change(input, { target: { value: countries[0].name } });

    // Should have only matched option
    options = screen.queryAllByRole("option");

    waitFor(() => {
      expect(options).toHaveLength(1);
    });

    // Select 1st option
    fireEvent.click(options[0]);

    // clear
    fireEvent.change(input, { target: { value: undefined } });

    options = screen.queryAllByRole("option");
    waitFor(() => {
      expect(options).toHaveLength(countries.length);
    });
  });
});

describe("autocomplete", () => {
  describe("is true (default)", () => {
    it("allows to filter dropdown list items when a search is typed", async () => {
      render(<CountryPicker {...baseProps} />);

      const input = screen.getByRole("combobox");

      // filter by BRAZ
      fireEvent.change(input, { target: { value: "Braz" } });
      const options = screen.queryAllByRole("option");
      waitFor(() => {
        expect(options).toHaveLength(1);
        expect(options[0]).toHaveTextContent("Brazil");
      });

      // select Brazil
      screen.queryAllByRole("option")[0].click();
      waitFor(() => {
        expect(screen.getByDisplayValue("Brazil")).toBeInTheDocument();
        expect(screen.queryAllByRole("option")).toHaveLength(0);
      });

      // clear input
      fireEvent.change(input, { target: { value: "" } });
      waitFor(() => {
        expect(screen.queryAllByRole("option")).toHaveLength(countries.length);
      });
    });
    it("reverts to valid country on blur if user types invalid country", async () => {
      render(<CountryPicker {...baseProps} />);
      const input = screen.getByRole("combobox");

      // Filter by BRAZ
      fireEvent.change(input, { target: { value: "Braz" } });

      // Select Brazil
      fireEvent.click(screen.queryAllByRole("option")[0]);

      await screen.findByText("Brazil");

      // Type an invalid value
      fireEvent.change(input, { target: { value: "invalid value" } });
      expect(input).toHaveDisplayValue("invalid value");

      // Blur to trigger previousValidCountryRef fallback
      fireEvent.blur(input, { relatedTarget: document.body });

      await screen.findByText("Brazil");
    });
    it("should clear country on blur if user removes all characters", () => {
      render(<CountryPicker {...baseProps} />);
      const input = screen.getByRole("combobox");

      // Filter by BRAZ
      fireEvent.change(input, { target: { value: "Braz" } });

      // Select Brazil
      fireEvent.click(screen.queryAllByRole("option")[0]);

      expect(screen.getByDisplayValue("Brazil")).toBeInTheDocument();

      // Type an invalid value
      fireEvent.change(input, { target: { value: "" } });
      expect(input).toHaveDisplayValue("");

      // Blur to trigger previousValidCountryRef fallback
      fireEvent.blur(input);

      // Should show no value in the input
      expect(screen.getByDisplayValue("")).toBeInTheDocument();
    });
  });

  describe("is false", () => {
    it("prevents typing in the field but still allows to select an option from the dropdown list", async () => {
      render(<CountryPicker {...baseProps} autocomplete={false} />);

      const input = screen.getByRole("combobox");
      const options = screen.queryAllByRole("option");

      expect(screen.queryAllByRole("option")).toHaveLength(0);

      // 3 options by default
      input.click();
      waitFor(() => {
        expect(options).toHaveLength(countries.length);
      });

      // typing BRAZ but there's still 3 options
      fireEvent.change(input, { target: { value: "Braz" } });
      waitFor(() => {
        expect(options).toHaveLength(countries.length);
      });

      fireEvent.keyDown(input, { key: "Escape" });
      waitFor(() => {
        expect(options).toHaveLength(countries.length);
      });

      // can still select an option even if TextInput is readOnly and doesn't allow typing/filtering
      waitFor(() => {
        screen.queryAllByRole("option")[2].click();
        expect(screen.getByDisplayValue("Colombia")).toBeInTheDocument();
        expect(options).toHaveLength(0);
      });
    });
  });

  it("does not render dropdown when there are no matches", () => {
    render(<CountryPicker {...baseProps} />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "invalid value" } });

    // Should not show dropdown
    expect(screen.queryAllByRole("listbox")).toHaveLength(0);
  });
});
