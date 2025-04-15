import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './SideDrawer.scss';

export interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    position?: 'left' | 'right' | 'top' | 'bottom';
    size?: 'small' | 'medium' | 'large' | 'full';
    variant?: 'default' | 'overlay' | 'push';
    showBackdrop?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEsc?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    children: React.ReactNode;
    animation?: 'slide' | 'fade' | 'scale';
    showCloseButton?: boolean;
    preventScroll?: boolean;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
    isOpen,
    onClose,
    position = 'right',
    size = 'medium',
    variant = 'default',
    showBackdrop = true,
    closeOnBackdropClick = true,
    closeOnEsc = true,
    header,
    footer,
    className = '',
    children,
    animation = 'slide',
    showCloseButton = true,
    preventScroll = true,
}) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const portalRoot = document.getElementById('portal-root') || document.body;

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (closeOnEsc && event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
            if (preventScroll) {
                document.body.style.overflow = 'hidden';
            }
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            if (preventScroll) {
                document.body.style.overflow = '';
            }
        };
    }, [isOpen, closeOnEsc, onClose, preventScroll]);

    const handleBackdropClick = (event: React.MouseEvent) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
            onClose();
        }
    };

    const drawerContent = (
        <div
            className={`ds-side-drawer-container ${isOpen ? 'open' : ''} ${variant} ${position} ${animation}`}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
        >
            {showBackdrop && <div className="ds-side-drawer-backdrop" />}
            <div
                ref={drawerRef}
                className={`ds-side-drawer ${size} ${className}`}
                role="document"
            >
                {showCloseButton && (
                    <button
                        className="ds-side-drawer-close"
                        onClick={onClose}
                        aria-label="Close drawer"
                    >
                        ×
                    </button>
                )}
                {header && (
                    <div className="ds-side-drawer-header">
                        {header}
                    </div>
                )}
                <div className="ds-side-drawer-content">
                    {children}
                </div>
                {footer && (
                    <div className="ds-side-drawer-footer">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(drawerContent, portalRoot);
};

export default SideDrawer; 