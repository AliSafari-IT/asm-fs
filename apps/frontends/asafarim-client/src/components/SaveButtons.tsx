import React from 'react';

interface SaveButtonsProps {
    onSaveMarkdown: () => void;
    onSaveHtml: () => void;
    onCopyMarkdown: () => void;
    copySuccess?: boolean;
    viewBox?: string;
}

const SaveButtons: React.FC<SaveButtonsProps> = ({
    onSaveMarkdown,
    onSaveHtml,
    onCopyMarkdown,
    copySuccess = false,
    viewBox
}) => {

    const handleCopy = () => {
        onCopyMarkdown();
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
    };

    const handleSaveHtml = () => {
        onSaveHtml();
    };

    const handleSaveMarkdown = () => {
        onSaveMarkdown();
    };

    const setCopySuccess = (success: boolean) => {
        setCopySuccess(success);
    }

    return (
        <div className="save-buttons ">
            {/* Copy to Clipboard */}
            <button
                className={`px-4 py-1 rounded info ${copySuccess ? 'bg-green-500 text-white' : ''}`}
                onClick={handleCopy}
            >
                <svg xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox={viewBox}
                    height="1.25em"
                    width="4.25em"
                >
                    <title>Copy Markdown to Clipboard</title>
                    <text x="-30" y="18" fontSize="16px">MD</text>
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                </svg>
                <span className="primary">{copySuccess ? 'Copied to clipboard!' : ''}</span>
            </button>

            {/* Save Markdown to File */}
            <button className="px-2 py-1 rounded ml-2 info" onClick={handleSaveMarkdown}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox={viewBox}
                    height="1.25em"
                    width="4em"
                >
                    <title>Save Markdown to File</title>
                    <text x="-30" y="18" fontSize="16px">MD</text>
                    <path fill="none" d="M9 14H15V19H9zM11 5H13V7H11z"></path><path fill="none" d="M7,14c0-1.103,0.897-2,2-2h6c1.103,0,2,0.897,2,2v5h2.001L19,8.414L15.586,5H15v4h-1h-1h-2H9H7V5H5v14h2V14z"></path><path d="M5,21h14c1.103,0,2-0.897,2-2V8c0-0.265-0.105-0.52-0.293-0.707l-4-4C16.52,3.105,16.266,3,16,3H5C3.897,3,3,3.897,3,5v14 C3,20.103,3.897,21,5,21z M15,19H9v-5h6V19z M13,7h-2V5h2V7z M5,5h2v4h2h2h2h1h1V5h0.586L19,8.414L19.001,19H17v-5 c0-1.103-0.897-2-2-2H9c-1.103,0-2,0.897-2,2v5H5V5z"></path>
                </svg>
            </button>

            {/* Save HTML to File */}
            <button className="px-2 py-1 rounded ml-2 info" onClick={handleSaveHtml}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox={viewBox}
                    height="1.25em"
                    width="4em"
                >
                    <title>Save HTML to File</title>
                    <text x="-40" y="18" fontSize="16px">HTML</text>
                    <path d="M5,21h14c1.103,0,2-0.897,2-2V8c0-0.265-0.105-0.52-0.293-0.707l-4-4C16.52,3.105,16.266,3,16,3H5C3.897,3,3,3.897,3,5v14 C3,20.103,3.897,21,5,21z M15,19H9v-5h6V19z M13,7h-2V5h2V7z M5,5h2v4h2h2h2h1h1V5h0.586L19,8.414L19.001,19H17v-5 c0-1.103-0.897-2-2-2H9c-1.103,0-2,0.897-2,2v5H5V5z"></path>
                </svg>
            </button>
        </div>
    );
};

export default SaveButtons;