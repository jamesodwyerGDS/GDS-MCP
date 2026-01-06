"use client";
import * as React from "react";

type TogglerProps = {
  "aria-expanded": boolean;
  onClick: () => void;
  type: "button";
};

type Props = {
  children: (arg0: {
    getTogglerProps: () => TogglerProps;
    isExpanded: boolean;
  }) => React.ReactNode;
  defaultExpanded: boolean;
};

type State = {
  isExpanded: boolean;
};

/** @deprecated - Toggle will be removed in a future major release  */
class Toggle extends React.Component<Props, State> {
  state = {
    isExpanded: this.props.defaultExpanded,
  };

  static defaultProps = {
    defaultExpanded: false,
  };

  toggle = () =>
    this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }));

  getTogglerProps = () => ({
    "aria-expanded": this.state.isExpanded,
    onClick: this.toggle,
    type: "button",
  });

  render() {
    return this.props.children({
      // @ts-expect-error TODO: Fix this
      getTogglerProps: this.getTogglerProps,
      isExpanded: this.state.isExpanded,
    });
  }
}

export default Toggle;
