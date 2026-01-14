"use client";
import React from "react";
import styled from "styled-components";

type Props = {
  /** TODO: Describe the purpose of this prop.
   * @default true
   */
  showMe: boolean;
};

/**
 * TODO: Describe the purpose of this component.
 *
 * @beta This component is subject to breaking changes as we test and gather feedback.
 */
const NewComponentTemplate = ({ showMe = true }: Props) => {
  return (
    <Container data-component="NewComponentTemplate" data-version="0.1.0">
      {showMe && "Hi! I am a new component!"}
    </Container>
  );
};

export default NewComponentTemplate;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
