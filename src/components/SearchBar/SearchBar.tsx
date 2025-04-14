import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import "./SearchBar.scss";

export type SearchBarSize = 'small' | 'medium' | 'large';
export type SearchBarVariant = 'outlined' | 'filled' | 'underlined';
export type SearchBarShape = 'rounded' | 'pill' | 'square';

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * The placeholder text for the search input
     * @default "Search..."
     */
    placeholder?: string;

    /**
     * The current value of the search input
     */
    value: string;

    /**
     * Callback function when the search value changes
     */
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     * Callback function when the search is submitted (on Enter key)
     */
    onSearch?: (value: string) => void;

    /**
     * The size of the search bar
     * @default "medium"
     */
    size?: SearchBarSize;

    /**
     * The visual variant of the search bar
     * @default "outlined"
     */
    variant?: SearchBarVariant;

    /**
     * The shape of the search bar
     * @default "rounded"
     */
    shape?: SearchBarShape;

    /**
     * Whether the search bar is disabled
     * @default false
     */
    disabled?: boolean;

    /**
     * Whether to show a clear button when there is text
     * @default true
     */
    clearable?: boolean;

    /**
     * Custom icon for the search bar (React element)
     */
    icon?: React.ReactNode;

    /**
     * Custom class name for the search bar
     */
    className?: string;

    /**
     * Custom styles for the search bar
     */
    style?: React.CSSProperties;

    /**
     * Whether to show a loading spinner
     * @default false
     */
    loading?: boolean;

    /**
     * Error message to display below the search bar
     */
    error?: string;

    /**
     * Helper text to display below the search bar
     */
    helperText?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = "Search...",
    value,
    onChange,
    onSearch,
    size = "medium",
    variant = "outlined",
    shape = "rounded",
    disabled = false,
    clearable = true,
    icon,
    className,
    style,
    loading = false,
    error,
    helperText,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Handle focus state
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    // Handle clear button click
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (inputRef.current) {
            inputRef.current.focus();
        }
        // Create a synthetic event to pass to onChange
        const syntheticEvent = {
            target: { value: '' }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
    };

    // Handle key press (Enter key for search)
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(value);
        }
    };

    // Default search icon
    const defaultIcon = (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="search-icon"
        >
            <path
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="currentColor"
            />
        </svg>
    );

    // Loading spinner
    const loadingSpinner = (
        <div className="search-loading-spinner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 9.11 20.84 6.47 19 4.5L17.5 6C18.93 7.37 19.99 9.14 20.45 11.13C20.69 12.05 20.5 13.02 20 13.8L18.3 15.1C18.74 14.14 19 13.1 19 12C19 7.58 15.42 4 11 4Z" fill="currentColor" />
            </svg>
        </div>
    );

    return (
        <div
            className={classNames(
                'ds-search-bar',
                `ds-search-bar-${size}`,
                `ds-search-bar-${variant}`,
                `ds-search-bar-${shape}`,
                {
                    'ds-search-bar-focused': isFocused,
                    'ds-search-bar-disabled': disabled,
                    'ds-search-bar-error': error,
                },
                className
            )}
            style={style}
        >
            <div className="ds-search-bar-input-wrapper">
                {icon || defaultIcon}
                <input
                    ref={inputRef}
                    type="text"
                    className="ds-search-bar-input"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    disabled={disabled || loading}
                    {...rest}
                />
                {clearable && value && !disabled && !loading && (
                    <button
                        className="ds-search-bar-clear-button"
                        onClick={handleClear}
                        type="button"
                        aria-label="Clear search"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor" />
                        </svg>
                    </button>
                )}
                {loading && loadingSpinner}
            </div>
            {(error || helperText) && (
                <div className={classNames('ds-search-bar-message', { 'ds-search-bar-error-message': error })}>
                    {error || helperText}
                </div>
            )}
        </div>
    );
};

export default SearchBar;