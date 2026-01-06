"use client";
import * as React from "react";
import TextArea from "../TextArea";
import styled from "styled-components";
import { spacing, textStyle } from "../../dimensions";

type Props = {
  className?: string;
  id: string;
  label: React.ReactNode;
  rows?: number;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  errorMessage?: string;
  characterLimit: number;
  screenReaderErrorPrefix: string;
  renderCharacterLimit?: (limit: number) => React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
} & React.ComponentPropsWithoutRef<"textarea">;

const TextAreaLimited = React.forwardRef<HTMLTextAreaElement, Props>(
  function TextAreaLimited(
    {
      className,
      onChange = () => {},
      characterLimit,
      renderCharacterLimit = (limit) => limit,
      disabled,
      errorMessage,
      screenReaderErrorPrefix,
      ...rest
    },
    ref,
  ) {
    const [inputValue, setInputValue] = React.useState("");
    const characterCountId = React.useId();

    const value = rest.value || inputValue;

    const charactersRemaining = characterLimit - value.length;

    const describedBy = rest["aria-describedby"]
      ? `${rest["aria-describedby"]} ${characterCountId}`
      : characterCountId;

    return (
      <div className={className}>
        <TextArea
          {...rest}
          ref={ref}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e);
          }}
          disabled={disabled}
          aria-describedby={describedBy}
          errorMessage={errorMessage}
          screenReaderErrorPrefix={screenReaderErrorPrefix}
        />
        <div id={characterCountId} aria-live="polite">
          {!disabled && !errorMessage && (
            <CharacterCounter noCharactersRemaining={charactersRemaining < 0}>
              {renderCharacterLimit(charactersRemaining)}
            </CharacterCounter>
          )}
        </div>
      </div>
    );
  },
);

const CharacterCounter = styled.div<{ noCharactersRemaining: boolean }>`
  ${textStyle.etna};
  margin-top: ${spacing.lounge};
  color: ${(props) =>
    props.noCharactersRemaining
      ? props.theme.status.danger
      : props.theme.text.secondary};
  text-align: end;
`;

export default TextAreaLimited;
