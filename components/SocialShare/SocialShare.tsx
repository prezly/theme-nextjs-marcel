import React, { FunctionComponent } from 'react';

import { Story } from '@prezly/sdk/dist/types';
import Icon from '../Icon';

interface Props {
    story: Story;
}

const SocialShare: FunctionComponent<Props> = ({ story }) => (
    <div className="flex items-center">
        <a className="mr-6 text-gray-400 hover:text-blue-400" href="https://discord.com/">
            <Icon name="social-facebook" />
        </a>
        <a className="mr-6 text-gray-400 hover:text-blue-400" href="https://discord.com/">
            <Icon name="social-instagram" />
        </a>
        <a className="mr-6 text-gray-400 hover:text-blue-400" href="https://discord.com/">
            <Icon name="social-linkedin" />
        </a>
        <a className="mr-6 text-gray-400 hover:text-blue-400" href="https://discord.com/">
            <Icon name="social-twitter" />
        </a>
    </div>
);

export default SocialShare;
