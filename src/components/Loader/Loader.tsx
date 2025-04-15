import React from 'react';
import classNames from 'classnames';
import './Loader.scss';

export type LoaderType = 'spinner' | 'dots' | 'pulse' | 'bounce' | 'progress' | 'skeleton' | 'wave' | 'ring' | 'ripple';
export type LoaderSize = 'small' | 'medium' | 'large';

export interface LoaderProps {
    /** Type of loader to display */
    type?: LoaderType;
    /** Size of the loader */
    size?: LoaderSize;
    /** Color of the loader */
    color?: string;
    /** Optional text to display below the loader */
    text?: string;
    /** Whether to center the loader in its container */
    centered?: boolean;
    /** Whether to show an overlay behind the loader */
    overlay?: boolean;
    /** Whether to make the loader fullscreen */
    fullscreen?: boolean;
    /** Additional CSS class name */
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({
    type = 'spinner',
    size = 'medium',
    color,
    text,
    centered = false,
    overlay = false,
    fullscreen = false,
    className,
}) => {
    const sizeClass = `ds-loader-${size}`;
    const colorStyle = color ? { '--ds-loader-color': color } as React.CSSProperties : undefined;

    const renderLoader = () => {
        switch (type) {
            case 'spinner':
                return (
                    <div className={classNames('ds-loader', sizeClass)} style={colorStyle}>
                        <div className="ds-loader-spinner" />
                    </div>
                );
            case 'dots':
                return (
                    <div className={classNames('ds-loader', 'ds-loader-dots', sizeClass)} style={colorStyle}>
                        <div className="ds-loader-dot" />
                        <div className="ds-loader-dot" />
                        <div className="ds-loader-dot" />
                    </div>
                );
            case 'pulse':
                return (
                    <div className={classNames('ds-loader', sizeClass)} style={colorStyle}>
                        <div className="ds-loader-pulse" />
                    </div>
                );
            case 'bounce':
                return (
                    <div className={classNames('ds-loader', sizeClass)} style={colorStyle}>
                        <div className="ds-loader-bounce" />
                        <div className="ds-loader-bounce" />
                        <div className="ds-loader-bounce" />
                    </div>
                );
            case 'progress':
                return <div className={classNames('ds-loader', 'ds-loader-progress', sizeClass)} style={colorStyle} />;
            case 'skeleton':
                return <div className={classNames('ds-loader', 'ds-loader-skeleton', sizeClass)} style={colorStyle} />;
            case 'wave':
                return (
                    <div className={classNames('ds-loader', 'ds-loader-wave', sizeClass)} style={colorStyle}>
                        <div className="ds-loader-wave-bar" />
                        <div className="ds-loader-wave-bar" />
                        <div className="ds-loader-wave-bar" />
                    </div>
                );
            case 'ring':
                return (
                    <div className={classNames('ds-loader', 'ds-loader-ring', sizeClass)} style={colorStyle}>
                        <div className="ds-loader-ring-circle" />
                        <div className="ds-loader-ring-circle" />
                        <div className="ds-loader-ring-circle" />
                    </div>
                );
            case 'ripple':
                return (
                    <div className={classNames('ds-loader', 'ds-loader-ripple', sizeClass)} style={colorStyle}>
                        <div className="ds-loader-ripple-circle" />
                        <div className="ds-loader-ripple-circle" />
                    </div>
                );
            default:
                return <div className={classNames('ds-loader', 'ds-loader-spinner', sizeClass)} style={colorStyle} />;
        }
    };

    const containerClasses = classNames('ds-loader-container', {
        'ds-loader-centered': centered,
        'ds-loader-overlay': overlay,
        'ds-loader-fullscreen': fullscreen,
    }, className);

    return (
        <div className={containerClasses}>
            {renderLoader()}
            {text && <div className="ds-loader-text">{text}</div>}
        </div>
    );
};

export default Loader; 