import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./Typography";

const meta: Meta<typeof Typography> = {
    title: "Components/Typography",
    component: Typography,
    argTypes: {
        variant: {
            control: "select",
            options: [
                "h1", "h2", "h3", "h4", "h5", "h6",
                "subtitle1", "subtitle2", "body1", "body2",
                "caption", "overline", "button"
            ],
        },
        weight: {
            control: "select",
            options: ["light", "regular", "medium", "semibold", "bold"],
        },
        align: {
            control: "select",
            options: ["left", "center", "right", "justify"],
        },
        color: {
            control: "select",
            options: [
                "primary", "secondary", "success", "danger",
                "warning", "info", "light", "dark", "muted", "white"
            ],
        },
        textColor: { control: "color" },
        truncate: { control: "boolean" },
        lines: { control: "number" },
        uppercase: { control: "boolean" },
        lowercase: { control: "boolean" },
        capitalize: { control: "boolean" },
        italic: { control: "boolean" },
        underline: { control: "boolean" },
        strikethrough: { control: "boolean" },
        monospace: { control: "boolean" },
        nowrap: { control: "boolean" },
        wrap: { control: "boolean" },
    },
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof Typography>;

// Heading variants
export const Heading1: Story = {
    args: {
        variant: "h1",
        children: "Heading 1",
    },
};

export const Heading2: Story = {
    args: {
        variant: "h2",
        children: "Heading 2",
    },
};

export const Heading3: Story = {
    args: {
        variant: "h3",
        children: "Heading 3",
    },
};

export const Heading4: Story = {
    args: {
        variant: "h4",
        children: "Heading 4",
    },
};

export const Heading5: Story = {
    args: {
        variant: "h5",
        children: "Heading 5",
    },
};

export const Heading6: Story = {
    args: {
        variant: "h6",
        children: "Heading 6",
    },
};

// Subtitle variants
export const Subtitle1: Story = {
    args: {
        variant: "subtitle1",
        children: "Subtitle 1",
    },
};

export const Subtitle2: Story = {
    args: {
        variant: "subtitle2",
        children: "Subtitle 2",
    },
};

// Body variants
export const Body1: Story = {
    args: {
        variant: "body1",
        children: "Body 1 - This is a paragraph of text that demonstrates the body1 typography style. It's used for the main content of your application.",
    },
};

export const Body2: Story = {
    args: {
        variant: "body2",
        children: "Body 2 - This is a paragraph of text that demonstrates the body2 typography style. It's slightly smaller than body1 and used for secondary content.",
    },
};

// Other variants
export const Caption: Story = {
    args: {
        variant: "caption",
        children: "Caption text",
    },
};

export const Overline: Story = {
    args: {
        variant: "overline",
        children: "Overline text",
    },
};

export const Button: Story = {
    args: {
        variant: "button",
        children: "Button text",
    },
};

// Font weights
export const Light: Story = {
    args: {
        ...Body1.args,
        weight: "light",
        children: "Light weight text",
    },
};

export const Regular: Story = {
    args: {
        ...Body1.args,
        weight: "regular",
        children: "Regular weight text",
    },
};

export const Medium: Story = {
    args: {
        ...Body1.args,
        weight: "medium",
        children: "Medium weight text",
    },
};

export const Semibold: Story = {
    args: {
        ...Body1.args,
        weight: "semibold",
        children: "Semibold weight text",
    },
};

export const Bold: Story = {
    args: {
        ...Body1.args,
        weight: "bold",
        children: "Bold weight text",
    },
};

// Text alignment
export const Left: Story = {
    args: {
        ...Body1.args,
        align: "left",
        children: "Left aligned text",
    },
};

export const Center: Story = {
    args: {
        ...Body1.args,
        align: "center",
        children: "Center aligned text",
    },
};

export const Right: Story = {
    args: {
        ...Body1.args,
        align: "right",
        children: "Right aligned text",
    },
};

export const Justify: Story = {
    args: {
        ...Body1.args,
        align: "justify",
        children: "Justified text that spreads across the full width of the container. This is useful for creating clean, aligned paragraphs.",
    },
};

// Colors
export const Primary: Story = {
    args: {
        ...Body1.args,
        color: "primary",
        children: "Primary colored text",
    },
};

export const Secondary: Story = {
    args: {
        ...Body1.args,
        color: "secondary",
        children: "Secondary colored text",
    },
};

export const Success: Story = {
    args: {
        ...Body1.args,
        color: "success",
        children: "Success colored text",
    },
};

export const Danger: Story = {
    args: {
        ...Body1.args,
        color: "danger",
        children: "Danger colored text",
    },
};

export const Warning: Story = {
    args: {
        ...Body1.args,
        color: "warning",
        children: "Warning colored text",
    },
};

export const Info: Story = {
    args: {
        ...Body1.args,
        color: "info",
        children: "Info colored text",
    },
};

// Text transforms
export const Uppercase: Story = {
    args: {
        ...Body1.args,
        uppercase: true,
        children: "Uppercase text",
    },
};

export const Lowercase: Story = {
    args: {
        ...Body1.args,
        lowercase: true,
        children: "LOWERCASE TEXT",
    },
};

export const Capitalize: Story = {
    args: {
        ...Body1.args,
        capitalize: true,
        children: "capitalized text",
    },
};

// Text decorations
export const Italic: Story = {
    args: {
        ...Body1.args,
        italic: true,
        children: "Italic text",
    },
};

export const Underline: Story = {
    args: {
        ...Body1.args,
        underline: true,
        children: "Underlined text",
    },
};

export const Strikethrough: Story = {
    args: {
        ...Body1.args,
        strikethrough: true,
        children: "Strikethrough text",
    },
};

// Font families
export const Monospace: Story = {
    args: {
        ...Body1.args,
        monospace: true,
        children: "Monospace text",
    },
};

// Text wrapping
export const Nowrap: Story = {
    args: {
        ...Body1.args,
        nowrap: true,
        children: "This text will not wrap to the next line even if it's too long for the container.",
    },
};

// Truncation
export const Truncate: Story = {
    args: {
        ...Body1.args,
        truncate: true,
        children: "This is a very long text that will be truncated with an ellipsis at the end because it's too long for the container.",
    },
};

export const MultiLineTruncate: Story = {
    args: {
        ...Body1.args,
        truncate: true,
        lines: 2,
        children: "This is a very long text that will be truncated after two lines with an ellipsis at the end. This is useful for displaying previews of longer content without taking up too much space. The text continues on and on and would normally wrap to multiple lines, but we're limiting it to just two lines.",
    },
};

// Custom color
export const CustomColor: Story = {
    args: {
        ...Body1.args,
        textColor: "#9c27b0",
        children: "Text with custom color",
    },
};