import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import './LabelTable.scss';

export interface Column<T> {
    id: string;
    label: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    sortable?: boolean;
    filterable?: boolean;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    fixed?: 'left' | 'right';
    resizable?: boolean;
    align?: 'left' | 'center' | 'right';
    renderCell?: (value: any, row: T) => React.ReactNode;
    renderFilter?: (value: any, onChange: (value: any) => void) => React.ReactNode;
    hidden?: boolean;
}

export interface PaginationOptions {
    pageSize: number;
    pageSizeOptions?: number[];
    currentPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}

export interface SearchOptions {
    placeholder?: string;
    searchableFields?: string[];
    onSearch?: (searchTerm: string) => void;
    debounceTime?: number;
}

export interface ColumnSelectorOptions {
    enabled?: boolean;
    allowColumnHiding?: boolean;
    allowColumnReordering?: boolean;
    onColumnsChange?: (columns: Column<any>[]) => void;
}

export interface FilterOption {
    id: string;
    label: string;
    type: 'text' | 'select' | 'date' | 'number' | 'checkbox' | 'custom';
    options?: { label: string; value: any }[];
    placeholder?: string;
    defaultValue?: any;
    render?: (value: any, onChange: (value: any) => void) => React.ReactNode;
}

export interface FilterOptions {
    enabled?: boolean;
    filters?: FilterOption[];
    onFilterChange?: (filters: Record<string, any>) => void;
    showFilterButton?: boolean;
    filterButtonLabel?: string;
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
    pagination?: PaginationOptions;
    search?: SearchOptions;
    showVerticalBorders?: boolean;
    horizontalScroll?: boolean;
    columnSelector?: ColumnSelectorOptions;
    filterOptions?: FilterOptions;
}

