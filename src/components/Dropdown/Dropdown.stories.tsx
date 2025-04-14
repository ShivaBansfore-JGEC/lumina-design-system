import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Dropdown, { DropdownItem, DropdownProps } from './Dropdown';
import './Dropdown.scss';

const meta: Meta<typeof Dropdown> = {
    title: 'Components/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        triggerVariant: {
            control: 'select',
            options: ['default', 'button', 'icon', 'custom'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
        variant: {
            control: 'select',
            options: ['outlined', 'filled', 'underlined'],
        },
        shape: {
            control: 'select',
            options: ['rounded', 'pill', 'square'],
        },
        multiple: {
            control: 'boolean',
        },
        searchable: {
            control: 'boolean',
        },
        clearable: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
        error: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const items: DropdownItem[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
];

const itemsWithIcons: DropdownItem[] = [
    { value: '1', label: 'Profile', icon: 'user' },
    { value: '2', label: 'Settings', icon: 'settings' },
    { value: '3', label: 'Messages', icon: 'mail' },
    { value: '4', label: 'Notifications', icon: 'bell' },
];

const itemsWithSubmenu: DropdownItem[] = [
    {
        value: '1',
        label: 'Option 1',
        children: [
            { value: '1.1', label: 'Suboption 1.1' },
            { value: '1.2', label: 'Suboption 1.2' },
        ],
    },
    {
        value: '2',
        label: 'Option 2',
        children: [
            { value: '2.1', label: 'Suboption 2.1' },
            { value: '2.2', label: 'Suboption 2.2' },
        ],
    },
];

export const Default: Story = {
    args: {
        items,
        placeholder: 'Select an option',
    },
};

export const WithIcons: Story = {
    args: {
        items: itemsWithIcons,
        placeholder: 'Select an option',
    },
};

export const WithSubmenu: Story = {
    args: {
        items: itemsWithSubmenu,
        placeholder: 'Select an option',
    },
};

export const Multiple: Story = {
    args: {
        items,
        placeholder: 'Select options',
        multiple: true,
    },
};

export const Searchable: Story = {
    args: {
        items,
        placeholder: 'Search and select',
        searchable: true,
    },
};

export const Clearable: Story = {
    args: {
        items,
        placeholder: 'Select an option',
        clearable: true,
    },
};

export const Disabled: Story = {
    args: {
        items,
        placeholder: 'Select an option',
        disabled: true,
    },
};

export const Error: Story = {
    args: {
        items,
        placeholder: 'Select an option',
        error: true,
        helperText: 'This field is required',
    },
};

export const Small: Story = {
    args: {
        items,
        placeholder: 'Select an option',
        size: 'small',
    },
};

export const Large: Story = {
    args: {
        items,
        placeholder: 'Select an option',
        size: 'large',
    },
};

export const Outlined: Story = {
    args: {
        items,
        placeholder: 'Select an option',
        variant: 'outlined',
    },
};

export const Filled: Story = {
    args: {
        items,
        placeholder: 'Select an option',
        variant: 'filled',
    },
};

export const Underlined: Story = {
    args: {
        items,
        placeholder: 'Select an option',
        variant: 'underlined',
    },
};

export const Rounded: Story = {
    args: {
        items,
        placeholder: 'Select an option',
        shape: 'rounded',
    },
};

export const Pill: Story = {
    args: {
        items,
        placeholder: 'Select an option',
        shape: 'pill',
    },
};

export const Square: Story = {
    args: {
        items,
        placeholder: 'Select an option',
        shape: 'square',
    },
};

export const ButtonTrigger: Story = {
    args: {
        items,
        placeholder: 'Select an option',
        triggerVariant: 'button',
        triggerContent: 'Click to open',
    },
};

export const IconTrigger: Story = {
    args: {
        items,
        placeholder: 'Select an option',
        triggerVariant: 'icon',
        triggerIcon: 'settings',
    },
};

export const CustomTrigger: Story = {
    args: {
        items,
        placeholder: 'Select an option',
        triggerVariant: 'custom',
        triggerContent: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Custom Trigger</span>
            </div>
        ),
    },
};

// Interactive example with state management
const InteractiveTemplate = (args: DropdownProps) => {
    const [singleValue, setSingleValue] = useState<string>('');
    const [multipleValue, setMultipleValue] = useState<string[]>([]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Dropdown
                {...args}
                items={items}
                value={singleValue}
                onChange={(newValue) => setSingleValue(newValue as string)}
                placeholder="Single select"
            />
            <Dropdown
                {...args}
                items={items}
                value={multipleValue}
                onChange={(newValue) => setMultipleValue(newValue as string[])}
                placeholder="Multiple select"
                multiple
            />
        </div>
    );
};

export const Interactive: Story = {
    render: InteractiveTemplate,
    args: {
        searchable: true,
        clearable: true,
    },
}; 