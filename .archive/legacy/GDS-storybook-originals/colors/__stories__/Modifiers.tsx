import React, { useState } from "react";
import styled from "styled-components";
import { Unstyled } from "@storybook/addon-docs/blocks";
import {
  dark,
  light,
  muted,
  darker,
  weak,
  weaker,
  weakest,
  barely,
} from "../modifiers";
import TM from "../../themes/TM";
import { minTapSize, spacing } from "../../dimensions";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Swatch from "./Swatch";

export default function Modifiers() {
  const initialColour = TM.base.primary;
  const [inputValue, setInputValue] = useState(initialColour);
  const [colour, setColour] = useState(initialColour);

  const modifiers = [
    { name: "original", fn: (col: string) => col },
    { name: "dark", fn: dark },
    { name: "darker", fn: darker },
    { name: "light", fn: light },
    { name: "muted", fn: muted },
    { name: "weak", fn: weak },
    { name: "weaker", fn: weaker },
    { name: "weakest", fn: weakest },
    { name: "barely", fn: barely },
  ];

  return (
    <Unstyled>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setColour(inputValue);
        }}
      >
        <Input
          id="original"
          label="Original colour (as valid hex code)"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          pattern="^#([0-9A-Fa-f]{3}){1,2}$"
          title="Valid hex codes only eg #fff or #AA33FF"
          screenReaderErrorPrefix="Error:"
          required
        />
        <SubmitButton type="submit">Change</SubmitButton>
      </Form>
      <Row>
        {modifiers.map((mod) => (
          <Swatch
            key={mod.name}
            color={mod.fn(colour)}
            title={mod.name}
            subtitle={mod.fn(colour)}
          />
        ))}
      </Row>
    </Unstyled>
  );
}

const Form = styled.form`
  display: flex;
  gap: ${spacing.auditorium};
  align-items: flex-end;
`;

const Input = styled(TextInput)`
  margin-top: ${spacing.auditorium};
`;

const SubmitButton = styled(Button)`
  height: ${minTapSize};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: ${spacing.auditorium};
  margin-top: ${spacing.auditorium};
`;
