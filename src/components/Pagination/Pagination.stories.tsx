import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import Pagination from './index';
import { PaginationProps } from './Pagination.types';

export default {
    title: 'Components/Pagination',
    component: Pagination,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        totalItems: { control: 'number' },
        itemsPerPage: { control: 'number' },
        currentPage: { control: 'number' },
        siblingCount: { control: 'number' },
        showFirstLastButtons: { control: 'boolean' },
        showPrevNextButtons: { control: 'boolean' },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
        },
    },
} as Meta<PaginationProps>;

const Template: Story<PaginationProps> = (args: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    return (
        <Pagination
            {...args}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 1,
    siblingCount: 2,
    showFirstLastButtons: true,
    showPrevNextButtons: true,
    size: 'medium',
    variant: 'primary',
};

export const Small = Template.bind({});
Small.args = {
    ...Default.args,
    size: 'small',
};

export const Large = Template.bind({});
Large.args = {
    ...Default.args,
    size: 'large',
};

export const Secondary = Template.bind({});
Secondary.args = {
    ...Default.args,
    variant: 'secondary',
};

export const Success = Template.bind({});
Success.args = {
    ...Default.args,
    variant: 'success',
};

export const Danger = Template.bind({});
Danger.args = {
    ...Default.args,
    variant: 'danger',
};

export const Warning = Template.bind({});
Warning.args = {
    ...Default.args,
    variant: 'warning',
};

export const Info = Template.bind({});
Info.args = {
    ...Default.args,
    variant: 'info',
};

export const WithoutFirstLastButtons = Template.bind({});
WithoutFirstLastButtons.args = {
    ...Default.args,
    showFirstLastButtons: false,
};

export const WithoutPrevNextButtons = Template.bind({});
WithoutPrevNextButtons.args = {
    ...Default.args,
    showPrevNextButtons: false,
};

export const ManyPages = Template.bind({});
ManyPages.args = {
    ...Default.args,
    totalItems: 1000,
    itemsPerPage: 10,
};

export const FewPages = Template.bind({});
FewPages.args = {
    ...Default.args,
    totalItems: 20,
    itemsPerPage: 10,
}; 