export interface PaginationProps {
    /**
     * Total number of items
     */
    totalItems: number;
    /**
     * Number of items per page
     */
    itemsPerPage: number;
    /**
     * Current active page
     */
    currentPage: number;
    /**
     * Callback function when page changes
     */
    onPageChange: (page: number) => void;
    /**
     * Number of pages to show in the pagination
     * @default 5
     */
    siblingCount?: number;
    /**
     * Custom class name for the component
     */
    className?: string;
    /**
     * Whether to show the first/last page buttons
     * @default true
     */
    showFirstLastButtons?: boolean;
    /**
     * Whether to show the previous/next page buttons
     * @default true
     */
    showPrevNextButtons?: boolean;
    /**
     * Size variant of the pagination
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Color variant of the pagination
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
}

