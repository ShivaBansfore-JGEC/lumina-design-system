import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import './Editor.scss';

export type EditorSize = 'small' | 'medium' | 'large';
export type EditorVariant = 'outlined' | 'filled' | 'underlined';
export type EditorShape = 'rounded' | 'pill' | 'square';

export interface EditorProps {
    /**
     * The initial content of the editor
     */
    initialContent?: string;
    /**
     * Callback fired when the content changes
     */
    onChange?: (content: string) => void;
    /**
     * The placeholder text to display when the editor is empty
     */
    placeholder?: string;
    /**
     * The label for the editor
     */
    label?: string;
    /**
     * Whether the editor is required
     */
    required?: boolean;
    /**
     * Whether the editor is disabled
     */
    disabled?: boolean;
    /**
     * Whether the editor is in an error state
     */
    error?: boolean;
    /**
     * Helper text to display below the editor
     */
    helperText?: string;
    /**
     * Error text to display when the editor is in an error state
     */
    errorText?: string;
    /**
     * The size of the editor
     */
    size?: EditorSize;
    /**
     * The variant of the editor
     */
    variant?: EditorVariant;
    /**
     * The shape of the editor
     */
    shape?: EditorShape;
    /**
     * Whether to show the toolbar
     */
    showToolbar?: boolean;
    /**
     * Whether to allow image uploads
     */
    allowImages?: boolean;
    /**
     * Maximum file size for image uploads in MB
     */
    maxImageSize?: number;
    /**
     * Allowed image file types
     */
    allowedImageTypes?: string[];
    /**
     * Callback fired when an image is uploaded
     */
    onImageUpload?: (file: File) => Promise<string>;
    /**
     * Custom class name
     */
    className?: string;
    /**
     * Custom styles
     */
    style?: React.CSSProperties;
    /**
     * Minimum height of the editor
     */
    minHeight?: string | number;
    /**
     * Maximum height of the editor
     */
    maxHeight?: string | number;
    /**
     * Whether to auto-focus the editor on mount
     */
    autoFocus?: boolean;
    /**
     * Whether to show character count
     */
    showCharCount?: boolean;
    /**
     * Maximum number of characters allowed
     */
    maxChars?: number;
}

const FONT_FAMILIES = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Verdana', label: 'Verdana' },
];

const FONT_SIZES = [
    { value: '1', label: '8px' },
    { value: '2', label: '10px' },
    { value: '3', label: '12px' },
    { value: '4', label: '14px' },
    { value: '5', label: '18px' },
    { value: '6', label: '24px' },
    { value: '7', label: '36px' },
];

