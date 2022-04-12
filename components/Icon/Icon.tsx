import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

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

function Icon({ name, className, ...restProps }: PropsWithChildren<Props>) {
    const iconFilename = `icon-${name}.svg`;
    const IconComponent = icons[iconFilename] || null;
    return IconComponent ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <IconComponent {...restProps} className={classNames('svg-icon', className)} />
    ) : null;
}

export default Icon;
