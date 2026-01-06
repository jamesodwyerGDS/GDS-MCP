import React from "react";
import styled from "styled-components";
import { Unstyled } from "@storybook/addon-docs/blocks";
import { elevation } from "../elevation";
import { spacing } from "../spacing";

type ElevationLevel = keyof typeof elevation;
const elevationList = Object.keys(elevation) as ElevationLevel[];

export const Elevation = () => {
  return (
    <Unstyled>
      <Table>
        <thead>
          <HeaderRow>
            <th>Name</th>
            <th>Example</th>
          </HeaderRow>
        </thead>
        <tbody>
          {elevationList.map((elevationLevel) => {
            return (
              <Row key={elevationLevel}>
                <td>
                  <Token>{`elevation.${elevationLevel}`}</Token>
                </td>
                <td>
                  <Item elevationLevel={elevationLevel}>Content</Item>
                </td>
              </Row>
            );
          })}
        </tbody>
      </Table>
    </Unstyled>
  );
};

const Table = styled.table`
  width: 100%;
  margin-bottom: 3rem;
  border: 1px solid ${(props) => props.theme.base.borderLight};
  border-collapse: collapse;
  text-align: start;
`;

const HeaderRow = styled.tr`
  border: 1px solid ${(props) => props.theme.base.borderLight};

  & > th {
    padding: ${spacing.auditorium};
    border-inline-start: 1px solid ${(props) => props.theme.base.borderLight};
  }

  background-color: ${(props) => props.theme.base.bgAlt};
`;

const Row = styled.tr`
  > td {
    padding: ${spacing.auditorium};
    border-inline-start: 1px solid ${(props) => props.theme.base.borderLight};
  }
`;

const Token = styled.code`
  /* Storybook's monospace font - I think it's prettier than plain HTML default */
  font-family:
    ui-monospace, Menlo, Monaco, "Roboto Mono", "Oxygen Mono",
    "Ubuntu Monospace", "Source Code Pro", "Droid Sans Mono", "Courier New",
    monospace;
`;

const Item = styled.div<{ elevationLevel: ElevationLevel }>`
  ${(props) => elevation[props.elevationLevel]};

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 200px;
  height: 100px;
`;