export function LabelTable<T extends Record<string, any>>({
    data,
    columns: initialColumns,
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
    pagination,
    search,
    showVerticalBorders = false,
    horizontalScroll = true,
    columnSelector,
    filterOptions,
}: LabelTableProps<T>) {
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
    const [resizingColumn, setResizingColumn] = useState<string | null>(null);
    const [startX, setStartX] = useState(0);
    const [startWidth, setStartWidth] = useState(0);
    const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);
    const [columns, setColumns] = useState<Column<T>[]>(initialColumns);
    const [filterValues, setFilterValues] = useState<Record<string, any>>({});
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const tableRef = useRef<HTMLTableElement>(null);
    const resizeTimeoutRef = useRef<number | null>(null);
    const searchTimeoutRef = useRef<number | null>(null);
    const columnSelectorRef = useRef<HTMLDivElement>(null);
    const filterPanelRef = useRef<HTMLDivElement>(null);

    // Initialize filter values from default values
    useEffect(() => {
        if (filterOptions?.filters) {
            const initialFilterValues: Record<string, any> = {};
            filterOptions.filters.forEach(filter => {
                if (filter.defaultValue !== undefined) {
                    initialFilterValues[filter.id] = filter.defaultValue;
                }
            });
            setFilterValues(initialFilterValues);
        }
    }, [filterOptions?.filters]);

    // Update columns when initialColumns change
    useEffect(() => {
        setColumns(initialColumns);
    }, [initialColumns]);

    // Handle column selector click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                columnSelectorRef.current &&
                !columnSelectorRef.current.contains(event.target as Node) &&
                isColumnSelectorOpen
            ) {
                setIsColumnSelectorOpen(false);
            }

            if (
                filterPanelRef.current &&
                !filterPanelRef.current.contains(event.target as Node) &&
                isFilterPanelOpen
            ) {
                setIsFilterPanelOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isColumnSelectorOpen, isFilterPanelOpen]);

    // Initialize column widths
    useEffect(() => {
        const initialWidths: Record<string, number> = {};
        columns.forEach(column => {
            if (column.width) {
                // Convert width to pixels if it's a string with units
                const width = column.width.includes('px')
                    ? parseInt(column.width, 10)
                    : 100; // Default width if not specified in pixels
                initialWidths[column.id] = width;
            }
        });
        setColumnWidths(initialWidths);
    }, [columns]);

    // Handle search debouncing
    useEffect(() => {
        if (search?.debounceTime) {
            const timeoutId = window.setTimeout(() => {
                setDebouncedSearchTerm(searchTerm);
            }, search.debounceTime);

            return () => clearTimeout(timeoutId);
        } else {
            setDebouncedSearchTerm(searchTerm);
            return undefined;
        }
    }, [searchTerm, search?.debounceTime]);

    // Call onSearch when debounced search term changes
    useEffect(() => {
        if (search?.onSearch && debouncedSearchTerm !== undefined) {
            search.onSearch(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm, search?.onSearch]);

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

    const handleSearch = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    // Handle filter change
    const handleFilterChange = useCallback((filterId: string, value: any) => {
        setFilterValues(prev => {
            const newFilterValues = { ...prev, [filterId]: value };

            if (filterOptions?.onFilterChange) {
                filterOptions.onFilterChange(newFilterValues);
            }

            return newFilterValues;
        });
    }, [filterOptions]);

    // Apply filters to data
    const applyFilters = useCallback((data: T[]) => {
        if (!filterOptions?.enabled || !filterOptions.filters || filterOptions.filters.length === 0) {
            return data;
        }

        return data.filter(row => {
            return filterOptions.filters!.every(filter => {
                const value = filterValues[filter.id];

                // Skip if filter has no value
                if (value === undefined || value === null || value === '') {
                    return true;
                }

                // Get the row value based on the column accessor
                const column = columns.find(col => col.id === filter.id);
                if (!column) return true;

                const rowValue = typeof column.accessor === 'function'
                    ? column.accessor(row)
                    : row[column.accessor];

                // Apply different filtering logic based on filter type
                switch (filter.type) {
                    case 'text':
                        return String(rowValue).toLowerCase().includes(String(value).toLowerCase());
                    case 'select':
                        return rowValue === value;
                    case 'checkbox':
                        return value ? true : false;
                    case 'number':
                        return Number(rowValue) === Number(value);
                    case 'date':
                        if (!rowValue || !value) return false;
                        const rowDate = new Date(String(rowValue));
                        const filterDate = new Date(String(value));
                        return rowDate.getTime() === filterDate.getTime();
                    default:
                        return true;
                }
            });
        });
    }, [columns, filterOptions, filterValues]);

    const sortedAndFilteredData = useMemo(() => {
        let result = [...data];

        // Apply search if enabled
        if (searchTerm && !search?.onSearch) {
            const searchableFields = search?.searchableFields ||
                columns.filter(col => typeof col.accessor === 'string').map(col => col.accessor as string);

            result = result.filter(row => {
                return searchableFields.some(field => {
                    const value = row[field];
                    return value && String(value).toLowerCase().includes(searchTerm.toLowerCase());
                });
            });
        }

        // Apply filters
        result = applyFilters(result);

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
    }, [data, columns, sortBy, filters, searchTerm, search?.searchableFields, search?.onSearch, applyFilters]);

    // Paginate data if pagination is enabled
    const paginatedData = useMemo(() => {
        if (!pagination) return sortedAndFilteredData;

        const { currentPage, pageSize } = pagination;
        const startIndex = (currentPage - 1) * pageSize;
        return sortedAndFilteredData.slice(startIndex, startIndex + pageSize);
    }, [sortedAndFilteredData, pagination]);

    const getRowKey = useCallback((row: T) => {
        if (typeof rowKey === 'function') {
            return rowKey(row);
        }
        return String(row[rowKey]);
    }, [rowKey]);

    // Handle column resizing
    const handleResizeStart = useCallback((e: React.MouseEvent, columnId: string) => {
        e.preventDefault();
        e.stopPropagation();

        setResizingColumn(columnId);
        setStartX(e.clientX);
        setStartWidth(columnWidths[columnId] || 100);

        document.addEventListener('mousemove', handleResizeMove);
        document.addEventListener('mouseup', handleResizeEnd);
    }, [columnWidths]);

    const handleResizeMove = useCallback((e: MouseEvent) => {
        if (!resizingColumn) return;

        const diff = e.clientX - startX;
        const newWidth = Math.max(50, startWidth + diff); // Minimum width of 50px

        // Use requestAnimationFrame for smoother resizing
        if (resizeTimeoutRef.current) {
            window.cancelAnimationFrame(resizeTimeoutRef.current);
        }

        resizeTimeoutRef.current = window.requestAnimationFrame(() => {
            setColumnWidths(prev => ({
                ...prev,
                [resizingColumn]: newWidth
            }));
        });
    }, [resizingColumn, startX, startWidth]);

    const handleResizeEnd = useCallback(() => {
        setResizingColumn(null);
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
    }, [handleResizeMove]);

    // Clean up event listeners
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleResizeMove);
            document.removeEventListener('mouseup', handleResizeEnd);
            if (resizeTimeoutRef.current) {
                window.cancelAnimationFrame(resizeTimeoutRef.current);
            }
        };
    }, [handleResizeMove, handleResizeEnd]);

    // Handle column visibility toggle
    const handleColumnVisibilityToggle = useCallback((columnId: string) => {
        setColumns(prevColumns => {
            const newColumns = prevColumns.map(column =>
                column.id === columnId
                    ? { ...column, hidden: !column.hidden }
                    : column
            );

            if (columnSelector?.onColumnsChange) {
                columnSelector.onColumnsChange(newColumns);
            }

            return newColumns;
        });
    }, [columnSelector]);

    // Handle column reordering
    const handleColumnReorder = useCallback((dragIndex: number, hoverIndex: number) => {
        setColumns(prevColumns => {
            const newColumns = [...prevColumns];
            const [draggedColumn] = newColumns.splice(dragIndex, 1);
            newColumns.splice(hoverIndex, 0, draggedColumn);

            if (columnSelector?.onColumnsChange) {
                columnSelector.onColumnsChange(newColumns);
            }

            return newColumns;
        });
    }, [columnSelector]);

    // Render column selector
    const renderColumnSelector = () => {
        if (!columnSelector?.enabled) return null;

        return (
            <div className="ds-label-table-column-selector-container">
                <button
                    className="ds-label-table-column-selector-button"
                    onClick={() => setIsColumnSelectorOpen(!isColumnSelectorOpen)}
                >
                    <span>Columns</span>
                    <span className={`ds-label-table-column-selector-icon ${isColumnSelectorOpen ? 'open' : ''}`}>
                        ▼
                    </span>
                </button>

                {isColumnSelectorOpen && (
                    <div className="ds-label-table-column-selector-dropdown" ref={columnSelectorRef}>
                        <div className="ds-label-table-column-selector-header">
                            <h4>Column Settings</h4>
                        </div>
                        <div className="ds-label-table-column-selector-content">
                            {columnSelector.allowColumnHiding && (
                                <div className="ds-label-table-column-selector-section">
                                    <h5>Show/Hide Columns</h5>
                                    <div className="ds-label-table-column-selector-list">
                                        {columns.map(column => (
                                            <div key={column.id} className="ds-label-table-column-selector-item">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={!column.hidden}
                                                        onChange={() => handleColumnVisibilityToggle(column.id)}
                                                    />
                                                    <span>{column.label}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {columnSelector.allowColumnReordering && (
                                <div className="ds-label-table-column-selector-section">
                                    <h5>Reorder Columns</h5>
                                    <div className="ds-label-table-column-selector-list">
                                        {columns.map((column, index) => (
                                            <div
                                                key={column.id}
                                                className="ds-label-table-column-selector-item"
                                                draggable
                                                onDragStart={(e) => {
                                                    e.dataTransfer.setData('text/plain', index.toString());
                                                }}
                                                onDragOver={(e) => {
                                                    e.preventDefault();
                                                    e.currentTarget.classList.add('drag-over');
                                                }}
                                                onDragLeave={(e) => {
                                                    e.currentTarget.classList.remove('drag-over');
                                                }}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    e.currentTarget.classList.remove('drag-over');
                                                    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
                                                    handleColumnReorder(dragIndex, index);
                                                }}
                                            >
                                                <span className="ds-label-table-column-selector-drag-handle">⋮</span>
                                                <span>{column.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Render search input
    const renderSearch = () => {
        if (!search) return null;

        return (
            <div className="ds-label-table-search">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder={search.placeholder || 'Search...'}
                    className="ds-label-table-search-input"
                />
            </div>
        );
    };

    // Filter out hidden columns
    const visibleColumns = useMemo(() => {
        return columns.filter(column => !column.hidden);
    }, [columns]);

    // Render filter panel
    const renderFilterPanel = () => {
        if (!filterOptions?.enabled || !filterOptions.filters || filterOptions.filters.length === 0) {
            return null;
        }

        return (
            <div className="ds-label-table-filter-container">
                {filterOptions.showFilterButton ? (
                    <button
                        className="ds-label-table-filter-button"
                        onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                    >
                        <span>{filterOptions.filterButtonLabel || 'Filters'}</span>
                        <span className={`ds-label-table-filter-icon ${isFilterPanelOpen ? 'open' : ''}`}>
                            ▼
                        </span>
                    </button>
                ) : null}

                {(!filterOptions.showFilterButton || isFilterPanelOpen) && (
                    <div className="ds-label-table-filter-panel" ref={filterPanelRef}>
                        <div className="ds-label-table-filter-header">
                            <h4>Filters</h4>
                        </div>
                        <div className="ds-label-table-filter-content">
                            {filterOptions.filters.map(filter => (
                                <div key={filter.id} className="ds-label-table-filter-item">
                                    <label>{filter.label}</label>
                                    {filter.render ? (
                                        filter.render(
                                            filterValues[filter.id],
                                            (value) => handleFilterChange(filter.id, value)
                                        )
                                    ) : (
                                        renderFilterInput(filter)
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Render filter input based on filter type
    const renderFilterInput = (filter: FilterOption) => {
        switch (filter.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={filterValues[filter.id] || ''}
                        onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                        placeholder={filter.placeholder || `Filter by ${filter.label}`}
                        className="ds-label-table-filter-input"
                    />
                );
            case 'select':
                return (
                    <select
                        value={filterValues[filter.id] || ''}
                        onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                        className="ds-label-table-filter-select"
                    >
                        <option value="">{filter.placeholder || `Select ${filter.label}`}</option>
                        {filter.options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            case 'checkbox':
                return (
                    <input
                        type="checkbox"
                        checked={!!filterValues[filter.id]}
                        onChange={(e) => handleFilterChange(filter.id, e.target.checked)}
                        className="ds-label-table-filter-checkbox"
                    />
                );
            case 'number':
                return (
                    <input
                        type="number"
                        value={filterValues[filter.id] || ''}
                        onChange={(e) => handleFilterChange(filter.id, e.target.value ? Number(e.target.value) : '')}
                        placeholder={filter.placeholder || `Filter by ${filter.label}`}
                        className="ds-label-table-filter-input"
                    />
                );
            case 'date':
                return (
                    <input
                        type="date"
                        value={filterValues[filter.id] || ''}
                        onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                        className="ds-label-table-filter-input"
                    />
                );
            default:
                return null;
        }
    };

    // Apply filters to data
    const filteredData = useMemo(() => {
        let result = [...data];

        // Apply search filter
        if (searchTerm && !search?.onSearch) {
            const searchableFields = search?.searchableFields ||
                columns.filter(col => typeof col.accessor === 'string').map(col => col.accessor as string);

            result = result.filter(row => {
                return searchableFields.some(field => {
                    const value = row[field];
                    return value && String(value).toLowerCase().includes(searchTerm.toLowerCase());
                });
            });
        }

        // Apply custom filters
        result = applyFilters(result);

        return result;
    }, [data, searchTerm, search?.searchableFields, search?.onSearch, applyFilters]);

    return (
        <div
            className={`ds-label-table-container ${className} ${stickyHeader ? 'sticky-header' : ''} ${showVerticalBorders ? 'with-vertical-borders' : ''} ${horizontalScroll ? 'with-horizontal-scroll' : ''}`}
            style={{ maxHeight }}
        >
            <div className="ds-label-table-toolbar">
                {search && renderSearch()}
                {filterOptions?.enabled && renderFilterPanel()}
                {columnSelector?.enabled && renderColumnSelector()}
            </div>
            <div className="ds-label-table-wrapper" ref={tableRef}>
                <table className="ds-label-table">
                    <thead>
                        <tr>
                            {visibleColumns.map(column => (
                                <th
                                    key={column.id}
                                    style={{
                                        width: columnWidths[column.id] ? `${columnWidths[column.id]}px` : column.width,
                                        minWidth: column.minWidth,
                                        maxWidth: column.maxWidth,
                                        position: column.fixed ? 'sticky' : 'relative',
                                        left: column.fixed === 'left' ? 0 : undefined,
                                        right: column.fixed === 'right' ? 0 : undefined,
                                        zIndex: column.fixed ? 3 : 1
                                    }}
                                    className={`
                                        ${column.align ? `align-${column.align}` : ''}
                                        ${column.sortable ? 'sortable' : ''}
                                        ${sortBy?.id === column.id ? `sorted-${sortBy.desc ? 'desc' : 'asc'}` : ''}
                                        ${column.fixed ? `fixed-${column.fixed}` : ''}
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
                                    {column.resizable && (
                                        <div
                                            className="resize-handle"
                                            onMouseDown={(e) => handleResizeStart(e, column.id)}
                                        />
                                    )}
                                </th>
                            ))}
                        </tr>
                        {(renderCustomFilter || columns.some(col => col.filterable)) && (
                            <tr className="filter-row">
                                {visibleColumns.map(column => (
                                    <th
                                        key={`filter-${column.id}`}
                                        style={{
                                            position: column.fixed ? 'sticky' : 'relative',
                                            left: column.fixed === 'left' ? 0 : undefined,
                                            right: column.fixed === 'right' ? 0 : undefined,
                                            zIndex: column.fixed ? 3 : 1
                                        }}
                                        className={column.fixed ? `fixed-${column.fixed}` : ''}
                                    >
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
                                <td colSpan={visibleColumns.length} className="loading-cell">
                                    <div className="loading-spinner" />
                                    Loading...
                                </td>
                            </tr>
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={visibleColumns.length} className="empty-cell">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map(row => (
                                <tr
                                    key={getRowKey(row)}
                                    onClick={() => onRowClick?.(row)}
                                    className={onRowClick ? 'clickable' : ''}
                                >
                                    {visibleColumns.map(column => (
                                        <td
                                            key={`${getRowKey(row)}-${column.id}`}
                                            className={`
                                                ${column.align ? `align-${column.align}` : ''}
                                                ${column.fixed ? `fixed-${column.fixed}` : ''}
                                            `}
                                            style={{
                                                position: column.fixed ? 'sticky' : 'relative',
                                                left: column.fixed === 'left' ? 0 : undefined,
                                                right: column.fixed === 'right' ? 0 : undefined,
                                                zIndex: column.fixed ? 2 : 1
                                            }}
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
            {pagination && (
                <div className="ds-label-table-pagination">
                    <div className="ds-label-table-pagination-info">
                        Showing {((pagination.currentPage - 1) * pagination.pageSize) + 1} to{' '}
                        {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)} of{' '}
                        {pagination.totalItems} entries
                    </div>
                    <div className="ds-label-table-pagination-controls">
                        <button
                            className="ds-label-table-pagination-button"
                            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                        >
                            Previous
                        </button>
                        <div className="ds-label-table-pagination-pages">
                            {(() => {
                                const totalPages = Math.ceil(pagination.totalItems / pagination.pageSize);
                                const maxVisiblePages = 5;
                                const halfVisible = Math.floor(maxVisiblePages / 2);

                                let startPage = Math.max(1, pagination.currentPage - halfVisible);
                                let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                                if (endPage - startPage + 1 < maxVisiblePages) {
                                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                                }

                                const pages = [];

                                if (startPage > 1) {
                                    pages.push(
                                        <button
                                            key={1}
                                            className="ds-label-table-pagination-page"
                                            onClick={() => pagination.onPageChange(1)}
                                        >
                                            1
                                        </button>
                                    );
                                    if (startPage > 2) {
                                        pages.push(
                                            <span key="start-ellipsis" className="ds-label-table-pagination-ellipsis">
                                                ...
                                            </span>
                                        );
                                    }
                                }

                                for (let i = startPage; i <= endPage; i++) {
                                    pages.push(
                                        <button
                                            key={i}
                                            className={`ds-label-table-pagination-page ${i === pagination.currentPage ? 'active' : ''}`}
                                            onClick={() => pagination.onPageChange(i)}
                                        >
                                            {i}
                                        </button>
                                    );
                                }

                                if (endPage < totalPages) {
                                    if (endPage < totalPages - 1) {
                                        pages.push(
                                            <span key="end-ellipsis" className="ds-label-table-pagination-ellipsis">
                                                ...
                                            </span>
                                        );
                                    }
                                    pages.push(
                                        <button
                                            key={totalPages}
                                            className="ds-label-table-pagination-page"
                                            onClick={() => pagination.onPageChange(totalPages)}
                                        >
                                            {totalPages}
                                        </button>
                                    );
                                }

                                return pages;
                            })()}
                        </div>
                        <button
                            className="ds-label-table-pagination-button"
                            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                            disabled={
                                pagination.currentPage ===
                                Math.ceil(pagination.totalItems / pagination.pageSize)
                            }
                        >
                            Next
                        </button>
                    </div>
                    {pagination.pageSizeOptions && (
                        <div className="ds-label-table-pagination-size">
                            <select
                                value={pagination.pageSize}
                                onChange={(e) =>
                                    pagination.onPageSizeChange(parseInt(e.target.value, 10))
                                }
                            >
                                {pagination.pageSizeOptions.map((size) => (
                                    <option key={size} value={size}>
                                        {size} per page
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}