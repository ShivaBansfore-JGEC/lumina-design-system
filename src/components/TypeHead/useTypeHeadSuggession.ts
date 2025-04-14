import { useEffect, useState } from "react";
import { GENERAL_DATA_TYPES } from "../types/types";
import { SuggestionItem } from "./Suggestion";

const useTypeHeadSuggestions = (
    searchValue: string,
    suggestionList: SuggestionItem[],
    limit: GENERAL_DATA_TYPES["NUMBER"],
    showAllResults: GENERAL_DATA_TYPES["BOOLEAN"]
) => {
    const [filteredList, setFilteredList] = useState<SuggestionItem[]>([]);

    useEffect(() => {
        getSuggestionList();
    }, [searchValue, suggestionList, limit, showAllResults]);

    const getSuggestionList = () => {
        let results = suggestionList.filter(item =>
            item.label.toLowerCase()?.includes(searchValue.toLowerCase())
        );
        if (!showAllResults) {
            results = results.slice(0, limit);
        }
        setFilteredList(results);
    };

    return [filteredList];
};

export default useTypeHeadSuggestions;