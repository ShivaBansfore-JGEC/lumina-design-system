

import type { Meta, StoryObj } from "@storybook/react";
import OtpForm from "./OtpForm";

const meta: Meta<typeof OtpForm> = {
    title: "Components/OtpForm",
    component: OtpForm,
    argTypes: {},
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof OtpForm>;

export const OtpInput: Story = {
    args: {
        length: 6
    },
};