import { useEffect, useState } from "react";
import { GENERAL_DATA_TYPES, GENERAL_EVENTS } from "../types/types";

type listItems = {
    id: GENERAL_DATA_TYPES[`NUMBER`],
    label: GENERAL_DATA_TYPES["STRING"],
    onClick: GENERAL_EVENTS["onClick"]
}

const useTypeHeadSuggestions = (searchValue: string, suggestionList: listItems[] , limit: GENERAL_DATA_TYPES["NUMBER"], showAllResults: GENERAL_DATA_TYPES["BOOLEAN"]) => {
    const [filteredList, setFilteredList] = useState<listItems[]>([]);

    useEffect(() => {   
        getSuggestionList();
    }, [searchValue, suggestionList, limit, showAllResults]);

    const getSuggestionList = () => {
        let results = suggestionList.filter( item => item.label.toLowerCase()?.includes(searchValue.toLowerCase()));
        if(!showAllResults)
            results = results.slice(0, limit)
        setFilteredList(results)
    }
    return [filteredList];
}

export default useTypeHeadSuggestions;