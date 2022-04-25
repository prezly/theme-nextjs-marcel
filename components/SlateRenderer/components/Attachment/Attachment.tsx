import { STORY_FILE, useAnalytics } from '@prezly/analytics-nextjs';
import type { UploadcareStoragePayload } from '@prezly/slate-types';
import { UploadcareFile } from '@prezly/slate-types';
import translations from '@prezly/themes-intl-messages';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Icon, { FileTypeIcon } from '@/components/Icon';

import formatBytes from './lib/formatBytes';

interface Props {
    description: string;
    file: UploadcareStoragePayload;
}

function Attachment({ description, file }: Props) {
    const { track } = useAnalytics();
    const { downloadUrl } = UploadcareFile.createFromPrezlyStoragePayload(file);

    const displayedName = description || file.filename;

    const fileExtension = file.filename.split('.').pop();
    // TODO: This probably should display the associated software name
    const fileType = fileExtension?.toUpperCase();

    function handleClick() {
        track(STORY_FILE.DOWNLOAD, { id: file.uuid });
    }

    return (
        <div
            className={classNames(
                'border-[1px] border-gray-600 text-gray-200 rounded-xl p-6',
                'hover:bg-opacity-100',
                'flex lg:flex-row justify-between items-center my-10',
            )}
        >
            <div className="flex justify-between items-center">
                <FileTypeIcon extension={fileExtension} className="text-gray-400 w-10 h-10 mr-6" />
                <div>
                    <h4 className="text-lg text-gray-200 font-semibold mb-1">{displayedName}</h4>
                    <h5 className="text-gray-300 font-normal">
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
                <Icon name="download" className="ml-2 w-4 h-4" />
            </div>
        </div>
    );
}

export default Attachment;
