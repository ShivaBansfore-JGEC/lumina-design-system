import React from 'react';
import type { Meta, StoryObj } from "@storybook/react";
import Popover from "./Popover";
import Button from "../Button";

const meta: Meta<typeof Popover> = {
    title: "Components/Popover",
    component: Popover,
    argTypes: {
        position: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
        },
        defaultOpen: {
            control: 'boolean',
        },
        closeOnClickOutside: {
            control: 'boolean',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
    args: {
        trigger: <Button label="Click me" />,
        children: <div>This is a popover content</div>,
        position: 'bottom',
    },
};

export const TopPosition: Story = {
    args: {
        trigger: <Button label="Top Popover" />,
        children: <div>This appears above the trigger</div>,
        position: 'top',
    },
};

export const WithCustomContent: Story = {
    args: {
        trigger: <Button label="Custom Content" />,
        children: (
            <div style={{ padding: '16px' }}>
                <h3>Custom Popover</h3>
                <p>This is a more complex popover with custom styling.</p>
                <Button label="Action Button" />
            </div>
        ),
        position: 'bottom',
    },
};