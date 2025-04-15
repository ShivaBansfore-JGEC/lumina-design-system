import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './Tab.scss';

export interface TabItem {
    id: string;
    label: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    badge?: number | string;
}

export interface TabProps {
    items: TabItem[];
    defaultActiveTab?: string;
    onChange?: (tabId: string) => void;
    variant?: 'default' | 'pills' | 'underline' | 'card';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    animated?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export const Tab: React.FC<TabProps> = ({
    items,
    defaultActiveTab,
    onChange,
    variant = 'default',
    size = 'medium',
    fullWidth = false,
    animated = true,
    className,
    style,
}) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab || items[0]?.id);

    useEffect(() => {
        if (defaultActiveTab) {
            setActiveTab(defaultActiveTab);
        }
    }, [defaultActiveTab]);

    const handleTabClick = (tabId: string) => {
        const tab = items.find(item => item.id === tabId);
        if (tab && !tab.disabled) {
            setActiveTab(tabId);
            onChange?.(tabId);
        }
    };

    const containerClasses = classNames(
        'pixel-tab',
        `pixel-tab--${variant}`,
        `pixel-tab--${size}`,
        {
            'pixel-tab--full-width': fullWidth,
            'pixel-tab--animated': animated,
        },
        className
    );

    const tabListClasses = classNames(
        'pixel-tab__list',
        `pixel-tab__list--${variant}`,
        `pixel-tab__list--${size}`
    );

    return (
        <div className={containerClasses} style={style}>
            <div className={tabListClasses} role="tablist">
                {items.map((item) => {
                    const isActive = activeTab === item.id;
                    const tabClasses = classNames(
                        'pixel-tab__item',
                        `pixel-tab__item--${variant}`,
                        {
                            'pixel-tab__item--active': isActive,
                            'pixel-tab__item--disabled': item.disabled,
                        }
                    );

                    return (
                        <button
                            key={item.id}
                            className={tabClasses}
                            onClick={() => handleTabClick(item.id)}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`tabpanel-${item.id}`}
                            disabled={item.disabled}
                            type="button"
                        >
                            {item.icon && (
                                <span className="pixel-tab__icon">{item.icon}</span>
                            )}
                            <span className="pixel-tab__label">{item.label}</span>
                            {item.badge !== undefined && (
                                <span className="pixel-tab__badge">{item.badge}</span>
                            )}
                        </button>
                    );
                })}
            </div>
            <div className="pixel-tab__content">
                {items.map((item) => (
                    <div
                        key={item.id}
                        role="tabpanel"
                        id={`tabpanel-${item.id}`}
                        aria-labelledby={`tab-${item.id}`}
                        className={classNames('pixel-tab__panel', {
                            'pixel-tab__panel--active': activeTab === item.id,
                        })}
                        hidden={activeTab !== item.id}
                    >
                        {item.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tab; 