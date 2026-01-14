import { Meta } from "@storybook/react-webpack5";
import Footer from "..";

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: "Components/Footer",
  args: { children: "Children" },
};

export default meta;

export const Basic = {};

export const RTL = {
  globals: {
    addonRtl: "rtl",
  },
};
