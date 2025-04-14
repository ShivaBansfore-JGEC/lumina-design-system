import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import './Checkbox.scss';

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Size of the checkbox',
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            description: 'Color variant of the checkbox',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the checkbox',
        },
        error: {
            control: 'boolean',
            description: 'Show error state',
        },
        helperText: {
            control: 'text',
            description: 'Helper text',
        },
        errorText: {
            control: 'text',
            description: 'Error message',
        },
        label: {
            control: 'text',
            description: 'Label text',
        },
        indeterminate: {
            control: 'boolean',
            description: 'Show indeterminate state',
        },
        onChange: {
            action: 'onChange',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        label: 'Checkbox',
    },
};

export const Checked: Story = {
    args: {
        ...Default.args,
        checked: true,
    },
};

export const Indeterminate: Story = {
    args: {
        ...Default.args,
        indeterminate: true,
    },
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        ...Default.args,
        disabled: true,
        checked: true,
    },
};

export const WithHelperText: Story = {
    args: {
        ...Default.args,
        helperText: 'This is a helper text',
    },
};

export const WithError: Story = {
    args: {
        ...Default.args,
        error: true,
        errorText: 'This field is required',
    },
};

export const Small: Story = {
    args: {
        ...Default.args,
        size: 'small',
    },
};

export const Large: Story = {
    args: {
        ...Default.args,
        size: 'large',
    },
};

export const Primary: Story = {
    args: {
        ...Default.args,
        variant: 'primary',
        checked: true,
    },
};

export const Secondary: Story = {
    args: {
        ...Default.args,
        variant: 'secondary',
        checked: true,
    },
};

export const Success: Story = {
    args: {
        ...Default.args,
        variant: 'success',
        checked: true,
    },
};

export const Danger: Story = {
    args: {
        ...Default.args,
        variant: 'danger',
        checked: true,
    },
};

export const Warning: Story = {
    args: {
        ...Default.args,
        variant: 'warning',
        checked: true,
    },
};

export const Info: Story = {
    args: {
        ...Default.args,
        variant: 'info',
        checked: true,
    },
};

// Interactive example with state management
const InteractiveTemplate = (args: any) => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (newChecked: boolean) => {
        setChecked(newChecked);
    };

    return (
        <Checkbox
            {...args}
            checked={checked}
            onChange={handleChange}
        />
    );
};

export const Interactive: Story = {
    render: InteractiveTemplate,
    args: {
        ...Default.args,
    },
};

// Group of checkboxes
export const Group: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Checkbox label="Option 1" />
            <Checkbox label="Option 2" />
            <Checkbox label="Option 3" />
            <Checkbox label="Option 4" disabled />
            <Checkbox label="Option 5" checked />
        </div>
    ),
};

// Different sizes
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Checkbox label="Small" size="small" />
            <Checkbox label="Medium" size="medium" />
            <Checkbox label="Large" size="large" />
        </div>
    ),
};

// Different variants
export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Checkbox label="Primary" variant="primary" checked />
            <Checkbox label="Secondary" variant="secondary" checked />
            <Checkbox label="Success" variant="success" checked />
            <Checkbox label="Danger" variant="danger" checked />
            <Checkbox label="Warning" variant="warning" checked />
            <Checkbox label="Info" variant="info" checked />
        </div>
    ),
};

// States
export const States: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Checkbox label="Default" />
            <Checkbox label="Checked" checked />
            <Checkbox label="Indeterminate" indeterminate />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Disabled Checked" disabled checked />
            <Checkbox label="Error" error errorText="This field is required" />
            <Checkbox label="With Helper" helperText="This is a helper text" />
        </div>
    ),
}; 