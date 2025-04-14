import React from 'react';
import './Badge.scss';

export type BadgeVariant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'neutral'
    | 'purple'
    | 'cyan'
    | 'pink';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    removable?: boolean;
    onRemove?: () => void;
    className?: string;
    pill?: boolean;
    outlined?: boolean;
    subtle?: boolean;
    dot?: boolean;
    count?: number;
    maxCount?: number;
    onClick?: () => void;
    style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'neutral',
    size = 'md',
    icon,
    rightIcon,
    removable = false,
    onRemove,
    className = '',
    pill = false,
    outlined = false,
    subtle = false,
    dot = false,
    count,
    maxCount = 99,
    onClick,
    style,
}) => {
    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove?.();
    };

    const displayCount = count !== undefined ? (
        count > maxCount ? `${maxCount}+` : count.toString()
    ) : null;

    const classes = [
        'ds-badge',
        `variant-${variant}`,
        `size-${size}`,
        pill ? 'pill' : '',
        outlined ? 'outlined' : '',
        subtle ? 'subtle' : '',
        dot ? 'with-dot' : '',
        onClick ? 'clickable' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <span
            className={classes}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            style={style}
        >
            {dot && <span className="ds-badge-dot" />}
            {icon && <span className="ds-badge-icon">{icon}</span>}
            <span className="ds-badge-content">
                {displayCount ?? children}
            </span>
            {rightIcon && <span className="ds-badge-icon right">{rightIcon}</span>}
            {removable && (
                <button
                    type="button"
                    className="ds-badge-remove"
                    onClick={handleRemoveClick}
                    aria-label="Remove badge"
                >
                    ×
                </button>
            )}
        </span>
    );
};

// Convenience components for common badge types
export const StatusBadge: React.FC<{
    status: 'online' | 'offline' | 'away' | 'busy' | 'custom';
    customColor?: string;
    children?: React.ReactNode;
}> = ({ status, customColor, children }) => (
    <Badge
        variant={
            status === 'online' ? 'success' :
                status === 'offline' ? 'neutral' :
                    status === 'away' ? 'warning' :
                        status === 'busy' ? 'danger' :
                            'primary'
        }
        dot
        subtle
        style={status === 'custom' ? { '--badge-color': customColor } as React.CSSProperties : undefined}
    >
        {children ?? status}
    </Badge>
);

export const CountBadge: React.FC<{
    count: number;
    maxCount?: number;
    variant?: BadgeVariant;
}> = ({ count, maxCount = 99, variant = 'primary' }) => (
    <Badge
        count={count}
        maxCount={maxCount}
        variant={variant}
        pill
    >
        {count > maxCount ? `${maxCount}+` : count.toString()}
    </Badge>
);

export const TagBadge: React.FC<{
    children: React.ReactNode;
    onRemove?: () => void;
    variant?: BadgeVariant;
}> = ({ children, onRemove, variant = 'neutral' }) => (
    <Badge
        variant={variant}
        removable
        onRemove={onRemove}
        pill
        subtle
    >
        {children}
    </Badge>
); 