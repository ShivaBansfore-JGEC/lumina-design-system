import type { Meta, StoryObj } from "@storybook/react";
import Options from "./Option";


const meta: Meta<typeof Options> = {
    title: "Components/Options",
    component: Options,
    argTypes: {},
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof Options>;

export const OptionsComponent: Story = {
    args: {

    },
};