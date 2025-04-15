import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Toast from './Toast';
import ToastContainer from './ToastContainer';
import './Toast.scss';

const meta: Meta<typeof Toast> = {
    title: 'Components/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Basic toast examples
export const Success: Story = {
    args: {
        message: 'Operation completed successfully!',
        type: 'success',
        visible: true,
    },
};

export const Error: Story = {
    args: {
        message: 'An error occurred. Please try again.',
        type: 'error',
        visible: true,
    },
};

export const Warning: Story = {
    args: {
        message: 'Please save your changes before leaving.',
        type: 'warning',
        visible: true,
    },
};

export const Info: Story = {
    args: {
        message: 'New updates are available.',
        type: 'info',
        visible: true,
    },
};

// Position variations
export const TopRight: Story = {
    args: {
        message: 'Top right toast message',
        type: 'info',
        position: 'top-right',
        visible: true,
    },
};

export const TopLeft: Story = {
    args: {
        message: 'Top left toast message',
        type: 'info',
        position: 'top-left',
        visible: true,
    },
};

export const BottomRight: Story = {
    args: {
        message: 'Bottom right toast message',
        type: 'info',
        position: 'bottom-right',
        visible: true,
    },
};

export const BottomLeft: Story = {
    args: {
        message: 'Bottom left toast message',
        type: 'info',
        position: 'bottom-left',
        visible: true,
    },
};

// With custom duration
export const CustomDuration: Story = {
    args: {
        message: 'This toast will disappear in 10 seconds',
        type: 'info',
        duration: 10000,
        visible: true,
    },
};

// With action button
export const WithAction: Story = {
    args: {
        message: 'New version available',
        type: 'info',
        action: <button onClick={() => alert('Action clicked!')}>Update</button>,
        visible: true,
    },
};

// With custom icon
export const WithCustomIcon: Story = {
    args: {
        message: 'Custom icon toast',
        icon: (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2L1 21h22L12 2zm0 3.83L19.17 19H4.83L12 5.83zM11 16h2v2h-2zm0-6h2v4h-2z" />
            </svg>
        ),
        visible: true,
    },
};

// Multiple toasts using ToastContainer
export const MultipleToasts: Story = {
    render: () => {
        const showToasts = () => {
            // @ts-ignore
            window.dsToast?.success('Success message!');
            setTimeout(() => {
                // @ts-ignore
                window.dsToast?.error('Error message!');
            }, 1000);
            setTimeout(() => {
                // @ts-ignore
                window.dsToast?.warning('Warning message!');
            }, 2000);
        };

        return (
            <div>
                <button onClick={showToasts}>Show Multiple Toasts</button>
                <ToastContainer position="top-right" maxToasts={3} />
            </div>
        );
    },
}; 