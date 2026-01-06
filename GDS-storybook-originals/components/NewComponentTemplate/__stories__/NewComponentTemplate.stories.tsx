import { Meta, StoryObj } from "@storybook/react-webpack5";
import NewComponentTemplate from "../NewComponentTemplate";

const meta = {
  component: NewComponentTemplate,
  title: "Components/NewComponentTemplate",
  args: {
    showMe: true,
  },
  tags: ["beta"],
} satisfies Meta<typeof NewComponentTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

/** TODO: Add description of basic usage of NewComponentTemplate here */
export const Basic = {} satisfies Story;
