import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Badge, BadgeProps, StatusBadge, CountBadge, TagBadge } from './Badge';

export default {
    title: 'Components/Badge',
    component: Badge,
    parameters: {
        layout: 'padded',
    },
} as Meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

// Basic variants
export const Variants = () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="purple">Purple</Badge>
        <Badge variant="cyan">Cyan</Badge>
        <Badge variant="pink">Pink</Badge>
    </div>
);

// Style variations
export const Styles = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Badge variant="primary">Default</Badge>
            <Badge variant="primary" outlined>Outlined</Badge>
            <Badge variant="primary" subtle>Subtle</Badge>
            <Badge variant="primary" pill>Pill</Badge>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Badge variant="success">Default</Badge>
            <Badge variant="success" outlined>Outlined</Badge>
            <Badge variant="success" subtle>Subtle</Badge>
            <Badge variant="success" pill>Pill</Badge>
        </div>
    </div>
);

// Sizes
export const Sizes = () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Badge size="sm" variant="primary">Small</Badge>
        <Badge size="md" variant="primary">Medium</Badge>
        <Badge size="lg" variant="primary">Large</Badge>
    </div>
);

// With icons
export const WithIcons = () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Badge
            variant="primary"
            icon={<span role="img" aria-label="star">⭐</span>}
        >
            With Icon
        </Badge>
        <Badge
            variant="success"
            rightIcon={<span role="img" aria-label="check">✓</span>}
        >
            Right Icon
        </Badge>
        <Badge
            variant="warning"
            icon={<span role="img" aria-label="warning">⚠️</span>}
            rightIcon={<span role="img" aria-label="arrow">→</span>}
        >
            Both Icons
        </Badge>
    </div>
);

// Interactive badges
export const Interactive = () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Badge
            variant="primary"
            onClick={() => alert('Badge clicked!')}
        >
            Clickable
        </Badge>
        <Badge
            variant="danger"
            removable
            onRemove={() => alert('Badge removed!')}
        >
            Removable
        </Badge>
        <Badge
            variant="success"
            onClick={() => alert('Badge clicked!')}
            removable
            onRemove={() => alert('Badge removed!')}
        >
            Both
        </Badge>
    </div>
);

// Status badges
export const Status = () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <StatusBadge status="online">Online</StatusBadge>
        <StatusBadge status="offline">Offline</StatusBadge>
        <StatusBadge status="away">Away</StatusBadge>
        <StatusBadge status="busy">Busy</StatusBadge>
        <StatusBadge status="custom" customColor="#9c27b0">Custom</StatusBadge>
    </div>
);

// Count badges
export const Counts = () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <CountBadge count={5} />
        <CountBadge count={42} variant="danger" />
        <CountBadge count={150} maxCount={99} variant="success" />
    </div>
);

// Tag badges
export const Tags = () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <TagBadge onRemove={() => alert('Tag removed!')}>React</TagBadge>
        <TagBadge variant="purple" onRemove={() => alert('Tag removed!')}>TypeScript</TagBadge>
        <TagBadge variant="cyan" onRemove={() => alert('Tag removed!')}>Design System</TagBadge>
    </div>
); 