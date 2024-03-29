import React from 'react';
import classNames from 'classnames';
import "./SearchBar.scss";
import { GENERAL_DATA_TYPES, GENERAL_EVENTS } from '../types/types';

interface SearchBarProps {
    placeholder?: GENERAL_DATA_TYPES["STRING"],
    searchedValue: GENERAL_DATA_TYPES["STRING"],
    onSearchChange: GENERAL_EVENTS["onChange"];
    type: GENERAL_DATA_TYPES["STRING"],
    size?: GENERAL_DATA_TYPES["STRING"]

}

const SearchBar = (props: SearchBarProps) => {
    const { type, placeholder, searchedValue, onSearchChange, size } = props || {};
    return (
        <div className='search-bar'>
            <input placeholder={placeholder} type={type} className={classNames(`search-bar-input search-bar-input-${size}`)} value={searchedValue} onChange={onSearchChange} />
        </div>
    )
}

SearchBar.defaultProps = {
    placeholder: "Search...",
    size: "small",
    type: "text"
}

export default SearchBar