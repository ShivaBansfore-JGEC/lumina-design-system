import React from "react";
import { GENERAL_DATA_TYPES } from "../types/types";
import "./Option.scss";
type OptionProps = {
    type: GENERAL_DATA_TYPES["STRING"],
    title: GENERAL_DATA_TYPES["STRING"],
    descriptions: GENERAL_DATA_TYPES["STRING"],
    leftIcon: React.ReactNode,
    rightIcon: React.ReactNode,
    profileImage: GENERAL_DATA_TYPES["STRING"],
    checkBoxProps: GENERAL_DATA_TYPES["OBJECT"],
    radioProps: GENERAL_DATA_TYPES["OBJECT"]
}

const Options: React.FC<OptionProps> = ({ }) => {
    return (
        <div className="ds-option">
            List
        </div>
    )
}

Options.defaultProps = {
    type: "",
    leftIcon: null,

}

/*
 
checkbox -> checkbox_props
radio -> radio_props
icon -> icon_props


/type
1. radio options
2. checkbox options
2. simple option
4. accordian option

props:
1.leftIcon: {show: false, iconProps: {}}
2.title || custom title
3.description || or children
4.rightIcon:{ show: false, iconProps: {}}

 */

export default Options;