import { DOWNLOAD, useAnalytics } from '@prezly/analytics-nextjs';
import type { AttachmentNode } from '@prezly/story-content-format';
import { translations } from '@prezly/theme-kit-intl';
import { UploadcareFile } from '@prezly/uploadcare';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { IconDownload } from '@/icons';

import FileTypeIcon from './FileTypeIcon';
import formatBytes from './lib/formatBytes';

interface Props {
    node: AttachmentNode;
}

function Attachment({ node }: Props) {
    const { file, description } = node;
    const { track } = useAnalytics();
    const { downloadUrl } = UploadcareFile.createFromPrezlyStoragePayload(file);

    const displayedName = description || file.filename;

    const fileExtension = file.filename.split('.').pop();
    // TODO: This probably should display the associated software name
    const fileType = fileExtension?.toUpperCase();

    function handleClick() {
        track(DOWNLOAD.ATTACHMENT, { id: file.uuid });
    }

    return (
        <div
            className={classNames(
                'border-[1px] border-neutral-600 text-neutral-200 rounded-xl p-6',
                'hover:bg-opacity-100',
                'flex lg:flex-row justify-between items-center my-10',
            )}
        >
            <div className="flex justify-between items-center">
                <FileTypeIcon
                    extension={fileExtension}
                    className="text-neutral-400 w-10 h-10 mr-6"
                />
                <div>
                    <h4 className="text-lg text-neutral-200 font-semibold mb-1">{displayedName}</h4>
                    <h5 className="text-neutral-300 font-normal">
                        {fileType}
                        {fileType && ' - '}
                        {formatBytes(file.size)}
                    </h5>
                </div>
            </div>
            <div className="flex items-center text-primary">
                <a
                    href={downloadUrl}
                    onClick={handleClick}
                    className="uppercase"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FormattedMessage {...translations.actions.download} />
                </a>
                <IconDownload className="ml-2" width={16} height={16} />
            </div>
        </div>
    );
}

export default Attachment;
