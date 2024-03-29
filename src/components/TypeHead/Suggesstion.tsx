import React from 'react';
import { GENERAL_DATA_TYPES, GENERAL_EVENTS } from '../types/types';

type listItems = {
    id: GENERAL_DATA_TYPES[`NUMBER`],
    label: GENERAL_DATA_TYPES["STRING"],
    onClick: GENERAL_EVENTS["onClick"]
}

interface Props {
    suggessionList: listItems[]
}

const Suggesstion = (props: Props) => {
    const { suggessionList } = props || {};
    const renderSuggestionList = () => {
        if (!suggessionList?.length) return null;
        return suggessionList.map(element => (
            <div className='suggesion-list-item'>{element.label}</div>
        ))
    }

    return (
        <div className='suggesion-list'>
            {renderSuggestionList()}
        </div>
    )
}

export default Suggesstion