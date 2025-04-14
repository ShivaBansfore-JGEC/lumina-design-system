import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        variant: {
            control: 'select',
            options: ['outlined', 'filled', 'underlined'],
        },
        disabled: {
            control: 'boolean',
        },
        loading: {
            control: 'boolean',
        },
        clearable: {
            control: 'boolean',
        },
        fullWidth: {
            control: 'boolean',
        },
        animateLabel: {
            control: 'boolean',
        },
        showCount: {
            control: 'boolean',
        },
        maxCount: {
            control: 'number',
        },
        showPasswordToggle: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Basic Input
export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
    },
};

// With Label
export const WithLabel: Story = {
    args: {
        label: 'Username',
        placeholder: 'Enter username...',
    },
};

// With Helper Text
export const WithHelperText: Story = {
    args: {
        label: 'Password',
        type: 'password',
        helperText: 'Must be at least 8 characters long',
    },
};

// With Error
export const WithError: Story = {
    args: {
        label: 'Email',
        type: 'email',
        error: 'Please enter a valid email address',
    },
};

// With Success
export const WithSuccess: Story = {
    args: {
        label: 'Username',
        value: 'johndoe',
        success: 'Username is available',
    },
};

// With Icons
export const WithIcons: Story = {
    args: {
        label: 'Search',
        placeholder: 'Search...',
        startIcon: '🔍',
        endIcon: '✕',
    },
};

// With Prefix and Suffix
export const WithAffixes: Story = {
    args: {
        label: 'Price',
        inputPrefix: '$',
        inputSuffix: 'USD',
        type: 'number',
    },
};

// Password Input with Toggle
export const PasswordInput: Story = {
    args: {
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password...',
        showPasswordToggle: true,
    },
};

// Password Input without Toggle
export const PasswordInputNoToggle: Story = {
    args: {
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password...',
        showPasswordToggle: false,
    },
};

// Loading State
export const Loading: Story = {
    args: {
        label: 'Loading',
        loading: true,
        placeholder: 'Loading...',
    },
};

// Disabled State
export const Disabled: Story = {
    args: {
        label: 'Disabled',
        disabled: true,
        value: 'Cannot edit this',
    },
};

// Clearable
export const Clearable: Story = {
    args: {
        label: 'Clearable',
        clearable: true,
        placeholder: 'Type something...',
    },
};

// Character Count
export const WithCharacterCount: Story = {
    args: {
        label: 'Bio',
        showCount: true,
        maxCount: 100,
        placeholder: 'Write something about yourself...',
    },
};

// Different Sizes
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input size="sm" placeholder="Small input" />
            <Input size="md" placeholder="Medium input" />
            <Input size="lg" placeholder="Large input" />
        </div>
    ),
};

// Different Variants
export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input variant="outlined" placeholder="Outlined input" />
            <Input variant="filled" placeholder="Filled input" />
            <Input variant="underlined" placeholder="Underlined input" />
        </div>
    ),
};

// Full Width
export const FullWidth: Story = {
    args: {
        label: 'Full Width Input',
        fullWidth: true,
        placeholder: 'This input takes full width...',
    },
};

// Interactive Example
export const Interactive: Story = {
    args: {
        label: 'Interactive Input',
        placeholder: 'Try typing something...',
        clearable: true,
        showCount: true,
        maxCount: 50,
    },
};

// All Features Combined
export const AllFeatures: Story = {
    args: {
        label: 'All Features',
        placeholder: 'Try all features...',
        startIcon: '🔍',
        clearable: true,
        showCount: true,
        maxCount: 50,
        helperText: 'This input has all features enabled',
    },
}; 