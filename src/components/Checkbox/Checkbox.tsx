import React from 'react';
import classNames from 'classnames';
import './Checkbox.scss';

export interface CheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    label?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    error?: boolean;
    helperText?: string;
    errorText?: string;
    onChange?: (checked: boolean) => void;
    className?: string;
    style?: React.CSSProperties;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    defaultChecked = false,
    indeterminate = false,
    disabled = false,
    label,
    size = 'medium',
    variant = 'primary',
    error = false,
    helperText,
    errorText,
    onChange,
    className,
    style,
}) => {
    const [isChecked, setIsChecked] = React.useState(checked ?? defaultChecked);
    const checkboxRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (checked !== undefined) {
            setIsChecked(checked);
        }
    }, [checked]);

    React.useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (checked === undefined) {
            setIsChecked(event.target.checked);
        }
        onChange?.(event.target.checked);
    };

    return (
        <div
            className={classNames('ds-checkbox', className, {
                [`ds-checkbox--${size}`]: size,
                [`ds-checkbox--${variant}`]: variant,
                'ds-checkbox--error': error,
                'ds-checkbox--disabled': disabled,
            })}
            style={style}
        >
            <label className="ds-checkbox-label">
                <input
                    type="checkbox"
                    ref={checkboxRef}
                    checked={isChecked}
                    disabled={disabled}
                    onChange={handleChange}
                />
                {label && <span className="ds-checkbox-text">{label}</span>}
            </label>
            {error && errorText && (
                <div className="ds-checkbox-error">{errorText}</div>
            )}
            {!error && helperText && (
                <div className="ds-checkbox-helper">{helperText}</div>
            )}
        </div>
    );
}; 