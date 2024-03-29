import type { Meta, StoryObj } from "@storybook/react";
import TypeHead from "./TypeHead";
import { TYPEHEAD_DEFAULT_PROPS } from "./constant";

const meta: Meta<typeof TypeHead> = {
  title: "Components/TypeHead",
  component: TypeHead,
  argTypes: {},
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof TypeHead>;

export const Typehead: Story = {
  args: TYPEHEAD_DEFAULT_PROPS,
};