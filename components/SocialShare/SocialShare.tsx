import React, { FunctionComponent } from 'react';

import Icon from '../Icon';
import SocialLink from './SocialLink';

const SocialShare: FunctionComponent = () => (
    <div className="flex items-center -mx-1.5 lg:mx-0">
        <div className="mr-2 p-1.5 text-gray-400">
            <Icon name="share" className="w-7 h-7 lg:w-4 lg:h-4" />
        </div>
        <SocialLink iconName="social-facebook" link="https://discord.com/" />
        <SocialLink iconName="social-instagram" link="https://discord.com/" />
        <SocialLink iconName="social-linkedin" link="https://discord.com/" />
        <SocialLink iconName="social-twitter" link="https://discord.com/" />
    </div>
);

export default SocialShare;
