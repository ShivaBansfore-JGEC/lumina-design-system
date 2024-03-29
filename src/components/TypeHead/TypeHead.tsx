import React, { useState } from "react";
import classNames from "classnames";
import { GENERAL_EVENTS, GENERAL_DATA_TYPES } from "../types/types";
import { GENERAL_TYPES } from "../../constants/constant";
import "./TypeHead.scss";
import Suggesstion from "./Suggesstion";
import useTypeHeadSuggestions from "./useTypeHeadSuggession";
import SearchBar from "../SearchBar/SearchBar";
type listItems = {
  id: GENERAL_DATA_TYPES[`NUMBER`],
  label: GENERAL_DATA_TYPES["STRING"],
  onClick: GENERAL_EVENTS["onClick"]
}

export interface TypeHeadProps {
  listItems: listItems[]
  onSeachChange: GENERAL_EVENTS['onChange'],
  limit: GENERAL_DATA_TYPES['NUMBER'],
  onSeeMoreClicked?: GENERAL_EVENTS["onClick"],
  size?: GENERAL_DATA_TYPES["STRING"]
}

const TypeHead = (props: TypeHeadProps) => {
  const { listItems, limit, size } = props || {};
  const [searchValue, setSearchValue] = useState("");
  const [showAllResults, setShowAllResults] = useState(false);

  const [suggestionList] = useTypeHeadSuggestions(searchValue, listItems, limit, showAllResults);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  }

  const renderFooter = () => {
    const label = showAllResults ? "See less" : "See more"
    if (!suggestionList.length || (listItems.length <= suggestionList.length && !showAllResults)) return null;
    return <div className="type-head-body-footer" onClick={() => setShowAllResults(state => !state)}><span className="cursor-pointer">{label}</span></div>
  }

  const renderBody = () => {
    if (!searchValue?.length || !suggestionList?.length) return null;
    return <div className={classNames(`type-head-body type-head-body-${size}`)}>
      <Suggesstion suggessionList={suggestionList} />
      {renderFooter()}
    </div>
  }

  return <div className="type-head">
    <SearchBar size={size} placeholder="Search.." searchedValue={searchValue} onSearchChange={onInputChange} type="text" />
    {renderBody()}
  </div>;
};

TypeHead.defaultProps = {
  size: "small"
}

export default TypeHead;
