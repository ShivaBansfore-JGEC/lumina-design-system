import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './Sidebar.scss';

export interface SidebarItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    children?: SidebarItem[];
    onClick?: () => void;
    badge?: number | string;
    isActive?: boolean;
    isCollapsed?: boolean;
}

export interface SidebarProps {
    items: SidebarItem[];
    isCollapsed?: boolean;
    onCollapse?: (isCollapsed: boolean) => void;
    className?: string;
    logo?: React.ReactNode;
    footer?: React.ReactNode;
    width?: number;
    collapsedWidth?: number;
    theme?: 'light' | 'dark';
}

export const Sidebar: React.FC<SidebarProps> = ({
    items,
    isCollapsed: controlledCollapsed,
    onCollapse,
    className,
    logo,
    footer,
    width = 240,
    collapsedWidth = 64,
    theme = 'light',
}) => {
    const [isCollapsed, setIsCollapsed] = useState(controlledCollapsed || false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [activeItem, setActiveItem] = useState<string | null>(null);

    // Sync with controlled state if provided
    useEffect(() => {
        if (controlledCollapsed !== undefined) {
            setIsCollapsed(controlledCollapsed);
        }
    }, [controlledCollapsed]);

    const handleToggleCollapse = () => {
        const newCollapsedState = !isCollapsed;
        setIsCollapsed(newCollapsedState);
        onCollapse?.(newCollapsedState);
    };

    const handleItemClick = (item: SidebarItem) => {
        if (item.children && item.children.length > 0) {
            // Toggle expanded state for items with children
            setExpandedItems(prev =>
                prev.includes(item.id)
                    ? prev.filter(id => id !== item.id)
                    : [...prev, item.id]
            );
        } else {
            // Set active item for items without children
            setActiveItem(item.id);
            item.onClick?.();
        }
    };

    const renderSidebarItem = (item: SidebarItem, level = 0) => {
        const isExpanded = expandedItems.includes(item.id);
        const isItemActive = activeItem === item.id || item.isActive;
        const hasChildren = item.children && item.children.length > 0;

        return (
            <div
                key={item.id}
                className={classNames('ds-sidebar-item', {
                    'active': isItemActive,
                    'has-children': hasChildren,
                    'expanded': isExpanded,
                    'level': level,
                })}
            >
                <div
                    className="ds-sidebar-item-content"
                    onClick={() => handleItemClick(item)}
                >
                    {item.icon && <div className="ds-sidebar-item-icon">{item.icon}</div>}
                    {!isCollapsed && (
                        <>
                            <span className="ds-sidebar-item-label">{item.label}</span>
                            {hasChildren && (
                                <span className={classNames('ds-sidebar-item-arrow', { 'expanded': isExpanded })}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            )}
                        </>
                    )}
                    {item.badge && !isCollapsed && (
                        <span className="ds-sidebar-item-badge">{item.badge}</span>
                    )}
                </div>

                {hasChildren && isExpanded && !isCollapsed && item.children && (
                    <div className="ds-sidebar-item-children">
                        {item.children.map(child => renderSidebarItem(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className={classNames('ds-sidebar', className, theme, { 'collapsed': isCollapsed })}
            style={{
                width: isCollapsed ? collapsedWidth : width,
                '--sidebar-width': `${width}px`,
                '--sidebar-collapsed-width': `${collapsedWidth}px`,
            } as React.CSSProperties}
        >
            <div className="ds-sidebar-header">
                {logo && <div className="ds-sidebar-logo">{logo}</div>}
                <button
                    className="ds-sidebar-collapse-button"
                    onClick={handleToggleCollapse}
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div className="ds-sidebar-content">
                {items.map(item => renderSidebarItem(item))}
            </div>

            {footer && <div className="ds-sidebar-footer">{footer}</div>}
        </div>
    );
};

export default Sidebar; 