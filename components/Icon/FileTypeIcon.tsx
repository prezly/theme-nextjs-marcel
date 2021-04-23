import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

const iconsContext = (require as any).context(
    '!@svgr/webpack!../../public/images/icons/file-types',
    true,
    /\.svg$/,
);
const icons = iconsContext.keys().reduce((result: Record<string, any>, iconPath: string) => {
    const iconFilename = iconPath.split('/')[1];
    // eslint-disable-next-line no-param-reassign
    result[iconFilename] = iconsContext(iconPath).default;
    return result;
}, {});

interface Props {
    className?: string;
    extension?: string;
    width?: number;
    height?: number;
}

function getIconNameFromExtension(extension?: string) {
    switch (extension) {
        case 'ae':
            return 'ae';
        case 'ai':
            return 'ai';
        case 'xls':
        case 'xlsx':
            return 'excel';
        case 'id':
            return 'id';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'svg':
        case 'webp':
            return 'image';
        case 'pdf':
            return 'pdf';
        case 'ppt':
        case 'pptx':
            return 'powerpoint';
        case 'psd':
            return 'psd';
        case 'mp3':
        case 'wav':
        case 'ogg':
            return 'sound';
        case 'mp4':
        case 'avi':
        case 'mov':
        case 'mpeg':
        case 'webm':
        case 'flv':
        case 'ogv':
            return 'video';
        case 'doc':
        case 'docx':
            return 'word';
        case 'xd':
            return 'xd';
        case 'zip':
        case 'rar':
        case 'tar':
        case 'gz':
        case '7z':
            return 'zip';
        default:
            return 'default';
    }
}

const FileTypeIcon: FunctionComponent<Props> = ({ extension, className, ...restProps }) => {
    const iconFilename = `${getIconNameFromExtension(extension)}.svg`;
    const IconComponent = icons[iconFilename] || null;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return IconComponent ? <IconComponent {...restProps} className={classNames('svg-icon', className)} /> : null;
};

export default FileTypeIcon;
