import React, { useState, useEffect, useCallback } from 'react';
import Toast, { ToastType, ToastPosition } from './Toast';

export interface ToastOptions {
    message: string;
    type?: ToastType;
    duration?: number;
    closable?: boolean;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    position?: ToastPosition;
    showProgress?: boolean;
    pauseOnHover?: boolean;
}

export interface ToastItem extends ToastOptions {
    id: string;
}

interface ToastContainerProps {
    position?: ToastPosition;
    maxToasts?: number;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
    position = 'top-right',
    maxToasts = 3,
}) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const addToast = useCallback((options: ToastOptions) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: ToastItem = { ...options, id };

        setToasts((prevToasts) => {
            // If we've reached the maximum number of toasts, remove the oldest one
            if (prevToasts.length >= maxToasts) {
                return [...prevToasts.slice(1), newToast];
            }
            return [...prevToasts, newToast];
        });

        return id;
    }, [maxToasts]);

    const removeToast = useCallback((id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    // Expose the addToast method to the window object for global access
    useEffect(() => {
        // @ts-ignore
        window.dsToast = {
            success: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) =>
                addToast({ message, type: 'success', ...options }),
            error: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) =>
                addToast({ message, type: 'error', ...options }),
            warning: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) =>
                addToast({ message, type: 'warning', ...options }),
            info: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) =>
                addToast({ message, type: 'info', ...options }),
            add: (options: ToastOptions) => addToast(options),
            remove: (id: string) => removeToast(id),
        };

        return () => {
            // @ts-ignore
            delete window.dsToast;
        };
    }, [addToast, removeToast]);

    return (
        <>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    closable={toast.closable}
                    icon={toast.icon}
                    action={toast.action}
                    position={toast.position || position}
                    showProgress={toast.showProgress}
                    pauseOnHover={toast.pauseOnHover}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </>
    );
};

export default ToastContainer;
