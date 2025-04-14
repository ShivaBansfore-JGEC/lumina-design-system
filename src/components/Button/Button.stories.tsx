import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    argTypes: {
        buttonType: {
            control: "select",
            options: ["primary", "secondary", "tertiary", "danger", "success", "warning", "info"],
        },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
        },
        variant: {
            control: "select",
            options: ["solid", "outline", "text", "ghost"],
        },
        textColor: { control: "color" },
        backgroundColor: { control: "color" },
        loading: { control: "boolean" },
        disabled: { control: "boolean" },
        fullWidth: { control: "boolean" },
        onClick: { action: "clicked" },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

// Base button
export const Primary: Story = {
    args: {
        label: "Primary Button",
        buttonType: "primary",
        variant: "solid",
        size: "medium",
    },
};

// Size variants
export const Small: Story = {
    args: {
        ...Primary.args,
        size: "small",
        label: "Small Button",
    },
};

export const Large: Story = {
    args: {
        ...Primary.args,
        size: "large",
        label: "Large Button",
    },
};

// Type variants
export const Secondary: Story = {
    args: {
        ...Primary.args,
        buttonType: "secondary",
        label: "Secondary Button",
    },
};

export const Danger: Story = {
    args: {
        ...Primary.args,
        buttonType: "danger",
        label: "Danger Button",
    },
};

export const Success: Story = {
    args: {
        ...Primary.args,
        buttonType: "success",
        label: "Success Button",
    },
};

export const Warning: Story = {
    args: {
        ...Primary.args,
        buttonType: "warning",
        label: "Warning Button",
    },
};

export const Info: Story = {
    args: {
        ...Primary.args,
        buttonType: "info",
        label: "Info Button",
    },
};

// Style variants
export const Outline: Story = {
    args: {
        ...Primary.args,
        variant: "outline",
        label: "Outline Button",
    },
};

export const Text: Story = {
    args: {
        ...Primary.args,
        variant: "text",
        label: "Text Button",
    },
};

export const Ghost: Story = {
    args: {
        ...Primary.args,
        variant: "ghost",
        label: "Ghost Button",
    },
};

// State variants
export const Loading: Story = {
    args: {
        ...Primary.args,
        loading: true,
        label: "Loading Button",
    },
};

export const Disabled: Story = {
    args: {
        ...Primary.args,
        disabled: true,
        label: "Disabled Button",
    },
};

// Full width
export const FullWidth: Story = {
    args: {
        ...Primary.args,
        fullWidth: true,
        label: "Full Width Button",
    },
};

// With icons
export const WithIcons: Story = {
    args: {
        ...Primary.args,
        label: "Button with Icons",
        leftIcon: <span>{"<"}</span>,
        rightIcon: <span>{">"}</span>,
    },
}; 