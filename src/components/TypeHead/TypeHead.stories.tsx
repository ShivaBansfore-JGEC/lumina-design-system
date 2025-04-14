import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TypeHead from './TypeHead';
import { SuggestionItem } from './Suggestion';

const meta: Meta<typeof TypeHead> = {
  title: 'Components/TypeHead',
  component: TypeHead,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
    limit: {
      control: 'number',
    },
    placeholder: {
      control: 'text',
    },
    groupByCategory: {
      control: 'boolean',
    },
    showDescriptions: {
      control: 'boolean',
    },
    showIcons: {
      control: 'boolean',
    },
    highlightMatches: {
      control: 'boolean',
    },
    showNoResults: {
      control: 'boolean',
    },
    keyboardNavigation: {
      control: 'boolean',
    },
    showFooter: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TypeHead>;

// Sample data
const sampleItems: SuggestionItem[] = [
  {
    id: 1,
    label: 'JavaScript',
    description: 'Programming Language',
    category: 'Languages',
    onClick: () => console.log('JavaScript clicked')
  },
  {
    id: 2,
    label: 'TypeScript',
    description: 'Typed JavaScript',
    category: 'Languages',
    onClick: () => console.log('TypeScript clicked')
  },
  {
    id: 3,
    label: 'React',
    description: 'UI Library',
    category: 'Frameworks',
    onClick: () => console.log('React clicked')
  },
  {
    id: 4,
    label: 'Vue',
    description: 'Progressive Framework',
    category: 'Frameworks',
    onClick: () => console.log('Vue clicked')
  },
  {
    id: 5,
    label: 'Angular',
    description: 'Full-featured Framework',
    category: 'Frameworks',
    onClick: () => console.log('Angular clicked')
  },
  {
    id: 6,
    label: 'Node.js',
    description: 'Runtime Environment',
    category: 'Platforms',
    onClick: () => console.log('Node.js clicked')
  },
  {
    id: 7,
    label: 'Express',
    description: 'Web Framework',
    category: 'Frameworks',
    onClick: () => console.log('Express clicked')
  },
  {
    id: 8,
    label: 'MongoDB',
    description: 'NoSQL Database',
    category: 'Databases',
    onClick: () => console.log('MongoDB clicked')
  },
  {
    id: 9,
    label: 'PostgreSQL',
    description: 'SQL Database',
    category: 'Databases',
    onClick: () => console.log('PostgreSQL clicked')
  },
  {
    id: 10,
    label: 'Docker',
    description: 'Container Platform',
    category: 'DevOps',
    onClick: () => console.log('Docker clicked')
  },
];

// Default TypeHead
export const Default: Story = {
  args: {
    placeholder: 'Search...',
    listItems: sampleItems,
    limit: 5,
    onSearchChange: (e) => console.log('Search changed:', e.target.value),
  },
};

// Size Variants
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

// Shape Variants
export const Pill: Story = {
  args: {
    ...Default.args,
    shape: 'pill',
  },
};

export const Square: Story = {
  args: {
    ...Default.args,
    shape: 'square',
  },
};

// Style Variants
export const Filled: Story = {
  args: {
    ...Default.args,
    variant: 'filled',
  },
};

export const Underlined: Story = {
  args: {
    ...Default.args,
    variant: 'underlined',
  },
};

// With Footer
export const WithFooter: Story = {
  args: {
    ...Default.args,
    showFooter: true,
    footer: <div style={{ padding: '8px 16px', textAlign: 'center' }}>Press Enter to search</div>,
  },
};

// With Limit
export const WithLimit: Story = {
  args: {
    ...Default.args,
    limit: 3,
  },
};

// With Categories
export const WithCategories: Story = {
  args: {
    ...Default.args,
    groupByCategory: true,
  },
};

// Interactive Example
export const Interactive: Story = {
  render: (args) => {
    const [searchValue, setSearchValue] = useState('');
    return (
      <div style={{ width: '300px' }}>
        <TypeHead
          {...args}
          onSearchChange={(e) => setSearchValue(e.target.value)}
          listItems={sampleItems}
        />
        <div style={{ marginTop: '16px', fontSize: '14px' }}>
          Search value: {searchValue || 'None'}
        </div>
      </div>
    );
  },
};