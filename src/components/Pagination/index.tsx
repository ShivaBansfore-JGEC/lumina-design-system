import React, { useMemo } from 'react';
import classNames from 'classnames';
import { PaginationProps } from './Pagination.types';
import './Pagination.scss';

const Pagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    siblingCount = 5,
    className,
    showFirstLastButtons = true,
    showPrevNextButtons = true,
    size = 'medium',
    variant = 'primary',
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginationRange = useMemo(() => {
        const range = (start: number, end: number) => {
            const length = end - start + 1;
            return Array.from({ length }, (_, idx) => idx + start);
        };

        const totalNumbers = siblingCount + 5;
        const totalBlocks = totalNumbers + 2;

        if (totalPages <= totalBlocks) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            return [...range(1, leftItemCount), '...', totalPages];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            return [1, '...', ...range(totalPages - rightItemCount + 1, totalPages)];
        }

        return [
            1,
            '...',
            ...range(leftSiblingIndex, rightSiblingIndex),
            '...',
            totalPages,
        ];
    }, [totalPages, currentPage, siblingCount]);

    const handlePageChange = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    if (totalPages <= 1) return null;

    return (
        <nav
            className={classNames(
                'pagination',
                `pagination--${size}`,
                `pagination--${variant}`,
                className
            )}
        >
            <ul className="pagination__list">
                {showFirstLastButtons && (
                    <li className="pagination__item">
                        <button
                            className="pagination__button"
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                            aria-label="Go to first page"
                        >
                            ««
                        </button>
                    </li>
                )}
                {showPrevNextButtons && (
                    <li className="pagination__item">
                        <button
                            className="pagination__button"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Go to previous page"
                        >
                            «
                        </button>
                    </li>
                )}
                {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === '...') {
                        return (
                            <li key={`ellipsis-${index}`} className="pagination__item">
                                <span className="pagination__ellipsis">•••</span>
                            </li>
                        );
                    }

                    return (
                        <li key={pageNumber} className="pagination__item">
                            <button
                                className={classNames('pagination__button', {
                                    'pagination__button--active': currentPage === pageNumber,
                                })}
                                onClick={() => handlePageChange(pageNumber as number)}
                                aria-label={`Go to page ${pageNumber}`}
                                aria-current={currentPage === pageNumber ? 'page' : undefined}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    );
                })}
                {showPrevNextButtons && (
                    <li className="pagination__item">
                        <button
                            className="pagination__button"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Go to next page"
                        >
                            »
                        </button>
                    </li>
                )}
                {showFirstLastButtons && (
                    <li className="pagination__item">
                        <button
                            className="pagination__button"
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            aria-label="Go to last page"
                        >
                            »»
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination; 