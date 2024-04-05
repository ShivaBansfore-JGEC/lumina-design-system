
import React, { ReactNode } from 'react';
import { GENERAL_DATA_TYPES } from '../types/types';
import "./Typography.scss";

type TypographyProps = {
    type: "heading-1" | "heading-2" | "heading-3" | "heading-4" | "heading-5" | "heading-6" | "heading-7" |
    "body-1" | "body-2" | "body-3" | "body-4" | "body-5" | "body-6" | "body-7" | "tertiary-text",
    children: ReactNode | GENERAL_DATA_TYPES["STRING"] | GENERAL_DATA_TYPES["NUMBER"],
    classes?: GENERAL_DATA_TYPES["STRING"]
}

const Typography: React.FC<TypographyProps> = ({ children, type, classes }) => {
    return (
        <p className={`ds-typography ${classes} ds-typography-${type}`}>{children}</p>
    )
}

Typography.defaultProps = {
    classes: ""
}

export default Typography