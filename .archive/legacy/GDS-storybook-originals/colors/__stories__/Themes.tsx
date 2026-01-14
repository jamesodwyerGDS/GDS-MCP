import React, { useState } from "react";
import { Unstyled } from "@storybook/addon-docs/blocks";
import styled from "styled-components";
import { spacing, textStyle } from "../../dimensions";
import { titleAccents } from "../../utils/titleAccents";
import LN from "../../themes/LN";
import TM from "../../themes/TM";
import RadioButton from "../../components/RadioButton";
import Swatch from "./Swatch";

export default function Themes() {
  const themes = [
    { name: "TM", ...TM },
    { name: "LN", ...LN },
  ];

  const [theme, setTheme] = useState(themes[0]);

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const selectedTheme = themes.find((t) => t.name === e.currentTarget.value);

    // should always be true
    if (selectedTheme) {
      setTheme(selectedTheme);
    }
  };

  const excludeKeys = [
    "name",
    "fontSizes",
    "space",
    "gradients",
    "logoSvg",
    "_buttons",
    "_header",
    "_footer",
    "_links",
  ];

  return (
    <Unstyled>
      <fieldset>
        <legend> Select a theme:</legend>
        <Radios>
          {themes.map((t) => (
            <RadioButton
              type="radio"
              key={t.name}
              value={t.name}
              id={t.name}
              checked={theme.name === t.name}
              onChange={onChange}
              label={t.name}
              screenReaderErrorPrefix="Error:"
            />
          ))}
        </Radios>
      </fieldset>
      <Wrapper>
        {Object.entries(theme)
          .filter(([key]) => !excludeKeys.includes(key))
          .map(([title, subPalette]) => (
            <Section key={title}>
              <SectionHeading>{title}</SectionHeading>
              <Row>
                {Object.entries(subPalette).map(([name, hex]) => {
                  if (typeof hex === "string") {
                    return (
                      <Swatch
                        color={hex}
                        key={name}
                        title={`${title}.${name}`}
                        subtitle={hex}
                      />
                    );
                  }
                  return null;
                })}
              </Row>
            </Section>
          ))}
      </Wrapper>
    </Unstyled>
  );
}

const Wrapper = styled.div`
  margin: ${spacing.amphitheatre} 0;
`;

const Section = styled.section`
  & + & {
    margin-top: ${spacing.arena};
  }
`;

const SectionHeading = styled.h3`
  ${textStyle.blanc}
  ${titleAccents.blanc}
  margin: 0;
`;

const Radios = styled.div`
  display: flex;
  gap: ${spacing.auditorium};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: ${spacing.amphitheatre};
  margin-top: ${spacing.auditorium};
`;
