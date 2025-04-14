import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Typography from '../Typography/Typography';
import './Accordion.scss';

export type AccordionVariant = 'default' | 'bordered' | 'separated' | 'minimal';
export type AccordionSize = 'small' | 'medium' | 'large';
export type AccordionIconPosition = 'left' | 'right';

export interface AccordionItemProps {
    /**
     * The title of the accordion item
     */
    title: string;
    /**
     * The content of the accordion item
     */
    children: React.ReactNode;
    /**
     * Whether the accordion item is expanded
     */
    expanded?: boolean;
    /**
     * Whether the accordion item is disabled
     */
    disabled?: boolean;
    /**
     * Optional icon to display next to the title
     */
    icon?: React.ReactNode;
    /**
     * Optional custom class name
     */
    className?: string;
    /**
     * Optional custom styles
     */
    style?: React.CSSProperties;
    /**
     * Callback fired when the accordion item is expanded/collapsed
     */
    onChange?: (expanded: boolean) => void;
}

export interface AccordionProps {
    /**
     * The accordion items
     */
    items: AccordionItemProps[];
    /**
     * Whether multiple items can be expanded at once
     */
    multiple?: boolean;
    /**
     * The variant of the accordion
     */
    variant?: AccordionVariant;
    /**
     * The size of the accordion
     */
    size?: AccordionSize;
    /**
     * The position of the expand/collapse icon
     */
    iconPosition?: AccordionIconPosition;
    /**
     * Whether to animate the accordion items
     */
    animated?: boolean;
    /**
     * Optional custom class name
     */
    className?: string;
    /**
     * Optional custom styles
     */
    style?: React.CSSProperties;
    /**
     * Callback fired when an accordion item is expanded/collapsed
     */
    onChange?: (expandedIndices: number[]) => void;
}

const AccordionItem: React.FC<AccordionItemProps & {
    variant: AccordionVariant;
    size: AccordionSize;
    iconPosition: AccordionIconPosition;
    animated: boolean;
    isFirst: boolean;
    isLast: boolean;
}> = ({
    title,
    children,
    expanded = false,
    disabled = false,
    icon,
    className,
    style,
    onChange,
    variant,
    size,
    iconPosition,
    animated,
    isFirst,
    isLast,
}) => {
        const [isExpanded, setIsExpanded] = useState(expanded);
        const [contentHeight, setContentHeight] = useState<number | null>(null);
        const contentRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            setIsExpanded(expanded);
        }, [expanded]);

        useEffect(() => {
            if (contentRef.current) {
                setContentHeight(isExpanded ? contentRef.current.scrollHeight : 0);
            }
        }, [isExpanded, children]);

        const handleToggle = () => {
            if (!disabled) {
                const newExpanded = !isExpanded;
                setIsExpanded(newExpanded);
                onChange?.(newExpanded);
            }
        };

        const itemClasses = classNames(
            'ds-accordion-item',
            `ds-accordion-item--${variant}`,
            `ds-accordion-item--${size}`,
            {
                'ds-accordion-item--expanded': isExpanded,
                'ds-accordion-item--disabled': disabled,
                'ds-accordion-item--first': isFirst,
                'ds-accordion-item--last': isLast,
            },
            className
        );

        const headerClasses = classNames(
            'ds-accordion-header',
            `ds-accordion-header--${iconPosition}`,
            {
                'ds-accordion-header--expanded': isExpanded,
                'ds-accordion-header--disabled': disabled,
            }
        );

        const contentClasses = classNames(
            'ds-accordion-content',
            {
                'ds-accordion-content--expanded': isExpanded,
                'ds-accordion-content--animated': animated,
            }
        );

        const contentStyle: React.CSSProperties = {
            ...style,
            ...(animated && contentHeight !== null
                ? { height: `${contentHeight}px` }
                : {}),
        };

        return (
            <div className={itemClasses}>
                <div
                    className={headerClasses}
                    onClick={handleToggle}
                    role="button"
                    tabIndex={disabled ? -1 : 0}
                    aria-expanded={isExpanded}
                    aria-disabled={disabled}
                >
                    {iconPosition === 'left' && icon && (
                        <div className="ds-accordion-icon ds-accordion-icon--left">
                            {icon}
                        </div>
                    )}
                    <Typography
                        variant={size === 'small' ? 'body2' : 'body1'}
                        weight="medium"
                        className="ds-accordion-title"
                    >
                        {title}
                    </Typography>
                    <div className="ds-accordion-icon ds-accordion-icon--expand">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={isExpanded ? 'ds-accordion-icon--expanded' : ''}
                        >
                            <path
                                d="M4 6L8 10L12 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    {iconPosition === 'right' && icon && (
                        <div className="ds-accordion-icon ds-accordion-icon--right">
                            {icon}
                        </div>
                    )}
                </div>
                <div
                    className={contentClasses}
                    style={contentStyle}
                    ref={contentRef}
                    role="region"
                    aria-hidden={!isExpanded}
                >
                    <div className="ds-accordion-content-inner">{children}</div>
                </div>
            </div>
        );
    };

const Accordion: React.FC<AccordionProps> = ({
    items,
    multiple = false,
    variant = 'default',
    size = 'medium',
    iconPosition = 'right',
    animated = true,
    className,
    style,
    onChange,
}) => {
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

    const handleItemChange = (index: number, expanded: boolean) => {
        let newExpandedIndices: number[];

        if (multiple) {
            if (expanded) {
                newExpandedIndices = [...expandedIndices, index];
            } else {
                newExpandedIndices = expandedIndices.filter((i) => i !== index);
            }
        } else {
            newExpandedIndices = expanded ? [index] : [];
        }

        setExpandedIndices(newExpandedIndices);
        onChange?.(newExpandedIndices);
    };

    const accordionClasses = classNames(
        'ds-accordion',
        `ds-accordion--${variant}`,
        `ds-accordion--${size}`,
        className
    );

    return (
        <div className={accordionClasses} style={style}>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    {...item}
                    variant={variant}
                    size={size}
                    iconPosition={iconPosition}
                    animated={animated}
                    expanded={expandedIndices.includes(index)}
                    onChange={(expanded) => handleItemChange(index, expanded)}
                    isFirst={index === 0}
                    isLast={index === items.length - 1}
                />
            ))}
        </div>
    );
};

export default Accordion; 