import React, { ReactNode, useEffect, useId, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import Tooltip from "..";
import styled from "styled-components";
import Button from "../../Button";
import SuccessMessage from "../../SuccessMessage";
import { QuestionMarkCircledIcon } from "../../../icons";
import { PositionX, PositionY } from "../types";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: "Components/Tooltip",
  args: {
    enableClick: true,
    enableHover: true,
    message: "This is a test! This is a test! This is a test!",
  },
  render: function Render(props) {
    const id = useId();
    const root = document.getElementById("storybook-root");

    return (
      <Container>
        <Tooltip {...props} id={id} root={root}>
          <Button aria-describedby={id}>Hello</Button>
        </Tooltip>
      </Container>
    );
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {};

export const StartBottom: Story = {
  args: {
    positionX: "start",
    positionY: "bottom",
  },
};

export const CentreBottom: Story = {
  args: {
    positionX: "centre",
    positionY: "bottom",
  },
};

export const EndBottom: Story = {
  args: {
    positionX: "end",
    positionY: "bottom",
  },
};

export const StartTop: Story = {
  args: {
    positionX: "start",
    positionY: "top",
  },
};

export const CentreTop: Story = {
  args: {
    positionX: "centre",
    positionY: "top",
  },
};

export const EndTop: Story = {
  args: {
    positionX: "end",
    positionY: "top",
  },
};

export const WithComponentMessage: Story = {
  args: {
    positionX: "start",
    positionY: "bottom",
    message: <SuccessMessage>Everything is going to plan</SuccessMessage>,
  },
};

export const AllPositions: Story = {
  render: () => {
    const root = document.getElementById("storybook-root");
    const tooltips = [
      {
        message: "I'm small top start",
        styles: {
          top: 0,
          insetInlineStart: 0,
        },
      },
      {
        message: "I'm small top centre",
        styles: {
          top: 0,
          insetInlineStart: "50%",
        },
      },
      {
        message: "I'm small top end",
        styles: {
          top: 0,
          insetInlineEnd: 0,
        },
      },
      {
        message: "I'm small centre start",
        styles: {
          top: "50%",
          insetInlineStart: 0,
        },
      },
      {
        message: "I'm small centre end",
        styles: {
          top: "50%",
          insetInlineEnd: 0,
        },
      },
      {
        message: "I'm small bottom start",
        styles: {
          bottom: 0,
          insetInlineStart: 0,
        },
      },

      {
        message: "I'm small bottom centre",
        styles: {
          bottom: 0,
          insetInlineStart: "50%",
        },
      },
      {
        message: "I'm small bottom end",
        styles: {
          bottom: 0,
          insetInlineEnd: 0,
        },
      },
    ];
    return (
      <AllContainer>
        {tooltips.map((tooltip, index) => {
          const { message } = tooltip;
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                padding: "25px",
                ...tooltip.styles,
              }}
            >
              <Tooltip
                key={index}
                root={root}
                enableClick
                enableHover
                message={message}
                id={"tooltip" + index}
              >
                <QuestionMarkCircledIcon />
              </Tooltip>
            </div>
          );
        })}
      </AllContainer>
    );
  },
};

export const ScrollablePosition: Story = {
  render: () => {
    const root = document.getElementById("storybook-root");
    type TooltipsType = {
      message: string;
      positionX: PositionX;
      positionY: PositionY;
      styles: {
        top?: number | string;
        bottom?: number | string;
        insetInlineStart?: number | string;
        insetInlineEnd?: number | string;
      };
    };

    const tooltips: Array<TooltipsType> = [
      {
        message:
          "I'm a medium sized tooltip, The text will wrap on multiple lines but it should always fit within the screen. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi error.",
        positionX: "centre",
        positionY: "top",
        styles: {
          top: "50%",
          insetInlineStart: "45%",
        },
      },
      {
        message:
          "I'm the biggest tooltip you've ever seen, the text will definitely wrap on multiple lines.  It's so long it probably shouldn't even be a tooltip. Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
        positionX: "end",
        positionY: "top",
        styles: {
          top: "50%",
          insetInlineStart: "50%",
        },
      },
      {
        message:
          "I'm a right medium sized tooltip, The text will wrap on multiple lines but it should always fit within the screen. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi error.",
        positionX: "end",
        positionY: "bottom",
        styles: {
          top: "50%",
          insetInlineStart: "55%",
        },
      },
    ];

    return (
      <WrapperScrollable>
        {tooltips.map((tooltip, index) => {
          const positionX = tooltip.positionX;
          const positionY = tooltip.positionY;
          const { message } = tooltip;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                ...tooltip.styles,
              }}
            >
              <Tooltip
                root={root}
                enableClick
                enableHover
                message={message}
                id={"tooltip" + index}
                positionX={positionX}
                positionY={positionY}
              >
                <QuestionMarkCircledIcon />
              </Tooltip>
            </div>
          );
        })}
      </WrapperScrollable>
    );
  },
};

export const Custom: Story = {
  render: () => {
    return (
      <BasicWrapper>
        <Tooltip.Arrow positionX="end" positionY="top" />
        <Tooltip.Arrow positionX="start" positionY="top" />
        <Tooltip.Body>Custom tooltip basic positioning</Tooltip.Body>
      </BasicWrapper>
    );
  },
};

export const CustomWithOffset: Story = {
  render: () => {
    const tooltipIconRef = useRef<SVGSVGElement>(null);
    useEffect(() => {
      const tooltipIconElement = tooltipIconRef.current;
      tooltipIconElement?.style.setProperty("inset-inline-end", "150px");
    }, []);

    return (
      <BasicWrapper>
        <div>
          <Tooltip.Arrow
            positionX="custom"
            positionY="top"
            ref={tooltipIconRef}
          />
          <Tooltip.Body>Custom tooltip with offset arrow</Tooltip.Body>
        </div>
      </BasicWrapper>
    );
  },
};

const BasicWrapper = styled.div`
  position: absolute;
  top: 50%;
  inset-inline-start: 50%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
`;

const WrapperScrollable = ({ children }: { children: ReactNode }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const dimensions = React.useMemo(() => [3200, 1600], []);

  React.useEffect(() => {
    if (containerRef.current) {
      const containerDimensions = containerRef.current.getBoundingClientRect();
      containerRef.current.scrollTo(
        40 + dimensions[0] / 2 - containerDimensions.width / 2,
        40 + dimensions[1] / 2 - containerDimensions.height / 2,
      );
    }
  }, [dimensions]);

  return (
    <AllContainer scrollable ref={containerRef}>
      <InnerContainerScrolled dimensions={dimensions}>
        {children}
      </InnerContainerScrolled>
    </AllContainer>
  );
};

const AllContainer = styled.div<{
  scrollable?: boolean;
}>`
  position: relative;
  width: calc(100vw - 32px);
  height: calc(100vh - 32px);
  padding: 24px;
  border: 1px dashed coral;
  overflow: ${({ scrollable }) => (scrollable ? "auto" : "hidden")};
  background-color: #fffbfb;
`;

const InnerContainerScrolled = styled.div<{
  dimensions: number[];
}>`
  position: relative;
  display: block;
  width: ${({ dimensions }) => `${dimensions[0]}px`};
  height: ${({ dimensions }) => `${dimensions[1]}px`};
`;
