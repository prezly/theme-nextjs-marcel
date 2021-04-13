import React, { FunctionComponent } from 'react';

import { Story } from '@prezly/sdk/dist/types';
import SocialLink from './SocialLink';

interface Props {
    story: Story;
}

const SocialShare: FunctionComponent<Props> = ({ story }) => (
    <div className="flex items-center -mx-1.5 lg:mx-0">
        <SocialLink iconName="social-facebook" link="https://discord.com/" />
        <SocialLink iconName="social-instagram" link="https://discord.com/" />
        <SocialLink iconName="social-linkedin" link="https://discord.com/" />
        <SocialLink iconName="social-twitter" link="https://discord.com/" />
    </div>
);

export default SocialShare;
