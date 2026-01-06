import { Meta, StoryObj } from "@storybook/react-webpack5";
import CountryPicker from "..";
import countries from "../data";
import usStates from "../states.data";
import React from "react";
import Button from "../../Button";
import { useArgs } from "storybook/preview-api";
import styled from "styled-components";
import { spacing } from "../../../dimensions";

const country = {
  id: "GB",
  name: "United Kingdom",
  countryCode: "GB",
  dialCode: "+44",
  stateFieldRequired: false,
};

const countriesWithID = countries.map((c) => ({ ...c, id: c.countryCode }));

const meta: Meta<typeof CountryPicker> = {
  component: CountryPicker,
  title: "Components/CountryPicker",
  args: {
    label: "Country",
    visibleField: "name",
    labelClear: "Clear selection",
    showFlag: true,
    required: false,
    screenReaderErrorPrefix: "Error:",
    errorMessage: "",
    disabled: false,
    autocomplete: true,
    "aria-describedby": "otherComponent",
    canClearSelection: true,
    countries: countriesWithID,
    isOpen: false,
    onOpenChange: () => {},
  },
  argTypes: {
    onClear: { action: "onClear", table: { disable: true } },
    countries: { table: { disable: true } },
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    inputRef: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof CountryPicker>;

export const Basic: Story = {
  args: {
    label: "Dial Code",
    visibleField: "dialCode",
  },
};

export const NoAutocomplete: Story = {
  args: {
    autocomplete: false,
    canClearSelection: false,
    countries: countriesWithID.slice(0, 3),
  },
};

export const StatesOfUSA: Story = {
  args: {
    autocomplete: false,
    canClearSelection: false,
    showFlag: false,
    countries: usStates,
  },
};

export const Prefilled: Story = {
  args: {
    selectedItem: country,
  },
};

export const Dialcode: Story = {
  args: {
    visibleField: "dialCode",
  },
};

export const TogglePopover = (
  args: React.ComponentProps<typeof CountryPicker>,
) => {
  const [{ isOpen }, updateArgs] = useArgs();

  const setPopoverOpenChange = (open: boolean) => {
    updateArgs({ isOpen: open });
  };

  const handleTogglePopover = () => {
    updateArgs({ isOpen: !isOpen });
  };

  const handleClosePopover = () => {
    updateArgs({ isOpen: false });
  };

  const handledOpenPopover = () => {
    updateArgs({ isOpen: true });
  };

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={handleTogglePopover}>{`Toggle Popover`}</Button>
        <Button onClick={handledOpenPopover}>{`Open Popover`}</Button>
        <Button onClick={handleClosePopover}>{`Close Popover`}</Button>
      </ButtonContainer>
      <CountryPicker {...args} onOpenChange={setPopoverOpenChange} />
    </Container>
  );
};

/**
 * `errorMessage` displays an inline validation message.
 * `screenReaderErrorPrefix` is a visually hidden prefix announced to screen readers before the error message (e.g., "Error: ").
 */
export const WithError: Story = {
  args: {
    screenReaderErrorPrefix: "Error:",
    errorMessage: "This is an error message",
  },
};

export const RTL = {
  globals: {
    addonRtl: "rtl",
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.club};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${spacing.club};
  margin-bottom: ${spacing.club};
`;
