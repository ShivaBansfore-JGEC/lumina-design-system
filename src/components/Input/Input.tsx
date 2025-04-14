import React, { forwardRef, useState, useRef, useEffect } from 'react';
import './Input.scss';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'outlined' | 'filled' | 'underlined';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Label text for the input */
    label?: string;
    /** Helper text displayed below the input */
    helperText?: string;
    /** Error message displayed below the input */
    error?: string;
    /** Success message displayed below the input */
    success?: string;
    /** Icon displayed at the start of the input */
    startIcon?: React.ReactNode;
    /** Icon displayed at the end of the input */
    endIcon?: React.ReactNode;
    /** Input size variant */
    size?: InputSize;
    /** Input style variant */
    variant?: InputVariant;
    /** Whether the input is loading */
    loading?: boolean;
    /** Whether to show a clear button when the input has a value */
    clearable?: boolean;
    /** Whether the input is full width */
    fullWidth?: boolean;
    /** Custom class name */
    className?: string;
    /** Whether to animate the label */
    animateLabel?: boolean;
    /** Whether to show character count */
    showCount?: boolean;
    /** Maximum character count */
    maxCount?: number;
    /** Prefix text or element */
    inputPrefix?: React.ReactNode;
    /** Suffix text or element */
    inputSuffix?: React.ReactNode;
    /** Whether to show password toggle for password inputs */
    showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    helperText,
    error,
    success,
    startIcon,
    endIcon,
    size = 'md',
    variant = 'outlined',
    loading = false,
    clearable = false,
    fullWidth = false,
    className = '',
    animateLabel = true,
    showCount = false,
    maxCount,
    inputPrefix,
    inputSuffix,
    showPasswordToggle = true,
    disabled,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    type = 'text',
    ...props
}, ref) => {
    const [localValue, setLocalValue] = useState<string>(value as string || defaultValue as string || '');
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync with controlled value
    useEffect(() => {
        if (value !== undefined) {
            setLocalValue(value as string);
        }
    }, [value]);

    const hasValue = localValue !== '';
    const isPassword = type === 'password';
    const displayType = isPassword && showPassword ? 'text' : type;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const handleClear = () => {
        setLocalValue('');
        if (inputRef.current) {
            inputRef.current.focus();
        }
        onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const classes = [
        'ds-input-wrapper',
        size,
        variant,
        fullWidth ? 'full-width' : '',
        isFocused ? 'focused' : '',
        error ? 'error' : '',
        success ? 'success' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            {label && (
                <label className={`ds-input-label ${animateLabel ? 'animate' : ''}`}>
                    {label}
                </label>
            )}
            <div className="ds-input-container">
                {startIcon && <span className="ds-input-icon start">{startIcon}</span>}
                {inputPrefix && <span className="ds-input-affix prefix">{inputPrefix}</span>}
                <input
                    {...props}
                    ref={ref || inputRef}
                    type={displayType}
                    value={localValue}
                    disabled={disabled || loading}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="ds-input"
                />
                {inputSuffix && <span className="ds-input-affix suffix">{inputSuffix}</span>}
                {loading && (
                    <span className="ds-input-icon end">
                        <div className="ds-input-spinner" />
                    </span>
                )}
                {clearable && hasValue && !disabled && !loading && (
                    <button
                        type="button"
                        className="ds-input-clear"
                        onClick={handleClear}
                        aria-label="Clear input"
                    >
                        ×
                    </button>
                )}
                {isPassword && showPasswordToggle && !loading && (
                    <button
                        type="button"
                        className="ds-input-password-toggle"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                )}
                {endIcon && !loading && !isPassword && <span className="ds-input-icon end">{endIcon}</span>}
            </div>
            {helperText && !error && !success && (
                <span className="ds-input-helper">{helperText}</span>
            )}
            {error && (
                <span className="ds-input-error">{error}</span>
            )}
            {success && (
                <span className="ds-input-success">{success}</span>
            )}
            {showCount && maxCount !== undefined && (
                <span className="ds-input-count">
                    {localValue.length}/{maxCount}
                </span>
            )}
        </div>
    );
});

Input.displayName = 'Input'; 