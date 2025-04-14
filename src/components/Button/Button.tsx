import React from "react";
import "./button.scss"
import classNames from "classnames";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Is this the principal call to action on the page?
   */
  buttonType?: "primary" | "secondary" | "tertiary" | "danger" | "success" | "warning" | "info";
  /**
   * The style variant of the button
   */
  variant?: "solid" | "outline" | "text" | "ghost";
  /**
   * What background color to use
   */
  textColor?: string;
  /**
   * Custom background color for the button
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  /**
   * Whether the button should take full width of its container
   */
  fullWidth?: boolean;
  /**
   * Icon to display before the label
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display after the label
   */
  rightIcon?: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/**
 * Primary UI component for user interaction
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    buttonType = "primary",
    variant = "solid",
    textColor,
    backgroundColor,
    size = "medium",
    onClick,
    label,
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className,
    ...props
  }, ref) => {
    const buttonClasses = classNames(
      `ds-button ds-button-${buttonType} ds-button-${size} ds-button-${variant}`,
      {
        "ds-button-loading": loading,
        "ds-button-disabled": disabled,
        "ds-button-full-width": fullWidth,
      },
      className
    );

    const buttonStyle: React.CSSProperties = {
      ...(textColor ? { color: textColor } : {}),
      ...(backgroundColor ? { backgroundColor } : {}),
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (loading || disabled) return;
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={buttonClasses}
        style={buttonStyle}
        onClick={handleClick}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="ds-button-spinner" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" strokeWidth="2" />
            </svg>
          </span>
        )}
        {leftIcon && <span className="ds-button-icon-left">{leftIcon}</span>}
        <span className="ds-button-label">{label}</span>
        {rightIcon && <span className="ds-button-icon-right">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;