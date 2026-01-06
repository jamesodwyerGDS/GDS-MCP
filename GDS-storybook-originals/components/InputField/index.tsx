"use client";
import * as React from "react";
import mergeRefs from "../../utils/mergeRefs";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import {
  InputField as _InputField,
  Label as _Label,
  Row,
  Input as _Input,
  Textarea as _Textarea,
  Select as _Select,
  Validation as _Validation,
  HiddenCheckbox,
  CustomCheckbox,
  Checkmark,
  IndeterminateMark,
  HiddenRadio,
  CustomRadio,
  StartIcon,
  EndIcon,
} from "./index.styles";

const InputContext = React.createContext<string | null | undefined | false>(
  undefined,
);

function useInputContext() {
  const id = React.useContext(InputContext);
  if (!id && id !== false)
    throw new Error("Must be rendered inside an <InputField> with an ID");
  return id;
}

type OwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
  id: string | false;
};

type Props<E extends React.ElementType> = OwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof OwnProps>;

const InputField = React.forwardRef(function InputField<
  E extends React.ElementType = "div",
>({ id, ...rest }: Props<E>, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <InputContext.Provider value={id}>
      <_InputField id={id !== false ? id : undefined} {...rest} ref={ref} />
    </InputContext.Provider>
  );
});

type LabelOwnProps<E extends React.ElementType> = {
  as?: E;
  disabled?: boolean;
  readOnly?: boolean;
};

type LabelProps<E extends React.ElementType> = LabelOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof LabelOwnProps<E>>;

function Label<E extends React.ElementType = "label">({
  readOnly,
  ...restProps
}: LabelProps<E>) {
  const id = useInputContext();
  // I could not make TypeScript happy without this type assertion
  const rest = restProps as LabelProps<"label">;
  return (
    <_Label
      $readOnly={readOnly}
      {...rest}
      htmlFor={id !== false ? id + "-input" : undefined}
    />
  );
}

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  inputRef?: React.Ref<HTMLInputElement>;
  isErrored?: boolean;
  isReadonlyDropdown?: boolean;
  hasExtraPadding?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { inputRef, isErrored, hasExtraPadding, ...props },
  ref,
) {
  const id = useInputContext();
  const errorId = id !== false ? id + "-error" : undefined;
  const successId = id !== false ? id + "-success" : undefined;
  const describedBy = [errorId, successId, props["aria-describedby"]]
    .filter(Boolean)
    .join(" ");

  return (
    <_Input
      $hasExtraPadding={hasExtraPadding}
      $isErrored={isErrored}
      aria-invalid={isErrored}
      {...props}
      ref={inputRef || ref}
      id={id !== false ? id + "-input" : undefined}
      aria-describedby={describedBy}
    />
  );
});

type TextareaProps = React.ComponentPropsWithoutRef<"textarea"> & {
  borderColor?: string;
  isErrored?: boolean;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    const id = useInputContext();
    const errorId = id !== false ? id + "-error" : undefined;
    const successId = id !== false ? id + "-success" : undefined;
    const describedBy = [errorId, successId, props["aria-describedby"]]
      .filter(Boolean)
      .join(" ");
    return (
      <_Textarea
        aria-invalid={props.isErrored}
        $isErrored={props.isErrored}
        {...props}
        ref={ref}
        id={id !== false ? id + "-input" : undefined}
        aria-describedby={describedBy}
      />
    );
  },
);

type SelectProps = React.ComponentPropsWithoutRef<"select"> & {
  isErrored?: boolean;
  isPillVariant?: boolean;
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { isErrored, isPillVariant, ...restProps },
  ref,
) {
  const id = useInputContext();
  const errorId = id !== false ? id + "-error" : undefined;
  const describedBy = [errorId, restProps["aria-describedby"]]
    .filter(Boolean)
    .join(" ");
  return (
    <_Select
      aria-invalid={isErrored}
      $isErrored={isErrored}
      $isPillVariant={isPillVariant}
      {...restProps}
      ref={ref}
      id={id !== false ? id + "-input" : undefined}
      aria-describedby={describedBy}
    />
  );
});

type CheckboxProps = React.ComponentPropsWithoutRef<"input"> & {
  isIndeterminate?: boolean;
  isErrored?: boolean;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ isErrored, ...restProps }, propsRef) {
    const localRef = React.useRef<HTMLInputElement>(null);
    const id = useInputContext();
    const errorId = id !== false ? id + "-error" : undefined;
    const describedBy = [errorId, restProps["aria-describedby"]]
      .filter(Boolean)
      .join(" ");

    React.useEffect(() => {
      const checkbox = localRef.current;
      if (checkbox) {
        checkbox.indeterminate = restProps.isIndeterminate ? true : false;
      }
    }, [restProps.isIndeterminate]);

    return (
      <>
        <HiddenCheckbox
          type="checkbox"
          aria-invalid={isErrored}
          $isErrored={isErrored}
          {...restProps}
          id={id !== false ? id + "-input" : undefined}
          aria-describedby={describedBy}
          ref={mergeRefs([localRef, propsRef])}
        />

        <CustomCheckbox>
          {/* Don't use rem as Safari doesn't support it */}
          <Checkmark size="73%" />
          <IndeterminateMark size="73%" />
        </CustomCheckbox>
      </>
    );
  },
);

type Radio = React.ComponentPropsWithoutRef<"input"> & {
  isErrored?: boolean;
};

const Radio = React.forwardRef<HTMLInputElement, Radio>(function Radio(
  { isErrored, ...restProps },
  ref,
) {
  const id = useInputContext();
  const errorId = id !== false ? id + "-error" : undefined;
  const describedBy = [errorId, restProps["aria-describedby"]]
    .filter(Boolean)
    .join(" ");
  return (
    <>
      <HiddenRadio
        type="radio"
        $isErrored={isErrored}
        {...restProps}
        ref={ref}
        id={id !== false ? id + "-input" : undefined}
        aria-describedby={describedBy}
      />
      <CustomRadio />
    </>
  );
});

type ValidationProps = {
  id?: string;
  children?: React.ReactNode;
  /** Visually hidden prefix announced to screen readers before the error message (e.g., "Error: "). */
  screenReaderErrorPrefix: string;
  type?: "error" | "success";
};

function Validation({ type = "error", ...props }: ValidationProps) {
  const id = useInputContext();
  // this component must be able to accept an id when the InputContext id is disabled using id={false}
  return (
    <_Validation {...props} id={id !== false ? id + `-${type}` : props.id}>
      {type === "error" ? (
        <ErrorMessage screenReaderErrorPrefix={props.screenReaderErrorPrefix}>
          {props.children}
        </ErrorMessage>
      ) : (
        <SuccessMessage>{props.children}</SuccessMessage>
      )}
    </_Validation>
  );
}

export default Object.assign(InputField, {
  Label: Label,
  Row: Row,
  Input: Input,
  Textarea: Textarea,
  Select: Select,
  Checkbox: Checkbox,
  Radio: Radio,
  StartIcon: StartIcon,
  EndIcon: EndIcon,
  Validation: Validation,
});
