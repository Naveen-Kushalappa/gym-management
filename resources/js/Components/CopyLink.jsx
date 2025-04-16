import { useState } from 'react';

const CopyLink = ({ url }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2s
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-blue-600 underline">{url}</span>
            <button
                onClick={handleCopy}
                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
};

export default CopyLink;
