import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LabelTable } from './LabelTable';

// Sample data
const generateData = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `id-${i}`,
        name: `Item ${i + 1}`,
        status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Inactive',
        category: i % 4 === 0 ? 'A' : i % 4 === 1 ? 'B' : i % 4 === 2 ? 'C' : 'D',
        date: new Date(2023, 0, i + 1).toLocaleDateString(),
        value: Math.floor(Math.random() * 1000),
        description: `This is a description for item ${i + 1}`,
    }));
};

const meta: Meta<typeof LabelTable> = {
    title: 'Components/LabelTable',
    component: LabelTable,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LabelTable>;

// Basic table
export const Basic: Story = {
    args: {
        data: generateData(10),
        columns: [
            { id: 'name', label: 'Name', accessor: 'name', sortable: true },
            { id: 'status', label: 'Status', accessor: 'status', sortable: true },
            { id: 'category', label: 'Category', accessor: 'category', sortable: true },
            { id: 'date', label: 'Date', accessor: 'date', sortable: true },
            { id: 'value', label: 'Value', accessor: 'value', sortable: true },
        ],
    },
};

// Table with pagination
export const WithPagination: Story = {
    render: (args) => {
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(10);
        const data = generateData(100);

        return (
            <LabelTable
                {...args}
                data={data}
                columns={[
                    { id: 'name', label: 'Name', accessor: 'name', sortable: true },
                    { id: 'status', label: 'Status', accessor: 'status', sortable: true },
                    { id: 'category', label: 'Category', accessor: 'category', sortable: true },
                    { id: 'date', label: 'Date', accessor: 'date', sortable: true },
                    { id: 'value', label: 'Value', accessor: 'value', sortable: true },
                ]}
                pagination={{
                    currentPage,
                    pageSize,
                    totalItems: data.length,
                    pageSizeOptions: [5, 10, 20, 50],
                    onPageChange: setCurrentPage,
                    onPageSizeChange: setPageSize,
                }}
            />
        );
    },
};

// Table with fixed columns
export const WithFixedColumns: Story = {
    args: {
        data: generateData(20),
        columns: [
            {
                id: 'name',
                label: 'Name',
                accessor: 'name',
                sortable: true,
                fixed: 'left',
                width: '150px',
            },
            { id: 'status', label: 'Status', accessor: 'status', sortable: true },
            { id: 'category', label: 'Category', accessor: 'category', sortable: true },
            { id: 'date', label: 'Date', accessor: 'date', sortable: true },
            { id: 'value', label: 'Value', accessor: 'value', sortable: true },
            {
                id: 'actions',
                label: 'Actions',
                accessor: 'id',
                fixed: 'right',
                width: '100px',
                renderCell: (value) => (
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                ),
            },
        ],
    },
};

// Table with resizable columns
export const WithResizableColumns: Story = {
    args: {
        data: generateData(15),
        columns: [
            {
                id: 'name',
                label: 'Name',
                accessor: 'name',
                sortable: true,
                resizable: true,
                width: '150px',
            },
            {
                id: 'status',
                label: 'Status',
                accessor: 'status',
                sortable: true,
                resizable: true,
                width: '120px',
            },
            {
                id: 'category',
                label: 'Category',
                accessor: 'category',
                sortable: true,
                resizable: true,
                width: '100px',
            },
            {
                id: 'date',
                label: 'Date',
                accessor: 'date',
                sortable: true,
                resizable: true,
                width: '120px',
            },
            {
                id: 'value',
                label: 'Value',
                accessor: 'value',
                sortable: true,
                resizable: true,
                width: '100px',
            },
        ],
    },
};

// Table with all features
export const AllFeatures: Story = {
    render: (args) => {
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(10);
        const data = generateData(100);

        return (
            <LabelTable
                {...args}
                data={data}
                columns={[
                    {
                        id: 'name',
                        label: 'Name',
                        accessor: 'name',
                        sortable: true,
                        fixed: 'left',
                        resizable: true,
                        width: '150px',
                    },
                    {
                        id: 'status',
                        label: 'Status',
                        accessor: 'status',
                        sortable: true,
                        resizable: true,
                        width: '120px',
                    },
                    {
                        id: 'category',
                        label: 'Category',
                        accessor: 'category',
                        sortable: true,
                        resizable: true,
                        width: '100px',
                    },
                    {
                        id: 'date',
                        label: 'Date',
                        accessor: 'date',
                        sortable: true,
                        resizable: true,
                        width: '120px',
                    },
                    {
                        id: 'value',
                        label: 'Value',
                        accessor: 'value',
                        sortable: true,
                        resizable: true,
                        width: '100px',
                    },
                    {
                        id: 'actions',
                        label: 'Actions',
                        accessor: 'id',
                        fixed: 'right',
                        width: '100px',
                        renderCell: (value) => (
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        ),
                    },
                ]}
                pagination={{
                    currentPage,
                    pageSize,
                    totalItems: data.length,
                    pageSizeOptions: [5, 10, 20, 50],
                    onPageChange: setCurrentPage,
                    onPageSizeChange: setPageSize,
                }}
            />
        );
    },
};

// Table with custom cell rendering
export const WithCustomCells: Story = {
    args: {
        data: generateData(10),
        columns: [
            { id: 'name', label: 'Name', accessor: 'name', sortable: true },
            {
                id: 'status',
                label: 'Status',
                accessor: 'status',
                sortable: true,
                renderCell: (value) => (
                    <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: value === 'Active' ? '#e3fcef' : value === 'Pending' ? '#fff7e6' : '#ffe6e6',
                        color: value === 'Active' ? '#00875a' : value === 'Pending' ? '#974f0c' : '#de350b',
                    }}>
                        {value}
                    </span>
                ),
            },
            { id: 'category', label: 'Category', accessor: 'category', sortable: true },
            { id: 'date', label: 'Date', accessor: 'date', sortable: true },
            {
                id: 'value',
                label: 'Value',
                accessor: 'value',
                sortable: true,
                align: 'right',
                renderCell: (value) => (
                    <span style={{ fontWeight: 'bold' }}>
                        ${value.toLocaleString()}
                    </span>
                ),
            },
        ],
    },
};

