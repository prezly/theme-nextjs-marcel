import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { UploadcareFile, UploadcareStoragePayload } from '@prezly/slate-types';

import { FileTypeIcon } from '@/components/Icon';
import formatBytes from './lib/formatBytes';

interface Props {
    description: string;
    file: UploadcareStoragePayload;
}

const Attachment: FunctionComponent<Props> = ({ description, file }) => {
    const { downloadUrl } = UploadcareFile.createFromPrezlyStoragePayload(file);

    const displayedName = description || file.filename;

    const fileExtension = file.filename.split('.').pop();
    // TODO: This probably should display the associated software name
    const fileType = fileExtension?.toUpperCase();

    return (
        <a
            className={classNames(
                'default-well text-gray-300 rounded-xl p-6',
                'hover:bg-opacity-100',
                'flex flex-col lg:flex-row items-center my-10',
            )}
            href={downloadUrl}
        >
            <FileTypeIcon
                extension={fileExtension}
                className="text-gray-400 w-10 h-10 mr-6"
            />
            <div>
                <h4 className="text-lg text-gray-200 font-bold mb-1">{displayedName}</h4>
                <h5 className="text-gray-400">
                    {fileType}
                    {fileType && ' - '}
                    {formatBytes(file.size)}
                </h5>
            </div>
        </a>
    );
};

export default Attachment;
