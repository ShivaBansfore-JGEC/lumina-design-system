import React from 'react';
import classNames from 'classnames';
import { GENERAL_DATA_TYPES, GENERAL_EVENTS } from '../types/types';
import Typography from '../Typography/Typography';
import './Suggestion.scss';

export interface SuggestionItem {
    id: GENERAL_DATA_TYPES['NUMBER'];
    label: GENERAL_DATA_TYPES['STRING'];
    description?: GENERAL_DATA_TYPES['STRING'];
    icon?: React.ReactNode;
    category?: GENERAL_DATA_TYPES['STRING'];
    onClick?: GENERAL_EVENTS['onClick'];
    disabled?: GENERAL_DATA_TYPES['BOOLEAN'];
}

interface SuggestionProps {
    /** List of suggestion items to display */
    suggestionList: SuggestionItem[];
    /** Search value to highlight matches */
    searchValue?: string;
    /** Whether to show item descriptions */
    showDescriptions?: boolean;
    /** Whether to show item icons */
    showIcons?: boolean;
    /** Whether to highlight matching text */
    highlightMatches?: boolean;
    /** Whether to group items by category */
    groupByCategory?: boolean;
    /** Currently selected item index */
    selectedIndex?: number;
    /** Callback when an item is clicked */
    onItemClick?: (item: SuggestionItem) => void;
    /** Callback when an item is hovered */
    onItemHover?: (index: number) => void;
    /** Custom class name */
    className?: string;
}

const Suggestion: React.FC<SuggestionProps> = ({
    suggestionList,
    searchValue = '',
    showDescriptions = true,
    showIcons = true,
    highlightMatches = true,
    groupByCategory = false,
    selectedIndex = -1,
    onItemClick,
    onItemHover,
    className,
}) => {
    const highlightText = (text: string, search: string) => {
        if (!search || !highlightMatches) return text;

        const parts = text.split(new RegExp(`(${search})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === search.toLowerCase()
                ? <span key={i} className="ds-suggestion-highlight">{part}</span>
                : part
        );
    };

    const renderSuggestionItem = (item: SuggestionItem, index: number) => {
        const isSelected = index === selectedIndex;
        const isDisabled = item.disabled;

        return (
            <div
                key={item.id}
                className={classNames('ds-suggestion-item', {
                    'ds-suggestion-item--selected': isSelected,
                    'ds-suggestion-item--disabled': isDisabled,
                })}
                onClick={() => !isDisabled && onItemClick?.(item)}
                onMouseEnter={() => onItemHover?.(index)}
                role="option"
                aria-selected={isSelected}
                aria-disabled={isDisabled}
            >
                {showIcons && item.icon && (
                    <div className="ds-suggestion-icon">
                        {item.icon}
                    </div>
                )}
                <div className="ds-suggestion-content">
                    <Typography
                        variant="body2"
                        className="ds-suggestion-label"
                    >
                        {highlightText(item.label, searchValue)}
                    </Typography>
                    {showDescriptions && item.description && (
                        <Typography
                            variant="caption"
                            className="ds-suggestion-description"
                        >
                            {highlightText(item.description, searchValue)}
                        </Typography>
                    )}
                </div>
            </div>
        );
    };

    const renderGroupedSuggestions = () => {
        const groupedItems = suggestionList.reduce((acc, item) => {
            const category = item.category || 'Other';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {} as Record<string, SuggestionItem[]>);

        return Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="ds-suggestion-group">
                <Typography
                    variant="caption"
                    className="ds-suggestion-category"
                >
                    {category}
                </Typography>
                {items.map((item, index) => renderSuggestionItem(item, index))}
            </div>
        ));
    };

    if (!suggestionList?.length) {
        return null;
    }

    return (
        <div
            className={classNames('ds-suggestion-list', className)}
            role="listbox"
        >
            {groupByCategory ? renderGroupedSuggestions() : (
                suggestionList.map((item, index) => renderSuggestionItem(item, index))
            )}
        </div>
    );
};

export default Suggestion; 