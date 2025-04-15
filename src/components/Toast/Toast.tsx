import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './Toast.scss';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastProps {
    /** The message to display in the toast */
    message: string;
    /** The type of toast to display */
    type?: ToastType;
    /** The duration in milliseconds before the toast automatically closes */
    duration?: number;
    /** Whether to show a close button */
    closable?: boolean;
    /** Custom icon to display */
    icon?: React.ReactNode;
    /** Custom action button */
    action?: React.ReactNode;
    /** Callback when the toast is closed */
    onClose?: () => void;
    /** Additional CSS class name */
    className?: string;
    /** Whether the toast is visible */
    visible?: boolean;
    /** The position of the toast */
    position?: ToastPosition;
    /** Whether to show a progress bar */
    showProgress?: boolean;
    /** Whether to pause the timer when hovering over the toast */
    pauseOnHover?: boolean;
}

const Toast: React.FC<ToastProps> = ({
    message,
    type = 'info',
    duration = 5000,
    closable = true,
    icon,
    action,
    onClose,
    className,
    visible = true,
    position = 'top-right',
    showProgress = true,
    pauseOnHover = true,
}) => {
    const [isVisible, setIsVisible] = useState(visible);
    const [progress, setProgress] = useState(100);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        setIsVisible(visible);
        if (visible) {
            setProgress(100);
        }
    }, [visible]);

    useEffect(() => {
        if (!isVisible || !duration || isPaused) return;

        const startTime = Date.now();
        const endTime = startTime + duration;

        const updateProgress = () => {
            const now = Date.now();
            const remaining = Math.max(0, endTime - now);
            const newProgress = (remaining / duration) * 100;

            setProgress(newProgress);

            if (remaining > 0) {
                requestAnimationFrame(updateProgress);
            } else {
                handleClose();
            }
        };

        const animationFrame = requestAnimationFrame(updateProgress);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [isVisible, duration, isPaused]);

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };

    const handleMouseEnter = () => {
        if (pauseOnHover) {
            setIsPaused(true);
        }
    };

    const handleMouseLeave = () => {
        if (pauseOnHover) {
            setIsPaused(false);
        }
    };

    if (!isVisible) return null;

    const toastClasses = classNames(
        'ds-toast',
        `ds-toast--${type}`,
        `ds-toast--${position}`,
        className
    );

    const defaultIcons = {
        success: (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
            </svg>
        ),
        error: (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor" />
            </svg>
        ),
        warning: (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor" />
            </svg>
        ),
        info: (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor" />
            </svg>
        ),
    };

    return (
        <div
            className={toastClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="alert"
            aria-live="polite"
        >
            <div className="ds-toast__content">
                <div className="ds-toast__icon">
                    {icon || defaultIcons[type]}
                </div>
                <div className="ds-toast__message">{message}</div>
                {action && <div className="ds-toast__action">{action}</div>}
                {closable && (
                    <button
                        className="ds-toast__close"
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor" />
                        </svg>
                    </button>
                )}
            </div>
            {showProgress && (
                <div className="ds-toast__progress">
                    <div
                        className="ds-toast__progress-bar"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
};

export default Toast; 