import React, { ReactElement, useId } from "react";
import styled from "styled-components";

import { spacing, textStyle } from "../../dimensions";
import { ChevronIcon } from "../../icons";
import { AccordionProvider, useAccordionContext } from "./AccordionContext";
import { buttonreset } from "../../utils/snippets";
import { AccordionType } from "./types";
import {
  AccordionItemProvider,
  useAccordionItemContext,
} from "./AccordionItemContext";

type AccordionProps = {
  children: React.ReactElement | React.ReactElement[];
  /**
   * The opening type of Accordion
   * single: Only one accordion item can be opened at a time.
   * multi: Multiple accordion items can be opened at a time.
   *
   * @default `single`
   */
  type?: AccordionType;
  showTopBorder?: boolean;
  showBottomBorder?: boolean;
};

const SUPPORTED_KEYS = ["ArrowUp", "ArrowDown", "Home", "End"];

const Accordion = ({
  type = "single",
  children,
  showBottomBorder = true,
  showTopBorder = true,
}: AccordionProps) => {
  const baseId = useId();

  const defaultOpenIds: string[] = [];

  const childrenWithIds = React.Children.map(children, (child, index) => {
    if (
      React.isValidElement<AccordionItemProps>(child) &&
      child.type === AccordionItem
    ) {
      const id = child.props.id ?? `${baseId}-${index}`;
      if (child.props.defaultOpen) {
        defaultOpenIds.push(id);
      }

      return React.cloneElement(child, {
        ...child.props,
        id,
      });
    }
    return child;
  });

  return (
    <AccordionProvider type={type} defaultOpenIds={defaultOpenIds}>
      <AccordionContainer
        showTopBorder={showTopBorder}
        showBottomBorder={showBottomBorder}
      >
        {childrenWithIds}
      </AccordionContainer>
    </AccordionProvider>
  );
};

const AccordionContainer = ({
  children,
  showTopBorder,
  showBottomBorder,
}: {
  children: React.ReactNode;
  showTopBorder: boolean;
  showBottomBorder: boolean;
}) => {
  const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!SUPPORTED_KEYS.includes(event.key)) {
      return;
    }

    event.preventDefault();

    const enabledButtons = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        "[data-accordion-button]",
      ),
    );

    const activeElement = document.activeElement as HTMLElement;
    const currentIndex = enabledButtons.findIndex(
      (summary) => summary === activeElement,
    );

    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    switch (event.key) {
      case "ArrowUp":
        nextIndex =
          (currentIndex - 1 + enabledButtons.length) % enabledButtons.length;
        break;
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % enabledButtons.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = enabledButtons.length - 1;
        break;
      default:
        return;
    }

    enabledButtons[nextIndex]?.focus();
  };

  return (
    <StyledAccordionContainer
      onKeyDown={handleKeydown}
      $showTopBorder={showTopBorder}
      $showBottomBorder={showBottomBorder}
    >
      {children}
    </StyledAccordionContainer>
  );
};

type AccordionItemProps = {
  children: ReactElement[];
  /**
   * Indicates whether the accordion item is open by default.
   *
   * @default `false`
   */
  defaultOpen?: boolean;
  /**
   * Optional unique identifier for the accordion item.
   * If not provided, a generated id will be used.
   */
  id?: string;
};

const AccordionItem = ({ children, id }: AccordionItemProps) => {
  return (
    <AccordionItemProvider id={id as string}>
      <StyledAccordionItem>{children}</StyledAccordionItem>
    </AccordionItemProvider>
  );
};

const AccordionHeader = ({
  leadingIcon,
  children,
  maxContentWidth = "80ch",
  onClick,
}: {
  leadingIcon?: React.ReactElement;
  children: React.ReactNode;
  maxContentWidth?: string;
  onClick?: () => void;
}) => {
  const { toggle } = useAccordionContext();
  const { isOpen, id } = useAccordionItemContext();

  return (
    <Button
      onClick={() => {
        onClick?.();
        toggle(id);
      }}
      aria-expanded={isOpen}
      aria-controls={`panel-${id}`}
      type="button"
      data-accordion-button
    >
      {leadingIcon}
      <HeaderContentWrapper $maxContentWidth={maxContentWidth}>
        {children}
      </HeaderContentWrapper>
      <StyledChevronIcon />
    </Button>
  );
};

const AccordionPanel = ({
  children,
  maxContentWidth = "80ch",
}: {
  children: React.ReactNode;
  maxContentWidth?: string;
}) => {
  const { isOpen, id } = useAccordionItemContext();

  return (
    <PanelContentWrapper
      role="region"
      id={`panel-${id}`}
      aria-labelledby={id}
      $maxContentWidth={maxContentWidth}
      data-expanded={isOpen ? "" : undefined}
      {...{ inert: !isOpen ? "" : undefined }}
    >
      <div id={id}>
        <PanelContent>{children}</PanelContent>
      </div>
    </PanelContentWrapper>
  );
};

const StyledAccordionContainer = styled.div<{
  $showTopBorder: boolean;
  $showBottomBorder: boolean;
}>`
  --gds-accordion-easing-fn: cubic-bezier(0.3, 0, 0.2, 1);
  --gds-accordion-transition-duration: 300ms;
  --gds-accordion-inline-padding: ${spacing.amphitheatre};
  --gds-accordion-block-padding: ${spacing.auditorium};
  --gds-accordion-border: 1px solid ${(props) => props.theme.base.borderLight};
  background-color: ${(props) => props.theme.base.bg};

  > * + * {
    border-top: var(--gds-accordion-border);
  }

  ${(props) =>
    props.$showTopBorder && `border-top: var(--gds-accordion-border);`}

  ${(props) =>
    props.$showBottomBorder && `border-bottom: var(--gds-accordion-border);`}
`;

const StyledAccordionItem = styled.div``;

const Button = styled.button`
  ${buttonreset}
  ${textStyle.boising}
  display: flex;
  gap: ${spacing.hall};
  width: 100%;
  padding: var(--gds-accordion-block-padding)
    var(--gds-accordion-inline-padding);
  cursor: pointer;
  transition: all 70ms var(--gds-accordion-easing-fn);

  &:hover {
    /* borderLight is a temporary workaround until theme update */
    background-color: ${(props) => props.theme.base.borderLight};
  }
`;

const HeaderContentWrapper = styled.span<{ $maxContentWidth?: string }>`
  flex: 1;
  max-width: ${(props) => props.$maxContentWidth};
`;

const StyledChevronIcon = styled(ChevronIcon)`
  margin-inline-start: auto;
  transition: transform var(--gds-accordion-transition-duration)
    var(--gds-accordion-easing-fn);

  ${Button}[aria-expanded="true"] & {
    transform: rotate(-180deg);
  }
`;

const PanelContentWrapper = styled.div<{ $maxContentWidth?: string }>`
  display: grid;
  grid-template-rows: 0fr;
  max-width: ${(props) => props.$maxContentWidth};
  transition: grid-template-rows var(--gds-accordion-transition-duration)
    var(--gds-accordion-easing-fn);

  & > * {
    padding: 0;
    overflow: hidden;
  }

  &[data-expanded] {
    grid-template-rows: 1fr;
  }
`;

const PanelContent = styled.div`
  padding: var(--gds-accordion-block-padding)
    var(--gds-accordion-inline-padding);
`;

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;

export default Accordion;
