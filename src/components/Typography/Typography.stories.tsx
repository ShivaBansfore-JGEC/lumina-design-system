import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./Typography";

const meta: Meta<typeof Typography> = {
    title: "Components/Typography",
    component: Typography,
    argTypes: {},
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
    args: {
        children: `jdslkjafkd sak
        dsklajf dsjk ds dsa fl;ds
        <br/> kdlsjak fjkdlsa fdsjaf sajfjsak `,
        type: "heading-1"
    },
};