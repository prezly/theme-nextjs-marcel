import React, { FunctionComponent } from 'react';

import Icon from '../Icon';

interface Props {
    iconName: string;
    link: string;
}

const SocialLink: FunctionComponent<Props> = ({ iconName, link }) => (
    <a className="mr-2 py-1 px-1.5 text-gray-300 hover:text-blue-400 active:text-blue-500" href={link}>
        <Icon name={iconName} className="w-7 h-7 lg:w-4 lg:h-4" />
    </a>
);

export default SocialLink;
