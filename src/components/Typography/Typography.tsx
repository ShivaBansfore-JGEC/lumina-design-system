import React from "react";
import "./Typography.scss";
import classNames from "classnames";

export type TypographyVariant =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "overline"
    | "button";

export type TypographyWeight =
    | "light"
    | "regular"
    | "medium"
    | "semibold"
    | "bold";

export type TypographyAlign =
    | "left"
    | "center"
    | "right"
    | "justify";

export type TypographyColor =
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "muted"
    | "white";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * The variant to use
     * @default "body1"
     */
    variant?: TypographyVariant;
    /**
     * The font weight to use
     * @default "regular"
     */
    weight?: TypographyWeight;
    /**
     * The text alignment
     * @default "left"
     */
    align?: TypographyAlign;
    /**
     * The text color
     */
    color?: TypographyColor;
    /**
     * Custom color for the text
     */
    textColor?: string;
    /**
     * Whether the text should be truncated with an ellipsis
     * @default false
     */
    truncate?: boolean;
    /**
     * Number of lines to show before truncating
     * Only works when truncate is true
     * @default 1
     */
    lines?: number;
    /**
     * Whether the text should be uppercase
     * @default false
     */
    uppercase?: boolean;
    /**
     * Whether the text should be lowercase
     * @default false
     */
    lowercase?: boolean;
    /**
     * Whether the text should be capitalized
     * @default false
     */
    capitalize?: boolean;
    /**
     * Whether the text should be italic
     * @default false
     */
    italic?: boolean;
    /**
     * Whether the text should be underlined
     * @default false
     */
    underline?: boolean;
    /**
     * Whether the text should be strikethrough
     * @default false
     */
    strikethrough?: boolean;
    /**
     * Whether the text should be monospace
     * @default false
     */
    monospace?: boolean;
    /**
     * Whether the text should be nowrap
     * @default false
     */
    nowrap?: boolean;
    /**
     * Whether the text should be wrapped
     * @default true
     */
    wrap?: boolean;
    /**
     * The content of the typography
     */
    children: React.ReactNode;
    /**
     * Custom class name
     */
    className?: string;
}

/**
 * Typography component for displaying text with various styles and variants
 */
const Typography = React.forwardRef<HTMLElement, TypographyProps>(
    (
        {
            variant = "body1",
            weight = "regular",
            align = "left",
            color,
            textColor,
            truncate = false,
            lines = 1,
            uppercase = false,
            lowercase = false,
            capitalize = false,
            italic = false,
            underline = false,
            strikethrough = false,
            monospace = false,
            nowrap = false,
            wrap = true,
            children,
            className,
            ...props
        },
        ref
    ) => {
        // Determine which HTML element to use based on variant
        let Component: keyof JSX.IntrinsicElements = "p";

        if (variant.startsWith("h")) {
            Component = variant as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        } else if (variant === "body1" || variant === "body2") {
            Component = "p";
        } else if (variant === "caption" || variant === "overline") {
            Component = "span";
        } else if (variant === "subtitle1" || variant === "subtitle2") {
            Component = "h6";
        } else if (variant === "button") {
            Component = "span";
        }

        const typographyClasses = classNames(
            "ds-typography",
            `ds-typography-${variant}`,
            `ds-typography-${weight}`,
            `ds-typography-${align}`,
            {
                [`ds-typography-${color}`]: color,
                "ds-typography-truncate": truncate,
                "ds-typography-uppercase": uppercase,
                "ds-typography-lowercase": lowercase,
                "ds-typography-capitalize": capitalize,
                "ds-typography-italic": italic,
                "ds-typography-underline": underline,
                "ds-typography-strikethrough": strikethrough,
                "ds-typography-monospace": monospace,
                "ds-typography-nowrap": nowrap,
                "ds-typography-wrap": wrap,
                [`ds-typography-lines-${lines}`]: truncate && lines > 1,
            },
            className
        );

        const typographyStyle: React.CSSProperties = {
            ...(textColor ? { color: textColor } : {}),
        };

        return (
            <Component
                ref={ref as any}
                className={typographyClasses}
                style={typographyStyle}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

Typography.displayName = "Typography";

export default Typography;