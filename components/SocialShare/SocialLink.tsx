import React, { FunctionComponent } from 'react';

import Icon from '../Icon';

interface Props {
    iconName: string;
    link: string;
}

const SocialLink: FunctionComponent<Props> = ({ iconName, link }) => (
    <a className="mr-5 p-1.5 text-gray-400 hover:text-blue-400" href={link}>
        <Icon name={iconName} className="w-7 h-7 lg:w-4 lg:h-4" />
    </a>
);

export default SocialLink;
