import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import './Calendar.scss';

export type CalendarMode = 'single' | 'range';
export type CalendarView = 'month' | 'year';

export interface CalendarProps {
    value?: Date | [Date, Date];
    defaultValue?: Date | [Date, Date];
    mode?: CalendarMode;
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: Date[];
    disabledDays?: number[]; // 0 = Sunday, 1 = Monday, etc.
    firstDayOfWeek?: number; // 0 = Sunday, 1 = Monday, etc.
    locale?: string;
    format?: string;
    placeholder?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    errorText?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'outlined' | 'filled' | 'underlined';
    shape?: 'rounded' | 'pill' | 'square';
    className?: string;
    style?: React.CSSProperties;
    onChange?: (value: Date | [Date, Date]) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
    value,
    defaultValue,
    mode = 'single',
    minDate,
    maxDate,
    disabledDates = [],
    disabledDays = [],
    firstDayOfWeek = 0,
    locale = 'en-US',
    format = 'MM/dd/yyyy',
    placeholder = 'Select date',
    label,
    required,
    disabled = false,
    error = false,
    helperText,
    errorText,
    size = 'medium',
    variant = 'outlined',
    shape = 'rounded',
    className,
    style,
    onChange,
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
        if (value) {
            return Array.isArray(value) ? value[0] : value;
        }
        return Array.isArray(defaultValue) ? defaultValue[0] : defaultValue || null;
    });

    const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(() => {
        if (value && Array.isArray(value)) {
            return value;
        }
        return Array.isArray(defaultValue) ? defaultValue : null;
    });

    const [tempRange, setTempRange] = useState<[Date, Date] | null>(null);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [currentView, setCurrentView] = useState<CalendarView>('month');
    const [isOpen, setIsOpen] = useState(false);
    const [isQuickSelectOpen, setIsQuickSelectOpen] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (value) {
            if (Array.isArray(value)) {
                setSelectedRange(value);
                setTempRange(value);
            } else {
                setSelectedDate(value);
            }
        }
    }, [value]);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleDateSelect = (date: Date) => {
        if (mode === 'single') {
            setSelectedDate(date);
            onChange?.(date);
            setIsOpen(false);
        } else {
            if (!tempRange || (tempRange[0] && tempRange[1])) {
                // Start new range
                setTempRange([date, null as any]);
            } else {
                // Complete the range
                const start = tempRange![0];
                const end = date;

                // Ensure start is before end
                if (start > end) {
                    setTempRange([end, start]);
                } else {
                    setTempRange([start, end]);
                }
            }
        }
    };

    const handleApplyRange = () => {
        if (tempRange && tempRange[0] && tempRange[1]) {
            setSelectedRange(tempRange);
            onChange?.(tempRange);
            setIsOpen(false);
        }
    };

    const handleCancelRange = () => {
        setTempRange(selectedRange);
        setIsOpen(false);
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handlePrevYear = () => {
        setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
    };

    const handleNextYear = () => {
        setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
    };

    const handleToday = () => {
        setCurrentDate(new Date());
        if (mode === 'single') {
            const today = new Date();
            setSelectedDate(today);
            onChange?.(today);
            setIsOpen(false);
        }
    };

    const handleQuickSelectToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsQuickSelectOpen(!isQuickSelectOpen);
    };

    const handleQuickSelect = (option: string) => {
        const now = new Date();
        let start: Date;
        let end: Date;

        switch (option) {
            case 'today':
                start = now;
                end = now;
                break;
            case 'tomorrow':
                start = new Date(now.setDate(now.getDate() + 1));
                end = start;
                break;
            case 'yesterday':
                start = new Date(now.setDate(now.getDate() - 1));
                end = start;
                break;
            case 'thisWeek':
                start = new Date(now.setDate(now.getDate() - now.getDay()));
                end = new Date(now.setDate(now.getDate() + 6));
                break;
            case 'lastWeek':
                start = new Date(now.setDate(now.getDate() - now.getDay() - 7));
                end = new Date(now.setDate(now.getDate() + 6));
                break;
            case 'thisMonth':
                start = new Date(now.getFullYear(), now.getMonth(), 1);
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                break;
            case 'lastMonth':
                start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                end = new Date(now.getFullYear(), now.getMonth(), 0);
                break;
            case 'thisQuarter':
                const quarter = Math.floor(now.getMonth() / 3);
                start = new Date(now.getFullYear(), quarter * 3, 1);
                end = new Date(now.getFullYear(), (quarter + 1) * 3, 0);
                break;
            case 'lastQuarter':
                const lastQuarter = Math.floor(now.getMonth() / 3) - 1;
                const year = lastQuarter < 0 ? now.getFullYear() - 1 : now.getFullYear();
                const quarterMonth = lastQuarter < 0 ? 3 : lastQuarter * 3;
                start = new Date(year, quarterMonth, 1);
                end = new Date(year, quarterMonth + 3, 0);
                break;
            case 'thisYear':
                start = new Date(now.getFullYear(), 0, 1);
                end = new Date(now.getFullYear(), 11, 31);
                break;
            case 'lastYear':
                start = new Date(now.getFullYear() - 1, 0, 1);
                end = new Date(now.getFullYear() - 1, 11, 31);
                break;
            default:
                return;
        }

        setSelectedRange([start, end]);
        setTempRange([start, end]);
        onChange?.([start, end]);
        setCurrentDate(start);
        setIsQuickSelectOpen(false);
    };

    const handleViewChange = () => {
        setCurrentView(currentView === 'month' ? 'year' : 'month');
    };

    const isDateDisabled = (date: Date): boolean => {
        // Check if date is in disabledDates array
        if (disabledDates.some(d =>
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        )) {
            return true;
        }

        // Check if date is in disabledDays array
        if (disabledDays.includes(date.getDay())) {
            return true;
        }

        // Check if date is before minDate
        if (minDate && date < minDate) {
            return true;
        }

        // Check if date is after maxDate
        if (maxDate && date > maxDate) {
            return true;
        }

        return false;
    };

    const isDateSelected = (date: Date): boolean => {
        if (mode === 'single') {
            return selectedDate ?
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear() : false;
        } else {
            const rangeToCheck = isOpen ? tempRange : selectedRange;
            if (!rangeToCheck || !rangeToCheck[0]) return false;
            if (!rangeToCheck[1]) {
                return date.getDate() === rangeToCheck[0].getDate() &&
                    date.getMonth() === rangeToCheck[0].getMonth() &&
                    date.getFullYear() === rangeToCheck[0].getFullYear();
            }

            return (date >= rangeToCheck[0] && date <= rangeToCheck[1]);
        }
    };

    const isDateInRange = (date: Date): boolean => {
        if (mode !== 'range' || !tempRange || !tempRange[0] || tempRange[1]) {
            return false;
        }

        return date > tempRange[0];
    };

    const formatDate = (date: Date): string => {
        if (!date) return '';

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };

        return new Intl.DateTimeFormat(locale, options).format(date);
    };

    const getDaysInMonth = (year: number, month: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number): number => {
        let day = new Date(year, month, 1).getDay();
        // Adjust for first day of week
        day = (day - firstDayOfWeek + 7) % 7;
        return day;
    };

    const renderMonthView = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const days = [];
        const dayNames = [];

        // Generate day names
        for (let i = 0; i < 7; i++) {
            const dayIndex = (firstDayOfWeek + i) % 7;
            const dayName = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(
                new Date(2020, 0, dayIndex + 1)
            );
            dayNames.push(
                <div key={`day-name-${i}`} className="ds-calendar-day-name">
                    {dayName}
                </div>
            );
        }

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="ds-calendar-day-empty"></div>);
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isDisabled = isDateDisabled(date);
            const isSelected = isDateSelected(date);
            const isInRange = isDateInRange(date);
            const isToday =
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear();

            days.push(
                <div
                    key={`day-${day}`}
                    className={classNames('ds-calendar-day', {
                        'ds-calendar-day--disabled': isDisabled,
                        'ds-calendar-day--selected': isSelected,
                        'ds-calendar-day--in-range': isInRange,
                        'ds-calendar-day--today': isToday,
                    })}
                    onClick={() => !isDisabled && handleDateSelect(date)}
                >
                    {day}
                </div>
            );
        }

        return (
            <div className="ds-calendar-month-view">
                <div className="ds-calendar-day-names">
                    {dayNames}
                </div>
                <div className="ds-calendar-days">
                    {days}
                </div>
            </div>
        );
    };

    const renderYearView = () => {
        const year = currentDate.getFullYear();
        const months = [];

        for (let month = 0; month < 12; month++) {
            const date = new Date(year, month, 1);
            const monthName = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
            const isSelected = selectedDate ?
                month === selectedDate.getMonth() &&
                year === selectedDate.getFullYear() : false;

            months.push(
                <div
                    key={`month-${month}`}
                    className={classNames('ds-calendar-month', {
                        'ds-calendar-month--selected': isSelected,
                    })}
                    onClick={() => {
                        setCurrentDate(new Date(year, month, 1));
                        setCurrentView('month');
                    }}
                >
                    {monthName}
                </div>
            );
        }

        return (
            <div className="ds-calendar-year-view">
                {months}
            </div>
        );
    };

    const getDisplayValue = (): string => {
        if (mode === 'single') {
            return selectedDate ? formatDate(selectedDate) : placeholder;
        } else {
            const rangeToDisplay = isOpen ? tempRange : selectedRange;
            if (!rangeToDisplay || !rangeToDisplay[0]) return placeholder;
            if (!rangeToDisplay[1]) return formatDate(rangeToDisplay[0]);
            return `${formatDate(rangeToDisplay[0])} - ${formatDate(rangeToDisplay[1])}`;
        }
    };

    const renderRangeInputs = () => {
        if (mode !== 'range') return null;

        return (
            <div className="ds-calendar-range-inputs">
                <div className="ds-calendar-range-input">
                    <label className="ds-calendar-range-label">Start Date</label>
                    <div className="ds-calendar-range-value">
                        {tempRange && tempRange[0] ? formatDate(tempRange[0]) : 'Not selected'}
                    </div>
                </div>
                <div className="ds-calendar-range-input">
                    <label className="ds-calendar-range-label">End Date</label>
                    <div className="ds-calendar-range-value">
                        {tempRange && tempRange[1] ? formatDate(tempRange[1]) : 'Not selected'}
                    </div>
                </div>
            </div>
        );
    };

    const isDateRangeMatchingOption = (range: [Date, Date] | null, option: string): boolean => {
        if (!range || !range[0] || !range[1]) return false;

        const now = new Date();
        const start = range[0];
        const end = range[1];

        const isSameDay = (d1: Date, d2: Date) =>
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();

        switch (option) {
            case 'today': {
                const today = new Date();
                return isSameDay(start, today) && isSameDay(end, today);
            }
            case 'tomorrow': {
                const tomorrow = new Date(now);
                tomorrow.setDate(tomorrow.getDate() + 1);
                return isSameDay(start, tomorrow) && isSameDay(end, tomorrow);
            }
            case 'yesterday': {
                const yesterday = new Date(now);
                yesterday.setDate(yesterday.getDate() - 1);
                return isSameDay(start, yesterday) && isSameDay(end, yesterday);
            }
            case 'thisWeek': {
                const weekStart = new Date(now);
                weekStart.setDate(now.getDate() - now.getDay());
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                return isSameDay(start, weekStart) && isSameDay(end, weekEnd);
            }
            case 'lastWeek': {
                const lastWeekStart = new Date(now);
                lastWeekStart.setDate(now.getDate() - now.getDay() - 7);
                const lastWeekEnd = new Date(lastWeekStart);
                lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
                return isSameDay(start, lastWeekStart) && isSameDay(end, lastWeekEnd);
            }
            case 'thisMonth': {
                const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                return isSameDay(start, monthStart) && isSameDay(end, monthEnd);
            }
            case 'lastMonth': {
                const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
                return isSameDay(start, lastMonthStart) && isSameDay(end, lastMonthEnd);
            }
            case 'thisQuarter': {
                const quarter = Math.floor(now.getMonth() / 3);
                const quarterStart = new Date(now.getFullYear(), quarter * 3, 1);
                const quarterEnd = new Date(now.getFullYear(), (quarter + 1) * 3, 0);
                return isSameDay(start, quarterStart) && isSameDay(end, quarterEnd);
            }
            case 'lastQuarter': {
                const lastQuarter = Math.floor(now.getMonth() / 3) - 1;
                const year = lastQuarter < 0 ? now.getFullYear() - 1 : now.getFullYear();
                const quarterMonth = lastQuarter < 0 ? 9 : lastQuarter * 3;
                const quarterStart = new Date(year, quarterMonth, 1);
                const quarterEnd = new Date(year, quarterMonth + 3, 0);
                return isSameDay(start, quarterStart) && isSameDay(end, quarterEnd);
            }
            case 'thisYear': {
                const yearStart = new Date(now.getFullYear(), 0, 1);
                const yearEnd = new Date(now.getFullYear(), 11, 31);
                return isSameDay(start, yearStart) && isSameDay(end, yearEnd);
            }
            case 'lastYear': {
                const lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
                const lastYearEnd = new Date(now.getFullYear() - 1, 11, 31);
                return isSameDay(start, lastYearStart) && isSameDay(end, lastYearEnd);
            }
            default:
                return false;
        }
    };

    const getSelectedQuickOption = (range: [Date, Date] | null): string => {
        if (!range) return 'Quick Select';

        const options = [
            { label: 'Today', value: 'today' },
            { label: 'Tomorrow', value: 'tomorrow' },
            { label: 'Yesterday', value: 'yesterday' },
            { label: 'This Week', value: 'thisWeek' },
            { label: 'Last Week', value: 'lastWeek' },
            { label: 'This Month', value: 'thisMonth' },
            { label: 'Last Month', value: 'lastMonth' },
            { label: 'This Quarter', value: 'thisQuarter' },
            { label: 'Last Quarter', value: 'lastQuarter' },
            { label: 'This Year', value: 'thisYear' },
            { label: 'Last Year', value: 'lastYear' },
        ];

        const selectedOption = options.find(option => isDateRangeMatchingOption(range, option.value));
        return selectedOption ? selectedOption.label : 'Quick Select';
    };

    const renderQuickSelect = () => {
        if (mode !== 'range') return null;

        const options = [
            { label: 'Today', value: 'today' },
            { label: 'Tomorrow', value: 'tomorrow' },
            { label: 'Yesterday', value: 'yesterday' },
            { label: 'This Week', value: 'thisWeek' },
            { label: 'Last Week', value: 'lastWeek' },
            { label: 'This Month', value: 'thisMonth' },
            { label: 'Last Month', value: 'lastMonth' },
            { label: 'This Quarter', value: 'thisQuarter' },
            { label: 'Last Quarter', value: 'lastQuarter' },
            { label: 'This Year', value: 'thisYear' },
            { label: 'Last Year', value: 'lastYear' },
        ];

        return (
            <div className="ds-calendar-quick-select">
                <button
                    className="ds-calendar-quick-trigger"
                    onClick={handleQuickSelectToggle}
                    type="button"
                >
                    {getSelectedQuickOption(selectedRange)}
                    <span className={classNames('ds-calendar-quick-trigger-icon', {
                        'ds-calendar-quick-trigger-icon--open': isQuickSelectOpen
                    })}>
                        ▼
                    </span>
                </button>
                {isQuickSelectOpen && (
                    <div className="ds-calendar-quick-dropdown">
                        {options.map(option => (
                            <button
                                key={option.value}
                                className={classNames('ds-calendar-quick-option', {
                                    'ds-calendar-quick-option--selected': isDateRangeMatchingOption(selectedRange, option.value)
                                })}
                                onClick={() => handleQuickSelect(option.value)}
                                type="button"
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (mode === 'single') {
            setSelectedDate(null);
            onChange?.(null as any);
        } else {
            setSelectedRange(null);
            setTempRange(null);
            onChange?.(null as any);
        }
    };

    return (
        <div
            ref={calendarRef}
            className={classNames('ds-calendar', className, {
                [`ds-calendar--${size}`]: size,
                [`ds-calendar--${variant}`]: variant,
                [`ds-calendar--${shape}`]: shape,
                'ds-calendar--disabled': disabled,
                'ds-calendar--error': error,
            })}
            style={style}
        >
            {label && (
                <label className="ds-calendar-label">
                    {label}
                    {required && <span className="ds-calendar-required">*</span>}
                </label>
            )}
            <div className="ds-calendar-trigger" onClick={handleToggle}>
                <span className="ds-calendar-value">{getDisplayValue()}</span>
                <div className="ds-calendar-icons">
                    {(selectedDate || selectedRange) && (
                        <button
                            className="ds-calendar-clear-button"
                            onClick={handleClear}
                            type="button"
                            aria-label="Clear date"
                        >
                            ✕
                        </button>
                    )}
                    <span className="ds-calendar-icon">📅</span>
                </div>
            </div>
            {isOpen && (
                <div className="ds-calendar-popup">
                    <div className="ds-calendar-header">
                        <div className="ds-calendar-navigation">
                            {currentView === 'month' ? (
                                <>
                                    <button
                                        className="ds-calendar-nav-button"
                                        onClick={handlePrevMonth}
                                        type="button"
                                    >
                                        ◀
                                    </button>
                                    <button
                                        className="ds-calendar-nav-button"
                                        onClick={handleViewChange}
                                        type="button"
                                    >
                                        {new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(currentDate)}
                                    </button>
                                    <button
                                        className="ds-calendar-nav-button"
                                        onClick={handleNextMonth}
                                        type="button"
                                    >
                                        ▶
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="ds-calendar-nav-button"
                                        onClick={handlePrevYear}
                                        type="button"
                                    >
                                        ◀
                                    </button>
                                    <button
                                        className="ds-calendar-nav-button"
                                        onClick={handleViewChange}
                                        type="button"
                                    >
                                        {currentDate.getFullYear()}
                                    </button>
                                    <button
                                        className="ds-calendar-nav-button"
                                        onClick={handleNextYear}
                                        type="button"
                                    >
                                        ▶
                                    </button>
                                </>
                            )}
                        </div>
                        {mode === 'range' && renderQuickSelect()}
                    </div>
                    {mode === 'range' && renderRangeInputs()}
                    <div className="ds-calendar-body">
                        {currentView === 'month' ? renderMonthView() : renderYearView()}
                    </div>
                    {mode === 'range' && (
                        <div className="ds-calendar-footer">
                            <button
                                className="ds-calendar-cancel-button"
                                onClick={handleCancelRange}
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                className="ds-calendar-apply-button"
                                onClick={handleApplyRange}
                                type="button"
                                disabled={!tempRange || !tempRange[0] || !tempRange[1]}
                            >
                                Apply
                            </button>
                        </div>
                    )}
                </div>
            )}
            {error && errorText && (
                <div className="ds-calendar-error">{errorText}</div>
            )}
            {!error && helperText && (
                <div className="ds-calendar-helper">{helperText}</div>
            )}
        </div>
    );
}; 