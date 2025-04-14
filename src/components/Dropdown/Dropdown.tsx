import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import './Dropdown.scss';

export type DropdownItem = {
    value: string;
    label: string;
    icon?: string;
    children?: DropdownItem[];
    disabled?: boolean;
};

export type DropdownTriggerVariant = 'default' | 'button' | 'icon' | 'custom';

export interface DropdownProps {
    items: DropdownItem[];
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    placeholder?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    errorText?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'outlined' | 'filled' | 'underlined';
    shape?: 'rounded' | 'pill' | 'square';
    triggerVariant?: DropdownTriggerVariant;
    triggerIcon?: React.ReactNode;
    triggerContent?: React.ReactNode;
    multiple?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export const Dropdown: React.FC<DropdownProps> = ({
    items,
    value,
    onChange,
    placeholder = 'Select an option',
    label,
    required,
    disabled = false,
    error = false,
    helperText,
    errorText,
    size = 'medium',
    variant = 'outlined',
    shape = 'rounded',
    triggerVariant = 'default',
    triggerIcon,
    triggerContent,
    multiple = false,
    searchable = false,
    clearable = false,
    className,
    style,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedValues, setSelectedValues] = useState<string[]>(() => {
        if (multiple) {
            return Array.isArray(value) ? value : [];
        }
        return typeof value === 'string' ? [value] : [];
    });
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleItemClick = (item: DropdownItem) => {
        if (item.disabled) return;

        if (item.children) {
            setExpandedItems(prev =>
                prev.includes(item.value)
                    ? prev.filter(v => v !== item.value)
                    : [...prev, item.value]
            );
            return;
        }

        if (multiple) {
            const newValues = selectedValues.includes(item.value)
                ? selectedValues.filter(v => v !== item.value)
                : [...selectedValues, item.value];
            setSelectedValues(newValues);
            onChange?.(newValues);
        } else {
            setSelectedValues([item.value]);
            onChange?.(item.value);
            setIsOpen(false);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedValues([]);
        onChange?.(multiple ? [] : '');
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const getSelectedLabels = () => {
        if (selectedValues.length === 0) return placeholder;
        if (!multiple) {
            const item = findItem(items, selectedValues[0]);
            return item?.label || placeholder;
        }
        return selectedValues
            .map(v => findItem(items, v)?.label)
            .filter(Boolean)
            .join(', ');
    };

    const findItem = (items: DropdownItem[], value: string): DropdownItem | undefined => {
        for (const item of items) {
            if (item.value === value) return item;
            if (item.children) {
                const found = findItem(item.children, value);
                if (found) return found;
            }
        }
        return undefined;
    };

    const filterItems = (items: DropdownItem[]): DropdownItem[] => {
        if (!searchQuery) return items;
        return items.filter(item => {
            const matchesSearch = item.label.toLowerCase().includes(searchQuery.toLowerCase());
            if (item.children) {
                const filteredChildren = filterItems(item.children);
                return matchesSearch || filteredChildren.length > 0;
            }
            return matchesSearch;
        });
    };

    const renderItem = (item: DropdownItem, level = 0) => {
        const isSelected = selectedValues.includes(item.value);
        const isExpanded = expandedItems.includes(item.value);
        const hasChildren = item.children && item.children.length > 0;
        const filteredChildren = hasChildren && item.children ? filterItems(item.children) : [];

        return (
            <div key={item.value}>
                <div
                    className={classNames('ds-dropdown-item', {
                        'has-children': hasChildren,
                        'is-selected': isSelected,
                        'is-disabled': item.disabled,
                        'is-expanded': isExpanded,
                    })}
                    style={{ paddingLeft: `${level * 20 + 12}px` }}
                    onClick={() => handleItemClick(item)}
                >
                    {multiple && !hasChildren && (
                        <div className="ds-dropdown-checkbox">
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => { }}
                                disabled={item.disabled}
                            />
                        </div>
                    )}
                    {item.icon && <span className="ds-dropdown-item-icon">{item.icon}</span>}
                    <span className="ds-dropdown-item-label">{item.label}</span>
                    {hasChildren && (
                        <span className="ds-dropdown-arrow">
                            {isExpanded ? '▼' : '▶'}
                        </span>
                    )}
                </div>
                {hasChildren && isExpanded && (
                    <div className="ds-dropdown-submenu">
                        {filteredChildren.map(child => renderItem(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    const renderTrigger = () => {
        switch (triggerVariant) {
            case 'button':
                return (
                    <button
                        className={classNames('ds-dropdown-trigger-button', {
                            'ds-dropdown-trigger-button--primary': variant === 'filled',
                            'ds-dropdown-trigger-button--secondary': variant === 'outlined',
                            'ds-dropdown-trigger-button--text': variant === 'underlined',
                        })}
                        onClick={handleToggle}
                        disabled={disabled}
                        type="button"
                    >
                        {triggerIcon && <span className="ds-dropdown-trigger-icon">{triggerIcon}</span>}
                        <span className="ds-dropdown-value">{getSelectedLabels()}</span>
                        {clearable && selectedValues.length > 0 && (
                            <button
                                className="ds-dropdown-clear"
                                onClick={handleClear}
                                type="button"
                            >
                                ×
                            </button>
                        )}
                        <span className="ds-dropdown-arrow">▼</span>
                    </button>
                );
            case 'icon':
                return (
                    <button
                        className="ds-dropdown-trigger-icon-button"
                        onClick={handleToggle}
                        disabled={disabled}
                        type="button"
                        aria-label="Open dropdown menu"
                    >
                        {triggerIcon || '☰'}
                    </button>
                );
            case 'custom':
                return (
                    <div
                        className="ds-dropdown-trigger-custom"
                        onClick={handleToggle}
                    >
                        {triggerContent || getSelectedLabels()}
                    </div>
                );
            default:
                return (
                    <div className="ds-dropdown-trigger" onClick={handleToggle}>
                        <span className="ds-dropdown-value">{getSelectedLabels()}</span>
                        {clearable && selectedValues.length > 0 && (
                            <button
                                className="ds-dropdown-clear"
                                onClick={handleClear}
                                type="button"
                            >
                                ×
                            </button>
                        )}
                        <span className="ds-dropdown-arrow">▼</span>
                    </div>
                );
        }
    };

    return (
        <div
            ref={dropdownRef}
            className={classNames('ds-dropdown', className, {
                [`ds-dropdown--${size}`]: size,
                [`ds-dropdown--${variant}`]: variant,
                [`ds-dropdown--${shape}`]: shape,
                [`ds-dropdown--trigger-${triggerVariant}`]: triggerVariant,
                'ds-dropdown--disabled': disabled,
                'ds-dropdown--error': error,
            })}
            style={style}
        >
            {label && (
                <label className="ds-dropdown-label">
                    {label}
                    {required && <span className="ds-dropdown-required">*</span>}
                </label>
            )}
            {renderTrigger()}
            {isOpen && (
                <div className="ds-dropdown-menu">
                    {searchable && (
                        <input
                            type="text"
                            className="ds-dropdown-search"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    )}
                    <div className="ds-dropdown-items">
                        {filterItems(items).map(item => renderItem(item))}
                    </div>
                </div>
            )}
            {error && errorText && (
                <div className="ds-dropdown-error">{errorText}</div>
            )}
            {!error && helperText && (
                <div className="ds-dropdown-helper">{helperText}</div>
            )}
        </div>
    );
};

export default Dropdown; 