import React, { useState, useRef, useEffect } from 'react';
import "./Popover.scss";

export interface PopoverProps {
    /** Content to be displayed inside the popover */
    children: React.ReactNode;
    /** Element that triggers the popover */
    trigger: React.ReactNode;
    /** Position of the popover relative to the trigger */
    position?: 'top' | 'bottom' | 'left' | 'right';
    /** Whether the popover is initially visible */
    defaultOpen?: boolean;
    /** Callback when popover visibility changes */
    onOpenChange?: (isOpen: boolean) => void;
    /** Custom class name for the popover */
    className?: string;
    /** Whether to close the popover when clicking outside */
    closeOnClickOutside?: boolean;
}

const Popover: React.FC<PopoverProps> = ({
    children,
    trigger,
    position = 'bottom',
    defaultOpen = false,
    onOpenChange,
    className = '',
    closeOnClickOutside = true,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const popoverRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        onOpenChange?.(newState);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                closeOnClickOutside &&
                popoverRef.current &&
                triggerRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                onOpenChange?.(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeOnClickOutside, onOpenChange]);

    const getPositionClasses = () => {
        const baseClass = 'popover-wrapper';
        const positionClass = `popover-${position}`;
        return `${baseClass} ${positionClass} ${className}`.trim();
    };

    return (
        <div className="popover-container">
            <div
                ref={triggerRef}
                onClick={handleToggle}
                role="button"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {trigger}
            </div>
            {isOpen && (
                <div
                    ref={popoverRef}
                    className={getPositionClasses()}
                    role="dialog"
                    aria-modal="true"
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Popover;