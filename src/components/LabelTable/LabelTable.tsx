import React, { useState, useMemo, useCallback } from 'react';
import './LabelTable.scss';

export interface Column<T> {
    id: string;
    label: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    sortable?: boolean;
    filterable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
    renderCell?: (value: any, row: T) => React.ReactNode;
    renderFilter?: (value: any, onChange: (value: any) => void) => React.ReactNode;
}

export interface LabelTableProps<T> {
    data: T[];
    columns: Column<T>[];
    defaultSortBy?: { id: string; desc: boolean };
    onRowClick?: (row: T) => void;
    rowKey?: keyof T | ((row: T) => string);
    className?: string;
    stickyHeader?: boolean;
    maxHeight?: string;
    loading?: boolean;
    emptyMessage?: string;
    renderCustomFilter?: (column: Column<T>) => React.ReactNode;
    onSort?: (sortBy: { id: string; desc: boolean }) => void;
    onFilter?: (filters: Record<string, any>) => void;
}

export function LabelTable<T extends Record<string, any>>({
    data,
    columns,
    defaultSortBy,
    onRowClick,
    rowKey = 'id',
    className = '',
    stickyHeader = false,
    maxHeight,
    loading = false,
    emptyMessage = 'No data available',
    renderCustomFilter,
    onSort,
    onFilter,
}: LabelTableProps<T>) {
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [filters, setFilters] = useState<Record<string, any>>({});

    const handleSort = useCallback((columnId: string) => {
        const column = columns.find(col => col.id === columnId);
        if (!column?.sortable) return;

        const newSortBy = {
            id: columnId,
            desc: sortBy?.id === columnId ? !sortBy.desc : false
        };
        setSortBy(newSortBy);
        onSort?.(newSortBy);
    }, [columns, sortBy, onSort]);

    const handleFilter = useCallback((columnId: string, value: any) => {
        const newFilters = { ...filters, [columnId]: value };
        setFilters(newFilters);
        onFilter?.(newFilters);
    }, [filters, onFilter]);

    const sortedAndFilteredData = useMemo(() => {
        let result = [...data];

        // Apply filters
        Object.entries(filters).forEach(([columnId, filterValue]) => {
            if (filterValue == null) return;
            const column = columns.find(col => col.id === columnId);
            if (!column) return;

            result = result.filter(row => {
                const value = typeof column.accessor === 'function'
                    ? column.accessor(row)
                    : row[column.accessor];
                return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
            });
        });

        // Apply sorting
        if (sortBy) {
            const column = columns.find(col => col.id === sortBy.id);
            if (column) {
                result.sort((a, b) => {
                    const aValue = typeof column.accessor === 'function'
                        ? column.accessor(a)
                        : a[column.accessor];
                    const bValue = typeof column.accessor === 'function'
                        ? column.accessor(b)
                        : b[column.accessor];

                    if (aValue === bValue) return 0;
                    if (aValue == null) return 1;
                    if (bValue == null) return -1;

                    const result = aValue < bValue ? -1 : 1;
                    return sortBy.desc ? -result : result;
                });
            }
        }

        return result;
    }, [data, columns, sortBy, filters]);

    const getRowKey = useCallback((row: T) => {
        if (typeof rowKey === 'function') {
            return rowKey(row);
        }
        return String(row[rowKey]);
    }, [rowKey]);

    return (
        <div
            className={`ds-label-table-container ${className} ${stickyHeader ? 'sticky-header' : ''}`}
            style={{ maxHeight }}
        >
            <table className="ds-label-table">
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th
                                key={column.id}
                                style={{ width: column.width }}
                                className={`
                                    ${column.align ? `align-${column.align}` : ''}
                                    ${column.sortable ? 'sortable' : ''}
                                    ${sortBy?.id === column.id ? `sorted-${sortBy.desc ? 'desc' : 'asc'}` : ''}
                                `}
                                onClick={() => column.sortable && handleSort(column.id)}
                            >
                                <div className="th-content">
                                    {column.label}
                                    {column.sortable && (
                                        <span className="sort-icon">
                                            {sortBy?.id === column.id ? (
                                                sortBy.desc ? '▼' : '▲'
                                            ) : '⇅'}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                    {(renderCustomFilter || columns.some(col => col.filterable)) && (
                        <tr className="filter-row">
                            {columns.map(column => (
                                <th key={`filter-${column.id}`}>
                                    {column.filterable && (
                                        renderCustomFilter ? (
                                            renderCustomFilter(column)
                                        ) : column.renderFilter ? (
                                            column.renderFilter(
                                                filters[column.id],
                                                value => handleFilter(column.id, value)
                                            )
                                        ) : (
                                            <input
                                                type="text"
                                                value={filters[column.id] || ''}
                                                onChange={e => handleFilter(column.id, e.target.value)}
                                                placeholder={`Filter ${column.label}`}
                                                className="filter-input"
                                            />
                                        )
                                    )}
                                </th>
                            ))}
                        </tr>
                    )}
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length} className="loading-cell">
                                <div className="loading-spinner" />
                                Loading...
                            </td>
                        </tr>
                    ) : sortedAndFilteredData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="empty-cell">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        sortedAndFilteredData.map(row => (
                            <tr
                                key={getRowKey(row)}
                                onClick={() => onRowClick?.(row)}
                                className={onRowClick ? 'clickable' : ''}
                            >
                                {columns.map(column => (
                                    <td
                                        key={`${getRowKey(row)}-${column.id}`}
                                        className={column.align ? `align-${column.align}` : ''}
                                    >
                                        {column.renderCell ? (
                                            column.renderCell(
                                                typeof column.accessor === 'function'
                                                    ? column.accessor(row)
                                                    : row[column.accessor],
                                                row
                                            )
                                        ) : typeof column.accessor === 'function' ? (
                                            column.accessor(row)
                                        ) : (
                                            row[column.accessor]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
} 