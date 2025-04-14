import React, { useState, useRef, useEffect, useCallback } from "react";
import classNames from "classnames";
import { GENERAL_EVENTS, GENERAL_DATA_TYPES } from "../types/types";
import "./TypeHead.scss";
import Suggestion, { SuggestionItem } from "./Suggestion";
import useTypeHeadSuggestions from "./useTypeHeadSuggession";
import SearchBar from "../SearchBar/SearchBar";
import Button from "../Button";
import Popover from "../Popover/Popover";
import Typography from "../Typography/Typography";

export type TypeHeadSize = 'small' | 'medium' | 'large';
export type TypeHeadVariant = 'outlined' | 'filled' | 'underlined';
export type TypeHeadShape = 'rounded' | 'pill' | 'square';

export interface TypeHeadProps {
  /** List of items to display in the typehead dropdown */
  listItems: SuggestionItem[];
  /** Callback when search value changes */
  onSearchChange: GENERAL_EVENTS['onChange'];
  /** Maximum number of items to show before "See more" button */
  limit: GENERAL_DATA_TYPES['NUMBER'];
  /** Callback when "See more" button is clicked */
  onSeeMoreClicked?: GENERAL_EVENTS["onClick"];
  /** Size of the typehead component */
  size?: TypeHeadSize;
  /** Visual variant of the typehead */
  variant?: TypeHeadVariant;
  /** Shape of the typehead */
  shape?: TypeHeadShape;
  /** Placeholder text for the search input */
  placeholder?: GENERAL_DATA_TYPES["STRING"];
  /** Whether to show a loading state */
  loading?: GENERAL_DATA_TYPES["BOOLEAN"];
  /** Whether to show a clear button when there is text */
  clearable?: GENERAL_DATA_TYPES["BOOLEAN"];
  /** Whether the typehead is disabled */
  disabled?: GENERAL_DATA_TYPES["BOOLEAN"];
  /** Custom class name */
  className?: GENERAL_DATA_TYPES["STRING"];
  /** Whether to group items by category */
  groupByCategory?: GENERAL_DATA_TYPES["BOOLEAN"];
  /** Whether to show item descriptions */
  showDescriptions?: GENERAL_DATA_TYPES["BOOLEAN"];
  /** Whether to show item icons */
  showIcons?: GENERAL_DATA_TYPES["BOOLEAN"];
  /** Whether to highlight matching text in suggestions */
  highlightMatches?: GENERAL_DATA_TYPES["BOOLEAN"];
  /** Whether to show "No results found" message */
  showNoResults?: GENERAL_DATA_TYPES["BOOLEAN"];
  /** Custom "No results found" message */
  noResultsMessage?: GENERAL_DATA_TYPES["STRING"];
  /** Whether to show keyboard navigation */
  keyboardNavigation?: GENERAL_DATA_TYPES["BOOLEAN"];
  /** Whether to show a footer with additional actions */
  showFooter?: GENERAL_DATA_TYPES["BOOLEAN"];
  /** Footer content */
  footer?: React.ReactNode;
}

const TypeHead: React.FC<TypeHeadProps> = ({
  listItems,
  onSearchChange,
  limit,
  onSeeMoreClicked,
  size = "medium",
  variant = "outlined",
  shape = "rounded",
  placeholder = "Search...",
  loading = false,
  clearable = true,
  disabled = false,
  className = "",
  groupByCategory = false,
  showDescriptions = true,
  showIcons = true,
  highlightMatches = true,
  showNoResults = true,
  noResultsMessage = "No results found",
  keyboardNavigation = true,
  showFooter = false,
  footer,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [showAllResults, setShowAllResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [suggestionList] = useTypeHeadSuggestions(searchValue, listItems, limit, showAllResults);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearchChange?.(event);
    setIsOpen(true);
  };

  const handleItemClick = (item: SuggestionItem) => {
    setSearchValue(item.label);
    setIsOpen(false);
    onSearchChange?.({ target: { value: item.label } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleItemHover = (index: number) => {
    setSelectedIndex(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!keyboardNavigation) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev =>
          prev < suggestionList.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestionList.length) {
          handleItemClick(suggestionList[selectedIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  const renderFooter = () => {
    const label = showAllResults ? "See less" : "See more";
    if (!suggestionList.length || (listItems.length <= suggestionList.length && !showAllResults)) return null;
    return (
      <div className="type-head-body-footer" onClick={() => setShowAllResults(state => !state)}>
        <Button label={label} buttonType="tertiary" />
      </div>
    );
  };

  const renderBody = () => {
    if (!searchValue?.length) return null;

    if (!suggestionList?.length && showNoResults) {
      return (
        <div className="type-head-no-results">
          <Typography variant="body2">{noResultsMessage}</Typography>
        </div>
      );
    }

    return (
      <div className={classNames(`type-head-body type-head-body-${size}`)}>
        <Suggestion
          suggestionList={suggestionList}
          searchValue={searchValue}
          showDescriptions={showDescriptions}
          showIcons={showIcons}
          highlightMatches={highlightMatches}
          groupByCategory={groupByCategory}
          selectedIndex={selectedIndex}
          onItemClick={handleItemClick}
          onItemHover={handleItemHover}
        />
        {renderFooter()}
      </div>
    );
  };

  return (
    <div
      className={classNames("type-head", className)}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      <SearchBar
        size={size}
        placeholder={placeholder}
        value={searchValue}
        onChange={onInputChange}
        type="text"
        loading={loading}
        clearable={clearable}
        disabled={disabled}
      />
      {isOpen && renderBody()}
    </div>
  );
};

TypeHead.defaultProps = {
  size: "small"
}

export default TypeHead;
