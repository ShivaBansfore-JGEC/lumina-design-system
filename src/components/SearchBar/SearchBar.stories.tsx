import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
    title: 'Components/SearchBar',
    component: SearchBar,
    argTypes: {
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
        clearable: {
            control: 'boolean',
        },
        loading: {
            control: 'boolean',
        },
        error: {
            control: 'text',
        },
        helperText: {
            control: 'text',
        },
    },
    parameters: {
        layout: 'centered',
    },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

// Basic SearchBar
export const SearchBarComponent: Story = {
    args: {
        placeholder: 'Search...',
        value: '',
    },
    render: (args) => {
        const [value, setValue] = useState('');
        return (
            <SearchBar
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        );
    },
};

// Sizes
export const Small: Story = {
    args: {
        ...SearchBarComponent.args,
        size: 'small',
    },
    render: SearchBarComponent.render,
};

export const Medium: Story = {
    args: {
        ...SearchBarComponent.args,
        size: 'medium',
    },
    render: SearchBarComponent.render,
};

export const Large: Story = {
    args: {
        ...SearchBarComponent.args,
        size: 'large',
    },
    render: SearchBarComponent.render,
};

// Variants
export const Outlined: Story = {
    args: {
        ...SearchBarComponent.args,
        variant: 'outlined',
    },
    render: SearchBarComponent.render,
};

export const Filled: Story = {
    args: {
        ...SearchBarComponent.args,
        variant: 'filled',
    },
    render: SearchBarComponent.render,
};

export const Underlined: Story = {
    args: {
        ...SearchBarComponent.args,
        variant: 'underlined',
    },
    render: SearchBarComponent.render,
};

// Shapes
export const Rounded: Story = {
    args: {
        ...SearchBarComponent.args,
        shape: 'rounded',
    },
    render: SearchBarComponent.render,
};

export const Pill: Story = {
    args: {
        ...SearchBarComponent.args,
        shape: 'pill',
    },
    render: SearchBarComponent.render,
};

export const Square: Story = {
    args: {
        ...SearchBarComponent.args,
        shape: 'square',
    },
    render: SearchBarComponent.render,
};

// States
export const WithValue: Story = {
    args: {
        ...SearchBarComponent.args,
    },
    render: (args) => {
        const [value, setValue] = useState('Search query');
        return (
            <SearchBar
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        );
    },
};

export const Disabled: Story = {
    args: {
        ...SearchBarComponent.args,
        disabled: true,
        value: 'Disabled search',
    },
};

export const Loading: Story = {
    args: {
        ...SearchBarComponent.args,
        loading: true,
        value: 'Loading...',
    },
};

export const WithError: Story = {
    args: {
        ...SearchBarComponent.args,
        error: 'This field is required',
    },
    render: SearchBarComponent.render,
};

export const WithHelperText: Story = {
    args: {
        ...SearchBarComponent.args,
        helperText: 'Enter your search query',
    },
    render: SearchBarComponent.render,
};

// Custom icon
export const WithCustomIcon: Story = {
    args: {
        ...SearchBarComponent.args,
        icon: (
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    render: SearchBarComponent.render,
};

// Not clearable
export const NotClearable: Story = {
    args: {
        ...SearchBarComponent.args,
        clearable: false,
        value: 'Cannot clear this',
    },
    render: (args) => {
        const [value, setValue] = useState('Cannot clear this');
        return (
            <SearchBar
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        );
    },
};

// With onSearch callback
export const WithSearchCallback: Story = {
    args: {
        ...SearchBarComponent.args,
        placeholder: 'Type and press Enter to search',
    },
    render: (args) => {
        const [value, setValue] = useState('');
        const [searchResult, setSearchResult] = useState('');

        const handleSearch = (searchValue: string) => {
            setSearchResult(`Searching for: ${searchValue}`);
            // In a real app, you would perform the search here
        };

        return (
            <div style={{ width: '300px' }}>
                <SearchBar
                    {...args}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onSearch={handleSearch}
                />
                {searchResult && (
                    <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                        {searchResult}
                    </div>
                )}
            </div>
        );
    },
};