// Add a story for search functionality
export const WithSearch: Story = {
    args: {
        columns: [
            { id: 'id', label: 'ID', sortable: true, accessor: (row: any) => row.id },
            { id: 'name', label: 'Name', sortable: true, accessor: (row: any) => row.name },
            { id: 'status', label: 'Status', sortable: true, accessor: (row: any) => row.status },
            { id: 'value', label: 'Value', sortable: true, accessor: (row: any) => row.value },
        ],
        data: generateData(100),
        search: {
            placeholder: 'Search by name or status...',
            searchableFields: ['name', 'status'],
            debounceTime: 300,
        },
    },
};

// Add a story for dynamic search with custom handler
export const WithDynamicSearch: Story = {
    args: {
        columns: [
            { id: 'id', label: 'ID', sortable: true, accessor: (row: any) => row.id },
            { id: 'name', label: 'Name', sortable: true, accessor: (row: any) => row.name },
            { id: 'status', label: 'Status', sortable: true, accessor: (row: any) => row.status },
            { id: 'value', label: 'Value', sortable: true, accessor: (row: any) => row.value },
        ],
        data: generateData(100),
        search: {
            placeholder: 'Search...',
            searchableFields: ['name', 'status'],
            debounceTime: 500,
            onSearch: (term) => {
                console.log('Searching for:', term);
                // In a real application, this would make an API call
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 500);
                });
            },
        },
    },
};

export const WithVerticalBorders: Story = {
    args: {
        columns: [
            { id: 'name', label: 'Name', sortable: true, accessor: 'name' },
            { id: 'age', label: 'Age', sortable: true, accessor: 'age' },
            { id: 'email', label: 'Email', sortable: true, accessor: 'email' },
            { id: 'status', label: 'Status', sortable: true, accessor: 'status' },
            { id: 'value', label: 'Value', sortable: true, accessor: 'value' },
        ],
        data: generateData(100),
        showVerticalBorders: true,
    },
};

export const WithHorizontalScroll: Story = {
    args: {
        columns: [
            { id: 'name', label: 'Name', sortable: true, accessor: 'name' },
            { id: 'age', label: 'Age', sortable: true, accessor: 'age' },
            { id: 'email', label: 'Email', sortable: true, accessor: 'email' },
            { id: 'status', label: 'Status', sortable: true, accessor: 'status' },
            { id: 'value', label: 'Value', sortable: true, accessor: 'value' },
            { id: 'department', label: 'Department', sortable: true, accessor: 'department' },
            { id: 'position', label: 'Position', sortable: true, accessor: 'position' },
            { id: 'salary', label: 'Salary', sortable: true, accessor: 'salary' },
            { id: 'joinDate', label: 'Join Date', sortable: true, accessor: 'joinDate' },
            { id: 'location', label: 'Location', sortable: true, accessor: 'location' },
        ],
        data: generateData(100),
        horizontalScroll: true,
    },
};

export const WithColumnSelector: Story = {
    args: {
        columns: [
            { id: 'name', label: 'Name', sortable: true, accessor: 'name' },
            { id: 'age', label: 'Age', sortable: true, accessor: 'age' },
            { id: 'email', label: 'Email', sortable: true, accessor: 'email' },
            { id: 'status', label: 'Status', sortable: true, accessor: 'status' },
            { id: 'value', label: 'Value', sortable: true, accessor: 'value' },
            { id: 'department', label: 'Department', sortable: true, accessor: 'department' },
            { id: 'position', label: 'Position', sortable: true, accessor: 'position' },
            { id: 'salary', label: 'Salary', sortable: true, accessor: 'salary' },
            { id: 'joinDate', label: 'Join Date', sortable: true, accessor: 'joinDate' },
            { id: 'location', label: 'Location', sortable: true, accessor: 'location' },
        ],
        data: generateData(100),
        columnSelector: {
            enabled: true,
            allowColumnHiding: true,
            allowColumnReordering: true,
            onColumnsChange: (columns) => {
                console.log('Columns changed:', columns);
            },
        },
    },
};

export const WithColumnSelectorAndSearch: Story = {
    args: {
        columns: [
            { id: 'name', label: 'Name', sortable: true, accessor: 'name' },
            { id: 'age', label: 'Age', sortable: true, accessor: 'age' },
            { id: 'email', label: 'Email', sortable: true, accessor: 'email' },
            { id: 'status', label: 'Status', sortable: true, accessor: 'status' },
            { id: 'value', label: 'Value', sortable: true, accessor: 'value' },
            { id: 'department', label: 'Department', sortable: true, accessor: 'department' },
            { id: 'position', label: 'Position', sortable: true, accessor: 'position' },
            { id: 'salary', label: 'Salary', sortable: true, accessor: 'salary' },
            { id: 'joinDate', label: 'Join Date', sortable: true, accessor: 'joinDate' },
            { id: 'location', label: 'Location', sortable: true, accessor: 'location' },
        ],
        data: generateData(100),
        columnSelector: {
            enabled: true,
            allowColumnHiding: true,
            allowColumnReordering: true,
        },
        search: {
            placeholder: 'Search...',
            searchableFields: ['name', 'email', 'department', 'position'],
            debounceTime: 300,
        },
    },
}; 