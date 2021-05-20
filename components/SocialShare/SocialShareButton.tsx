import React, { FunctionComponent } from 'react';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
} from 'react-share';

import Icon from '../Icon';

export enum SocialNetworks {
    FACEBOOK = 'facebook',
    LINKEDIN = 'linkedin',
    TWITTER = 'twitter',
}

// TODO: This needs stronger typing
const COMPONENT_MAP: Record<SocialNetworks, any> = {
    [SocialNetworks.FACEBOOK]: FacebookShareButton,
    [SocialNetworks.LINKEDIN]: LinkedinShareButton,
    [SocialNetworks.TWITTER]: TwitterShareButton,
};

interface Props {
    socialNetwork: SocialNetworks;
    link: string;
}

const SocialShareButton: FunctionComponent<Props> = ({ socialNetwork, link }) => {
    const ShareButtonComponent = COMPONENT_MAP[socialNetwork];
    const iconName = `social-${socialNetwork}`;

    if (!ShareButtonComponent) {
        return <>No such Social share template</>;
    }

    return (
        <ShareButtonComponent
            resetButtonStyle={false}
            className="mr-2 py-1 px-1.5 text-gray-300 hover:text-blue-400 active:text-blue-500 focus:outline-none"
            url={link}
        >
            <Icon name={iconName} className="w-7 h-7 lg:w-4 lg:h-4" />
        </ShareButtonComponent>
    );
};

export default SocialShareButton;
