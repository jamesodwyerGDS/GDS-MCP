"use client";
import React, { ComponentPropsWithRef, ElementType } from "react";
import {
  StyledButton,
  FlexWrapper,
  ColorVariant,
  FillVariant,
  LoadingContainer,
} from "./index.styles";
import ChevronIcon from "../../icons/dist/ChevronIcon";
import { Spinner } from "../shared/Spinner";
import VisuallyHidden from "../utils/VisuallyHidden";
import { getButtonType } from "../../utils/getButtonType";

type SharedProps<E extends ElementType> = {
  as?: E;
  colorVariant?: ColorVariant;
  fillVariant?: FillVariant;
  fullWidth?: boolean;
  hasChevron?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
  loading?: {
    isLoading: boolean;
    hiddenLoadingMessage: string;
  };
};

type Props<E extends ElementType> = SharedProps<E> &
  Omit<ComponentPropsWithRef<E>, keyof SharedProps<E>>;

const BaseButton = <E extends ElementType = "button">(props: Props<E>) => {
  const {
    colorVariant = "primary",
    fillVariant = "fill",
    fullWidth = false,
    hasChevron = false,
    loading = null,
    startIcon,
    endIcon,
    children,
    ...rest
  } = props;

  const getFillVariant = () => {
    const outlineColorVariants: ColorVariant[] = [
      "secondary",
      "tertiary",
      "inverse",
    ];

    if (outlineColorVariants.includes(colorVariant)) {
      return "outline";
    }

    return fillVariant;
  };

  const getLoadingColorVariant = () => {
    if (
      (colorVariant === "primary" && fillVariant !== "fill") ||
      colorVariant === "secondary"
    ) {
      return "primary";
    }

    if (colorVariant === "tertiary") {
      return "secondary";
    }

    return "inverse";
  };

  const showLoadingState =
    loading?.isLoading &&
    !(props.disabled || props["aria-disabled"] === "true");

  const sharedProps = {
    $colorVariant: colorVariant,
    $fillVariant: getFillVariant(),
    $fullWidth: fullWidth,
    $showLoadingState: showLoadingState,
    children: (
      <>
        <FlexWrapper $isLoading={showLoadingState}>
          {startIcon}
          <span>{children}</span>
          {hasChevron ? <ChevronIcon rotate={-90} size="1.5em" /> : endIcon}
        </FlexWrapper>
        {loading && (
          <VisuallyHidden aria-live="assertive" role="status">
            {showLoadingState && loading.hiddenLoadingMessage}
          </VisuallyHidden>
        )}
        {showLoadingState && (
          <LoadingContainer>
            <Spinner colorVariant={getLoadingColorVariant()} />
          </LoadingContainer>
        )}
      </>
    ),
  };

  // Conditionally set href to undefined when [aria-disabled="true"]
  const href = props["aria-disabled"] === "true" ? undefined : props.href;

  return (
    <StyledButton
      {...rest}
      {...sharedProps}
      type={getButtonType(props)}
      href={href}
    />
  );
};

const Button = React.forwardRef((props, ref) => (
  // @ts-expect-error - I'm not sure how to fix the ref type
  <BaseButton {...props} ref={ref} />
)) as unknown as typeof BaseButton;

export default Button;
