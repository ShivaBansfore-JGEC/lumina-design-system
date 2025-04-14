import React, { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
    size?: ModalSize;
    closeOnEsc?: boolean;
    closeOnOverlayClick?: boolean;
    showCloseButton?: boolean;
    className?: string;
    overlayClassName?: string;
    preventScroll?: boolean;
    footer?: React.ReactNode;
    headerActions?: React.ReactNode;
    contentClassName?: string;
    animation?: 'fade' | 'slide' | 'zoom';
    position?: 'center' | 'top';
    onAnimationEnd?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    closeOnEsc = true,
    closeOnOverlayClick = true,
    showCloseButton = true,
    className = '',
    overlayClassName = '',
    preventScroll = true,
    footer,
    headerActions,
    contentClassName = '',
    animation = 'fade',
    position = 'center',
    onAnimationEnd,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleEscapeKey = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape' && closeOnEsc) {
            onClose();
        }
    }, [closeOnEsc, onClose]);

    const handleOverlayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget && closeOnOverlayClick) {
            onClose();
        }
    }, [closeOnOverlayClick, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            if (preventScroll) {
                document.body.style.overflow = 'hidden';
            }
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            if (preventScroll) {
                document.body.style.overflow = '';
            }
        };
    }, [isOpen, handleEscapeKey, preventScroll]);

    useEffect(() => {
        const contentElement = contentRef.current;
        if (contentElement && isOpen) {
            contentElement.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const modalContent = (
        <div
            className={`ds-modal-overlay ${overlayClassName} ${animation} ${isOpen ? 'open' : ''}`}
            onClick={handleOverlayClick}
            role="presentation"
        >
            <div
                ref={modalRef}
                className={`ds-modal ${className} size-${size} position-${position}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
            >
                <div className="ds-modal-content" ref={contentRef} tabIndex={-1}>
                    {(title || showCloseButton || headerActions) && (
                        <div className="ds-modal-header">
                            {title && (
                                <h2 className="ds-modal-title" id="modal-title">
                                    {title}
                                </h2>
                            )}
                            <div className="ds-modal-header-actions">
                                {headerActions}
                                {showCloseButton && (
                                    <button
                                        type="button"
                                        className="ds-modal-close"
                                        onClick={onClose}
                                        aria-label="Close modal"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                    <div className={`ds-modal-body ${contentClassName}`}>
                        {children}
                    </div>
                    {footer && (
                        <div className="ds-modal-footer">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

// Convenience components for common modal types
export const ConfirmModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    isLoading?: boolean;
}> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    children,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'info',
    isLoading = false,
}) => (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
            footer={
                <div className="ds-modal-actions">
                    <button
                        type="button"
                        className="ds-button secondary"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        className={`ds-button ${variant}`}
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : confirmText}
                    </button>
                </div>
            }
        >
            {children}
        </Modal>
    );

export const AlertModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
    buttonText?: string;
    variant?: 'success' | 'error' | 'warning' | 'info';
}> = ({
    isOpen,
    onClose,
    title,
    children,
    buttonText = 'OK',
    variant = 'info',
}) => (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
            footer={
                <div className="ds-modal-actions">
                    <button
                        type="button"
                        className={`ds-button ${variant}`}
                        onClick={onClose}
                    >
                        {buttonText}
                    </button>
                </div>
            }
        >
            {children}
        </Modal>
    ); 