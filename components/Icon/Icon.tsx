import React, { FunctionComponent } from 'react';

const iconsContext = (require as any).context(
    '!@svgr/webpack!../../public/images/icons',
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
    name: string;
    width?: number;
    height?: number;
}

const Icon: FunctionComponent<Props> = ({ name, ...restProps }) => {
    const iconFilename = `icon-${name}.svg`;
    const IconComponent = icons[iconFilename] || null;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return IconComponent ? <IconComponent {...restProps} /> : null;
};

export default Icon;
