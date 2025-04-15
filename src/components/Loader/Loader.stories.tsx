import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';
import './Loader.scss';

const meta: Meta<typeof Loader> = {
    title: 'Components/Loader',
    component: Loader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Loader>;

// Basic loader with different types
export const Spinner: Story = {
    args: {
        type: 'spinner',
        size: 'medium',
    },
};

export const Dots: Story = {
    args: {
        type: 'dots',
        size: 'medium',
    },
};

export const Pulse: Story = {
    args: {
        type: 'pulse',
        size: 'medium',
    },
};

export const Bounce: Story = {
    args: {
        type: 'bounce',
        size: 'medium',
    },
};

export const Progress: Story = {
    args: {
        type: 'progress',
        size: 'medium',
    },
};

export const Skeleton: Story = {
    args: {
        type: 'skeleton',
        size: 'medium',
    },
    decorators: [
        (Story) => (
            <div style={{
                padding: '20px',
                background: '#f5f5f5',
                borderRadius: '8px',
                width: '300px'
            }}>
                <Story />
            </div>
        ),
    ],
};

// Size variations
export const Small: Story = {
    args: {
        type: 'spinner',
        size: 'small',
    },
};

export const Medium: Story = {
    args: {
        type: 'spinner',
        size: 'medium',
    },
};

export const Large: Story = {
    args: {
        type: 'spinner',
        size: 'large',
    },
};

// Color variations
export const CustomColor: Story = {
    args: {
        type: 'spinner',
        size: 'medium',
        color: '#ff0000',
    },
};

// With text
export const WithText: Story = {
    args: {
        type: 'spinner',
        size: 'medium',
        text: 'Loading...',
    },
};

// Centered loader
export const Centered: Story = {
    args: {
        type: 'spinner',
        size: 'medium',
        centered: true,
    },
    decorators: [
        (Story) => (
            <div style={{ height: '200px', position: 'relative' }}>
                <Story />
            </div>
        ),
    ],
};

// Overlay loader
export const Overlay: Story = {
    args: {
        type: 'spinner',
        size: 'medium',
        overlay: true,
    },
    decorators: [
        (Story) => (
            <div style={{ height: '200px', position: 'relative' }}>
                <div style={{ padding: '20px' }}>
                    <h3>Content behind overlay</h3>
                    <p>This content is visible but the loader appears on top</p>
                </div>
                <Story />
            </div>
        ),
    ],
};

// Fullscreen loader
export const Fullscreen: Story = {
    args: {
        type: 'spinner',
        size: 'large',
        fullscreen: true,
        text: 'Loading application...',
    },
};

export const Wave: Story = {
    args: {
        type: 'wave',
        size: 'medium',
    },
};

export const Ring: Story = {
    args: {
        type: 'ring',
        size: 'medium',
    },
};

export const Ripple: Story = {
    args: {
        type: 'ripple',
        size: 'medium',
    },
};

// All loader types in a grid
export const AllTypes: Story = {
    render: () => (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            padding: '20px',
        }}>
            <div>
                <h4>Spinner</h4>
                <Loader type="spinner" size="medium" />
            </div>
            <div>
                <h4>Dots</h4>
                <Loader type="dots" size="medium" />
            </div>
            <div>
                <h4>Pulse</h4>
                <Loader type="pulse" size="medium" />
            </div>
            <div>
                <h4>Bounce</h4>
                <Loader type="bounce" size="medium" />
            </div>
            <div>
                <h4>Progress</h4>
                <Loader type="progress" size="medium" />
            </div>
            <div>
                <h4>Skeleton</h4>
                <Loader type="skeleton" size="medium" />
            </div>
            <div>
                <h4>Wave</h4>
                <Loader type="wave" size="medium" />
            </div>
            <div>
                <h4>Ring</h4>
                <Loader type="ring" size="medium" />
            </div>
            <div>
                <h4>Ripple</h4>
                <Loader type="ripple" size="medium" />
            </div>
        </div>
    ),
}; 