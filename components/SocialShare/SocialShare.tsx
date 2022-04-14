import type { ExtendedStory } from '@prezly/sdk';
import type { PropsWithChildren } from 'react';

import Icon from '../Icon';

import SocialShareButton, { SocialNetworks } from './SocialShareButton';

interface Props {
    story: ExtendedStory;
}

function SocialShare({ story }: PropsWithChildren<Props>) {
    const { newsroom_view, short } = story.links;

    const shareLink = short || newsroom_view || window.location.href;

    return (
        <div className="flex items-center -mx-1.5 lg:mx-0">
            <div className="mr-2 py-1 px-1.5 text-gray-400">
                <Icon name="share" className="w-7 h-7 lg:w-4 lg:h-4" />
            </div>
            <SocialShareButton socialNetwork={SocialNetworks.FACEBOOK} link={shareLink} />
            {/* <SocialShareButton socialNetwork="instagram" link={shareLink} /> */}
            <SocialShareButton socialNetwork={SocialNetworks.LINKEDIN} link={shareLink} />
            <SocialShareButton socialNetwork={SocialNetworks.TWITTER} link={shareLink} />
        </div>
    );
}

export default SocialShare;
