import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Modal, ModalProps, ConfirmModal, AlertModal } from './Modal';

export default {
    title: 'Components/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
} as Meta;

const Template: Story<ModalProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button className="ds-button primary" onClick={() => setIsOpen(true)}>
                Open Modal
            </button>
            <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export const Default = Template.bind({});
Default.args = {
    title: 'Example Modal',
    children: (
        <div>
            <p>This is a basic modal example with a title and content.</p>
            <p>You can add any content here.</p>
        </div>
    ),
};

export const WithFooter = Template.bind({});
WithFooter.args = {
    title: 'Modal with Footer',
    children: (
        <div>
            <p>This modal includes footer actions.</p>
            <p>The footer typically contains action buttons.</p>
        </div>
    ),
    footer: (
        <div className="ds-modal-actions">
            <button className="ds-button secondary">Cancel</button>
            <button className="ds-button primary">Save Changes</button>
        </div>
    ),
};

export const LargeModal = Template.bind({});
LargeModal.args = {
    title: 'Large Modal',
    size: 'lg',
    children: (
        <div>
            <p>This is a large modal that's useful for displaying more content.</p>
            <p>It's perfect for forms, tables, or detailed information.</p>
            {Array(10).fill(0).map((_, i) => (
                <p key={i}>Additional content line {i + 1}</p>
            ))}
        </div>
    ),
};

export const CustomAnimation = Template.bind({});
CustomAnimation.args = {
    title: 'Animated Modal',
    animation: 'zoom',
    children: (
        <div>
            <p>This modal uses a zoom animation when opening.</p>
            <p>You can choose between fade, slide, and zoom animations.</p>
        </div>
    ),
};

export const TopPosition = Template.bind({});
TopPosition.args = {
    title: 'Top Modal',
    position: 'top',
    children: (
        <div>
            <p>This modal appears at the top of the screen.</p>
            <p>Useful for notifications or quick actions.</p>
        </div>
    ),
};

// Example of ConfirmModal usage
export const Confirmation: Story = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsOpen(false);
        }, 1500);
    };

    return (
        <>
            <button className="ds-button danger" onClick={() => setIsOpen(true)}>
                Delete Item
            </button>
            <ConfirmModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={handleConfirm}
                title="Confirm Delete"
                variant="danger"
                isLoading={isLoading}
                confirmText="Delete"
            >
                Are you sure you want to delete this item? This action cannot be undone.
            </ConfirmModal>
        </>
    );
};

// Example of AlertModal usage
export const Alert: Story = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="ds-button success" onClick={() => setIsOpen(true)}>
                Show Success
            </button>
            <AlertModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Success"
                variant="success"
                buttonText="Got it"
            >
                Your changes have been saved successfully!
            </AlertModal>
        </>
    );
}; 