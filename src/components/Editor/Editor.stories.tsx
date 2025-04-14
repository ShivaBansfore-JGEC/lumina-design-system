import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Editor from './Editor';
import type { EditorProps } from './Editor';
import './Editor.scss';

const meta: Meta<typeof Editor> = {
    title: 'Components/Editor',
    component: Editor,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Editor>;

// Sample content for the editor
const sampleContent = `
<h1>Welcome to the Editor</h1>
<p>This is a <strong>rich text editor</strong> that supports:</p>
<ul>
  <li>Text formatting</li>
  <li>Lists</li>
  <li>Images</li>
  <li>And more!</li>
</ul>
`;

// Default story
export const Default: Story = {
    args: {
        initialContent: sampleContent,
        placeholder: 'Start typing...',
        label: 'Editor',
    },
};

// With different sizes
export const Small: Story = {
    args: {
        ...Default.args,
        size: 'small',
    },
};

export const Medium: Story = {
    args: {
        ...Default.args,
        size: 'medium',
    },
};

export const Large: Story = {
    args: {
        ...Default.args,
        size: 'large',
    },
};

// With different variants
export const Outlined: Story = {
    args: {
        ...Default.args,
        variant: 'outlined',
    },
};

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

// With different shapes
export const Rounded: Story = {
    args: {
        ...Default.args,
        shape: 'rounded',
    },
};

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

// With error state
export const WithError: Story = {
    args: {
        ...Default.args,
        error: true,
        errorText: 'This field is required',
    },
};

// With character count
export const WithCharCount: Story = {
    args: {
        ...Default.args,
        showCharCount: true,
        maxChars: 1000,
    },
};

// With custom toolbar
export const CustomToolbar: Story = {
    args: {
        ...Default.args,
        showToolbar: true,
        allowImages: true,
        maxImageSize: 5,
        allowedImageTypes: ['image/jpeg', 'image/png'],
    },
};

// Interactive example with state management
export const Interactive: Story = {
    render: (args: EditorProps) => {
        const [content, setContent] = useState(sampleContent);
        const [charCount, setCharCount] = useState(0);

        const handleChange = (newContent: string) => {
            setContent(newContent);
            setCharCount(newContent.length);
        };

        return (
            <div style={{ width: '600px' }}>
                <Editor
                    {...args}
                    initialContent={content}
                    onChange={handleChange}
                    showCharCount
                    maxChars={1000}
                />
                <div style={{ marginTop: '16px' }}>
                    <h3>Current Content:</h3>
                    <pre style={{
                        background: '#f5f5f5',
                        padding: '16px',
                        borderRadius: '4px',
                        overflow: 'auto',
                        maxHeight: '200px'
                    }}>
                        {content}
                    </pre>
                </div>
            </div>
        );
    },
}; 