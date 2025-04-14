import React from 'react';
import { Story, Meta } from '@storybook/react';
import { LabelTable, LabelTableProps } from './LabelTable';

interface ExampleData {
    id: string;
    name: string;
    status: 'open' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    assignee: string;
    created: string;
    updated: string;
}

const mockData: ExampleData[] = [
    {
        id: 'TASK-1',
        name: 'Implement authentication',
        status: 'in-progress',
        priority: 'high',
        assignee: 'John Doe',
        created: '2024-01-15',
        updated: '2024-01-20',
    },
    {
        id: 'TASK-2',
        name: 'Design system updates',
        status: 'open',
        priority: 'medium',
        assignee: 'Jane Smith',
        created: '2024-01-16',
        updated: '2024-01-16',
    },
    {
        id: 'TASK-3',
        name: 'Bug fixes for release',
        status: 'done',
        priority: 'high',
        assignee: 'Mike Johnson',
        created: '2024-01-14',
        updated: '2024-01-19',
    },
];

const statusColors = {
    'open': '#0052cc',
    'in-progress': '#ff991f',
    'done': '#36b37e',
};

const priorityIcons = {
    'low': '↓',
    'medium': '→',
    'high': '↑',
};

export default {
    title: 'Components/LabelTable',
    component: LabelTable,
    parameters: {
        layout: 'padded',
    },
} as Meta;

const Template: Story<LabelTableProps<ExampleData>> = (args) => <LabelTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: mockData,
    columns: [
        {
            id: 'id',
            label: 'ID',
            accessor: 'id',
            width: '100px',
        },
        {
            id: 'name',
            label: 'Name',
            accessor: 'name',
            sortable: true,
            filterable: true,
        },
        {
            id: 'status',
            label: 'Status',
            accessor: 'status',
            sortable: true,
            filterable: true,
            width: '120px',
            renderCell: (value) => (
                <span style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '3px',
                    backgroundColor: statusColors[value as keyof typeof statusColors],
                    color: 'white',
                    fontSize: '12px',
                }}>
                    {value}
                </span>
            ),
        },
        {
            id: 'priority',
            label: 'Priority',
            accessor: 'priority',
            sortable: true,
            width: '100px',
            renderCell: (value) => (
                <span style={{ color: value === 'high' ? '#ff5630' : value === 'medium' ? '#ff991f' : '#6b778c' }}>
                    {priorityIcons[value as keyof typeof priorityIcons]} {value}
                </span>
            ),
        },
        {
            id: 'assignee',
            label: 'Assignee',
            accessor: 'assignee',
            sortable: true,
            filterable: true,
        },
        {
            id: 'created',
            label: 'Created',
            accessor: 'created',
            sortable: true,
            width: '120px',
            align: 'right',
        },
        {
            id: 'updated',
            label: 'Updated',
            accessor: 'updated',
            sortable: true,
            width: '120px',
            align: 'right',
        },
    ],
    defaultSortBy: { id: 'updated', desc: true },
    onRowClick: (row) => console.log('Clicked row:', row),
};

export const Loading = Template.bind({});
Loading.args = {
    ...Default.args,
    loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
    ...Default.args,
    data: [],
    emptyMessage: 'No tasks found',
};

export const StickyHeader = Template.bind({});
StickyHeader.args = {
    ...Default.args,
    stickyHeader: true,
    maxHeight: '400px',
    data: [...mockData, ...mockData, ...mockData], // Duplicate data for scrolling
}; 