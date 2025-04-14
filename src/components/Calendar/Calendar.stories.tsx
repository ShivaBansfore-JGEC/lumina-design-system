import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';
import { format } from 'date-fns';

const meta: Meta<typeof Calendar> = {
    title: 'Components/Calendar',
    component: Calendar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        mode: {
            control: 'select',
            options: ['single', 'range'],
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
        disabled: {
            control: 'boolean',
        },
        error: {
            control: 'boolean',
        },
        required: {
            control: 'boolean',
        },
        helperText: {
            control: 'text',
        },
        errorText: {
            control: 'text',
        },
        label: {
            control: 'text',
        },
        placeholder: {
            control: 'text',
        },
        minDate: {
            control: 'date',
        },
        maxDate: {
            control: 'date',
        },
        disabledDates: {
            control: 'object',
        },
        disabledDays: {
            control: 'object',
        },
        firstDayOfWeek: {
            control: 'select',
            options: [0, 1],
        },
        locale: {
            control: 'text',
        },
        format: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Default story
export const Default: Story = {
    args: {
        placeholder: 'Select date',
    },
};

// With label
export const WithLabel: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
    },
};

// Required
export const Required: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
        required: true,
    },
};

// With helper text
export const WithHelperText: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
        helperText: 'Please select a date',
    },
};

// With error
export const WithError: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
        error: true,
        errorText: 'Please select a valid date',
    },
};

// Disabled
export const Disabled: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
        disabled: true,
    },
};

// Date range with Apply button
export const DateRange: Story = {
    args: {
        label: 'Date Range',
        placeholder: 'Select date range',
        mode: 'range',
    },
};

// With min and max dates
export const WithMinMaxDates: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
        minDate: new Date(2024, 0, 1),
        maxDate: new Date(2024, 11, 31),
    },
};

// With disabled dates
export const WithDisabledDates: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
        disabledDates: [
            new Date(2024, 0, 1),
            new Date(2024, 0, 2),
            new Date(2024, 0, 3),
        ],
    },
};

// With disabled days
export const WithDisabledDays: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
        disabledDays: [0, 6], // Disable weekends
    },
};

// Small size
export const Small: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
        size: 'small',
    },
};

// Large size
export const Large: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
        size: 'large',
    },
};

// Filled variant
export const Filled: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
        variant: 'filled',
    },
};

// Underlined variant
export const Underlined: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
        variant: 'underlined',
    },
};

// Pill shape
export const Pill: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
        shape: 'pill',
    },
};

// Square shape
export const Square: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
        shape: 'square',
    },
};

// With custom format
export const WithCustomFormat: Story = {
    args: {
        label: 'Date',
        placeholder: 'Select date',
        format: 'MMM dd, yyyy',
    },
};

// Interactive example with date range and Apply button
const InteractiveTemplate = (args: any) => {
    const [value, setValue] = React.useState<Date | [Date, Date] | null>(null);
    const [tempValue, setTempValue] = React.useState<string>('None');

    return (
        <div style={{ width: '300px' }}>
            <Calendar
                {...args}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    if (Array.isArray(newValue)) {
                        setTempValue(`${format(newValue[0], 'MMM dd, yyyy')} - ${format(
                            newValue[1],
                            'MMM dd, yyyy'
                        )}`);
                    } else {
                        setTempValue(format(newValue, 'MMM dd, yyyy'));
                    }
                    console.log('Selected date(s):', newValue);
                }}
            />
            <div style={{ marginTop: '16px' }}>
                <strong>Selected value:</strong> {tempValue}
            </div>
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                {args.mode === 'range' && (
                    <p>
                        <strong>Note:</strong> In range mode, select a start date, then an end date,
                        and click the Apply button to confirm your selection.
                    </p>
                )}
            </div>
        </div>
    );
};

export const Interactive: Story = {
    render: InteractiveTemplate,
    args: {
        label: 'Date Range',
        placeholder: 'Select date range',
        mode: 'range',
    },
}; 