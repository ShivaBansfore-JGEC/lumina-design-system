import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Accordion from './Accordion';
import { FiChevronDown, FiInfo, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const meta: Meta<typeof Accordion> = {
    title: 'Components/Accordion',
    component: Accordion,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const defaultItems = [
    {
        title: 'Section 1',
        children: <div>Content for section 1</div>,
    },
    {
        title: 'Section 2',
        children: <div>Content for section 2</div>,
    },
    {
        title: 'Section 3',
        children: <div>Content for section 3</div>,
    },
];

export const Default: Story = {
    args: {
        items: defaultItems,
    },
};

export const WithIcons: Story = {
    args: {
        items: [
            {
                title: 'Information',
                children: <div>This is an informational section</div>,
                icon: <FiInfo />,
            },
            {
                title: 'Warning',
                children: <div>This is a warning section</div>,
                icon: <FiAlertCircle />,
            },
            {
                title: 'Success',
                children: <div>This is a success section</div>,
                icon: <FiCheckCircle />,
            },
        ],
    },
};

export const CustomExpandIcon: Story = {
    args: {
        items: defaultItems.map(item => ({
            ...item,
            icon: <FiChevronDown />,
        })),
    },
};

export const Small: Story = {
    args: {
        items: defaultItems,
        size: 'small',
    },
};

export const Large: Story = {
    args: {
        items: defaultItems,
        size: 'large',
    },
};

export const Bordered: Story = {
    args: {
        items: defaultItems,
        variant: 'bordered',
    },
};

export const Separated: Story = {
    args: {
        items: defaultItems,
        variant: 'separated',
    },
};

export const Minimal: Story = {
    args: {
        items: defaultItems,
        variant: 'minimal',
    },
};

export const IconLeft: Story = {
    args: {
        items: defaultItems.map(item => ({
            ...item,
            icon: <FiInfo />,
        })),
        iconPosition: 'left',
    },
};

export const Disabled: Story = {
    args: {
        items: [
            ...defaultItems,
            {
                title: 'Disabled Section',
                children: <div>This section is disabled</div>,
                disabled: true,
            },
        ],
    },
};

export const Controlled: Story = {
    render: () => {
        const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
        return (
            <Accordion
                items={defaultItems}
                onChange={setExpandedIndices}
            />
        );
    },
};

export const Animated: Story = {
    args: {
        items: defaultItems,
        animated: true,
    },
};

export const RichContent: Story = {
    args: {
        items: [
            {
                title: 'Rich Content Example',
                children: (
                    <div style={{ padding: '16px' }}>
                        <h3>Welcome to our documentation</h3>
                        <p>This is an example of rich content inside an accordion item.</p>
                        <ul>
                            <li>Feature 1</li>
                            <li>Feature 2</li>
                            <li>Feature 3</li>
                        </ul>
                    </div>
                ),
            },
            {
                title: 'Another Rich Section',
                children: (
                    <div style={{ padding: '16px' }}>
                        <img
                            src="https://via.placeholder.com/300x200"
                            alt="Example"
                            style={{ maxWidth: '100%', marginBottom: '16px' }}
                        />
                        <p>This section includes an image and some text content.</p>
                    </div>
                ),
            },
        ],
    },
};

export const Interactive: Story = {
    render: () => {
        const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
        const [multiple, setMultiple] = useState(false);
        const [variant, setVariant] = useState<'default' | 'bordered' | 'separated' | 'minimal'>('default');
        const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
        const [iconPosition, setIconPosition] = useState<'left' | 'right'>('right');
        const [animated, setAnimated] = useState(true);

        return (
            <div style={{ width: '600px' }}>
                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                    <button onClick={() => setMultiple(!multiple)}>
                        {multiple ? 'Single' : 'Multiple'} Expand
                    </button>
                    <button onClick={() => setVariant(v => v === 'default' ? 'bordered' : v === 'bordered' ? 'separated' : v === 'separated' ? 'minimal' : 'default')}>
                        {variant} Variant
                    </button>
                    <button onClick={() => setSize(s => s === 'small' ? 'medium' : s === 'medium' ? 'large' : 'small')}>
                        {size} Size
                    </button>
                    <button onClick={() => setIconPosition(p => p === 'left' ? 'right' : 'left')}>
                        Icon {iconPosition}
                    </button>
                    <button onClick={() => setAnimated(!animated)}>
                        {animated ? 'Disable' : 'Enable'} Animation
                    </button>
                </div>
                <Accordion
                    items={defaultItems}
                    multiple={multiple}
                    variant={variant}
                    size={size}
                    iconPosition={iconPosition}
                    animated={animated}
                    onChange={setExpandedIndices}
                />
            </div>
        );
    },
}; 