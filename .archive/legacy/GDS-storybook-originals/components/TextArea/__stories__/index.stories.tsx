import { Meta, StoryObj } from "@storybook/react-webpack5";
import TextArea from "..";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: "Components/TextArea",
  args: {
    id: "textarea-story",
    label: "Put some information in here",
    rows: 3,
    placeholder: "",
    disabled: false,
    readOnly: false,
    required: true,
    screenReaderErrorPrefix: "",
    errorMessage: "",
    "aria-describedby": "otherComponent",
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Some placeholder text",
  },
};

/**
 * Passing the `disabled` prop to the component will make the textarea unusable and un-clickable. The textarea will also be ignored by most screen readers.
 */
export const Disabled: Story = {
  args: {
    defaultValue: "This textarea is disabled",
    disabled: true,
  },
};

/**
 * `errorMessage` displays an inline validation message.
 * `screenReaderErrorPrefix` is a visually hidden prefix announced to screen readers before the error message (e.g., "Error: ").
 *
 * #### Form Validation
 * For guidance on validation patterns, error messages (`screenReaderErrorPrefix`, `errorMessage`) , accessibility, and recommended ARIA usage when displaying validation errors, see [Form Validation](?path=/docs/patterns-form-validation--docs) under the **Patterns** section.
 */
export const WithError: Story = {
  args: {
    screenReaderErrorPrefix: "Error:",
    errorMessage: "This is an error message",
  },
};

/**
 * The component can be passed the `readOnly` prop that is visually identical to the `disabled` prop except it can be read out by a screen reader as just text. Useful in cases where you would need to disable the textarea but still want the value to be read out.
 */
export const ReadOnly: Story = {
  args: {
    value: "This textarea is read-only",
    readOnly: true,
  },
};

export const RTL: Story = {
  globals: {
    addonRtl: "rtl",
  },
};