const Editor: React.FC<EditorProps> = ({
    initialContent = '',
    onChange,
    placeholder = 'Start typing...',
    label,
    required = false,
    disabled = false,
    error = false,
    helperText,
    errorText,
    size = 'medium',
    variant = 'outlined',
    shape = 'rounded',
    showToolbar = true,
    allowImages = true,
    maxImageSize = 5,
    allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    onImageUpload,
    className,
    style,
    minHeight = '200px',
    maxHeight = '500px',
    autoFocus = false,
    showCharCount = false,
    maxChars,
}) => {
    const [content, setContent] = useState(initialContent);
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(initialContent.length);
    const [isUploading, setIsUploading] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showLinkDialog, setShowLinkDialog] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [selectedFontFamily, setSelectedFontFamily] = useState('Arial');
    const [selectedFontSize, setSelectedFontSize] = useState('4');
    const [selectedTextColor, setSelectedTextColor] = useState('#000000');
    const [selectedBgColor, setSelectedBgColor] = useState('#ffffff');

    useEffect(() => {
        if (autoFocus && editorRef.current) {
            editorRef.current.focus();
        }
    }, [autoFocus]);

    useEffect(() => {
        setContent(initialContent);
        setCharCount(initialContent.length);
    }, [initialContent]);

    const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
        const newContent = e.currentTarget.innerHTML;
        setContent(newContent);
        setCharCount(newContent.replace(/<[^>]*>/g, '').length);
        onChange?.(newContent);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!allowedImageTypes.includes(file.type)) {
            alert(`File type not allowed. Allowed types: ${allowedImageTypes.join(', ')}`);
            return;
        }

        // Validate file size
        if (file.size > maxImageSize * 1024 * 1024) {
            alert(`File size exceeds the limit of ${maxImageSize}MB`);
            return;
        }

        if (onImageUpload) {
            try {
                setIsUploading(true);
                const imageUrl = await onImageUpload(file);
                insertImage(imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Failed to upload image. Please try again.');
            } finally {
                setIsUploading(false);
            }
        } else {
            // If no upload handler is provided, create a local URL
            const imageUrl = URL.createObjectURL(file);
            insertImage(imageUrl);
        }
    };

    const insertImage = (imageUrl: string) => {
        if (!editorRef.current) return;

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Uploaded image';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.margin = '10px 0';

        // Insert at cursor position or at the end
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);

        if (selection && range) {
            range.insertNode(img);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            editorRef.current.appendChild(img);
        }

        // Focus back on editor
        editorRef.current.focus();
    };

    const handleImageButtonClick = () => {
        fileInputRef.current?.click();
    };

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const handleFontFamilyChange = (value: string) => {
        setSelectedFontFamily(value);
        execCommand('fontName', value);
    };

    const handleFontSizeChange = (value: string) => {
        setSelectedFontSize(value);
        execCommand('fontSize', value);
    };

    const handleTextColorChange = (color: string) => {
        setSelectedTextColor(color);
        execCommand('foreColor', color);
    };

    const handleBgColorChange = (color: string) => {
        setSelectedBgColor(color);
        execCommand('hiliteColor', color);
    };

    const handleLinkInsert = () => {
        if (linkUrl) {
            execCommand('createLink', linkUrl);
            setShowLinkDialog(false);
            setLinkUrl('');
        }
    };

    const insertTable = () => {
        const table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.margin = '10px 0';

        for (let i = 0; i < 3; i++) {
            const row = table.insertRow();
            for (let j = 0; j < 3; j++) {
                const cell = row.insertCell();
                cell.style.border = '1px solid #ddd';
                cell.style.padding = '8px';
                cell.contentEditable = 'true';
            }
        }

        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        if (selection && range) {
            range.insertNode(table);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        } else if (editorRef.current) {
            editorRef.current.appendChild(table);
        }
    };

    const insertCodeBlock = () => {
        const pre = document.createElement('pre');
        pre.style.backgroundColor = '#f5f5f5';
        pre.style.padding = '10px';
        pre.style.borderRadius = '4px';
        pre.style.fontFamily = 'monospace';
        pre.contentEditable = 'true';

        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        if (selection && range) {
            range.insertNode(pre);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        } else if (editorRef.current) {
            editorRef.current.appendChild(pre);
        }
    };

    const editorClasses = classNames(
        'ds-editor',
        `ds-editor--${size}`,
        `ds-editor--${variant}`,
        `ds-editor--${shape}`,
        {
            'ds-editor--focused': isFocused,
            'ds-editor--disabled': disabled,
            'ds-editor--error': error,
        },
        className
    );

    const editorStyle: React.CSSProperties = {
        ...style,
        minHeight,
        maxHeight,
    };

    return (
        <div className="ds-editor-container">
            {label && (
                <div className="ds-editor-label">
                    <Typography variant="body2" weight="medium">
                        {label}
                        {required && <span className="ds-editor-required">*</span>}
                    </Typography>
                </div>
            )}

            <div className={editorClasses} style={editorStyle}>
                {showToolbar && (
                    <div className="ds-editor-toolbar">
                        <div className="ds-editor-toolbar-group">
                            <Dropdown
                                value={selectedFontFamily}
                                onChange={(value) => handleFontFamilyChange(value as string)}
                                items={FONT_FAMILIES}
                                size="small"
                                variant="outlined"
                                className="ds-editor-select"
                                triggerVariant="default"
                            />
                            <Dropdown
                                value={selectedFontSize}
                                onChange={(value) => handleFontSizeChange(value as string)}
                                items={FONT_SIZES}
                                size="small"
                                variant="outlined"
                                className="ds-editor-select"
                                triggerVariant="default"
                            />
                        </div>

                        <div className="ds-editor-toolbar-group">
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">B</span>}
                                onClick={() => execCommand('bold')}
                                disabled={disabled}
                            />
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">I</span>}
                                onClick={() => execCommand('italic')}
                                disabled={disabled}
                            />
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">U</span>}
                                onClick={() => execCommand('underline')}
                                disabled={disabled}
                            />
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">S</span>}
                                onClick={() => execCommand('strikethrough')}
                                disabled={disabled}
                            />
                        </div>

                        <div className="ds-editor-toolbar-group">
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">H1</span>}
                                onClick={() => execCommand('formatBlock', '<h1>')}
                                disabled={disabled}
                            />
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">H2</span>}
                                onClick={() => execCommand('formatBlock', '<h2>')}
                                disabled={disabled}
                            />
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">H3</span>}
                                onClick={() => execCommand('formatBlock', '<h3>')}
                                disabled={disabled}
                            />
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">P</span>}
                                onClick={() => execCommand('formatBlock', '<p>')}
                                disabled={disabled}
                            />
                        </div>

                        <div className="ds-editor-toolbar-group">
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">•</span>}
                                onClick={() => execCommand('insertUnorderedList')}
                                disabled={disabled}
                            />
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">1.</span>}
                                onClick={() => execCommand('insertOrderedList')}
                                disabled={disabled}
                            />
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">❝</span>}
                                onClick={() => execCommand('formatBlock', '<blockquote>')}
                                disabled={disabled}
                            />
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">⌨️</span>}
                                onClick={insertCodeBlock}
                                disabled={disabled}
                            />
                        </div>

                        <div className="ds-editor-toolbar-group">
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">←</span>}
                                onClick={() => execCommand('justifyLeft')}
                                disabled={disabled}
                            />
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">↔</span>}
                                onClick={() => execCommand('justifyCenter')}
                                disabled={disabled}
                            />
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">→</span>}
                                onClick={() => execCommand('justifyRight')}
                                disabled={disabled}
                            />
                        </div>

                        <div className="ds-editor-toolbar-group">
                            <input
                                type="color"
                                value={selectedTextColor}
                                onChange={(e) => handleTextColorChange(e.target.value)}
                                className="ds-editor-color-picker"
                            />
                            <input
                                type="color"
                                value={selectedBgColor}
                                onChange={(e) => handleBgColorChange(e.target.value)}
                                className="ds-editor-color-picker"
                            />
                        </div>

                        <div className="ds-editor-toolbar-group">
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">🔗</span>}
                                onClick={() => setShowLinkDialog(true)}
                                disabled={disabled}
                            />
                            <Button
                                buttonType="tertiary"
                                variant="text"
                                size="small"
                                label=""
                                leftIcon={<span className="ds-editor-icon">⊞</span>}
                                onClick={insertTable}
                                disabled={disabled}
                            />
                            {allowImages && (
                                <Button
                                    buttonType="tertiary"
                                    variant="text"
                                    size="small"
                                    label=""
                                    leftIcon={<span className="ds-editor-icon">🖼️</span>}
                                    onClick={handleImageButtonClick}
                                    disabled={disabled || isUploading}
                                    loading={isUploading}
                                />
                            )}
                        </div>
                    </div>
                )}

                {showLinkDialog && (
                    <div className="ds-editor-link-dialog">
                        <input
                            type="text"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="Enter URL"
                            className="ds-editor-link-input"
                        />
                        <Button
                            buttonType="primary"
                            variant="solid"
                            size="small"
                            label="Insert"
                            onClick={handleLinkInsert}
                        />
                        <Button
                            buttonType="tertiary"
                            variant="text"
                            size="small"
                            label="Cancel"
                            onClick={() => {
                                setShowLinkDialog(false);
                                setLinkUrl('');
                            }}
                        />
                    </div>
                )}

                <div
                    ref={editorRef}
                    className="ds-editor-content"
                    contentEditable={!disabled}
                    onInput={handleContentChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    dangerouslySetInnerHTML={{ __html: content }}
                    data-placeholder={placeholder}
                />

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept={allowedImageTypes.join(',')}
                    style={{ display: 'none' }}
                />
            </div>

            {(helperText || errorText) && (
                <div className={`ds-editor-message ${error ? 'ds-editor-error-message' : 'ds-editor-helper-message'}`}>
                    <Typography variant="caption" color={error ? 'danger' : 'muted'}>
                        {error ? errorText : helperText}
                    </Typography>
                </div>
            )}

            {showCharCount && (
                <div className="ds-editor-char-count">
                    <Typography variant="caption" color={charCount > (maxChars || 0) ? 'danger' : 'muted'}>
                        {charCount}{maxChars ? ` / ${maxChars}` : ''} characters
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default Editor;
