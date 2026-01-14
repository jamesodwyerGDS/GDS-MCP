"use client";
import React from "react";
import styled from "styled-components";
import { unstyledlist } from "../../utils/snippets";

type ListItemProps = React.HTMLAttributes<HTMLLIElement>;

export const UnstyledList = styled.ul.attrs({ role: "list" })`
  ${unstyledlist}
`;

export const UnstyledListItem = (props: ListItemProps) => (
  // Need to explicitly add the role to override default VoiceOver behaviour
  // eslint-disable-next-line jsx-a11y/no-redundant-roles
  <li role="listitem" {...props} />
);

export default UnstyledList;
