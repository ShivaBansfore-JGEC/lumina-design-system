import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tab } from './Tab';
import { FaHome, FaUser, FaCog, FaBell } from 'react-icons/fa';

const meta: Meta<typeof Tab> = {
    title: 'Components/Tab',
    component: Tab,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tab>;

const defaultItems = [
    { id: '1', label: 'Home', content: 'Home Content' },
    { id: '2', label: 'Profile', content: 'Profile Content' },
    { id: '3', label: 'Settings', content: 'Settings Content' },
];

export const Default: Story = {
    args: {
        items: defaultItems,
    },
};

export const WithIcons: Story = {
    args: {
        items: [
            { id: '1', label: 'Home', icon: <FaHome />, content: 'Home Content' },
            { id: '2', label: 'Profile', icon: <FaUser />, content: 'Profile Content' },
            { id: '3', label: 'Settings', icon: <FaCog />, content: 'Settings Content' },
        ],
    },
};

export const WithBadges: Story = {
    args: {
        items: [
            { id: '1', label: 'Home', content: 'Home Content' },
            { id: '2', label: 'Profile', content: 'Profile Content' },
            { id: '3', label: 'Notifications', badge: '3', content: 'Notifications Content' },
        ],
    },
};

export const Pills: Story = {
    args: {
        items: defaultItems,
        variant: 'pills',
    },
};

export const Underline: Story = {
    args: {
        items: defaultItems,
        variant: 'underline',
    },
};

export const Card: Story = {
    args: {
        items: defaultItems,
        variant: 'card',
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Tab items={defaultItems} size="small" />
            <Tab items={defaultItems} size="medium" />
            <Tab items={defaultItems} size="large" />
        </div>
    ),
};

export const FullWidth: Story = {
    args: {
        items: defaultItems,
        fullWidth: true,
    },
};

export const Animated: Story = {
    args: {
        items: defaultItems,
        animated: true,
    },
};

export const Disabled: Story = {
    args: {
        items: [
            { id: '1', label: 'Home', content: 'Home Content' },
            { id: '2', label: 'Profile', content: 'Profile Content', disabled: true },
            { id: '3', label: 'Settings', content: 'Settings Content' },
        ],
    },
};

export const WithCustomContent: Story = {
    args: {
        items: [
            {
                id: '1',
                label: 'Home',
                content: (
                    <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
                        <h3>Welcome Home</h3>
                        <p>This is a custom content example with styled elements.</p>
                    </div>
                ),
            },
            {
                id: '2',
                label: 'Profile',
                content: (
                    <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '4px' }}>
                        <h3>User Profile</h3>
                        <p>Another example of custom content with different styling.</p>
                    </div>
                ),
            },
        ],
    },
};

export const WithAllFeatures: Story = {
    args: {
        items: [
            { id: '1', label: 'Home', icon: <FaHome />, content: 'Home Content' },
            { id: '2', label: 'Profile', icon: <FaUser />, badge: 'New', content: 'Profile Content' },
            { id: '3', label: 'Settings', icon: <FaCog />, content: 'Settings Content' },
            { id: '4', label: 'Notifications', icon: <FaBell />, badge: '3', content: 'Notifications Content' },
        ],
        variant: 'pills',
        size: 'large',
        fullWidth: true,
        animated: true,
    },
}; 