import React, { useState } from 'react';
import "./Popover.scss";
import Button from '../Button';

export interface popoverPropsType {
    children: React.ReactNode
}

const Popover = (props: popoverPropsType) => {
    return (
        <div className={"popover-wrapper"}>
            {props.children}
        </div>
    )
}

export default Popover