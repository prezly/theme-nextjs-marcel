import type { Story } from '@prezly/sdk';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

import Icon from '../Icon';

import StoryShareUrl from './StoryShareUrl';

interface Props {
    story: Story;
}

function StoryShareSocial({ story }: Props) {
    const url = story.links.short || story.links.newsroom_view;

    if (!url) {
        return null;
    }

    return (
        <div className="flex items-center text-gray-200 my-12 relative">
            <TwitterShareButton className="text-[0] mr-4" url={url}>
                <Icon name="twitter" className="w-6 h-6 text-gray-200 hover:text-gray-500" />
            </TwitterShareButton>
            <FacebookShareButton className="text-[0] mr-4" url={url}>
                <Icon name="facebook" className="w-6 h-6 text-gray-200 hover:text-gray-500" />
            </FacebookShareButton>
            <LinkedinShareButton className="text-[0] mr-4" url={url}>
                <Icon name="linkedin" className="w-6 h-6 text-gray-200 hover:text-gray-500" />
            </LinkedinShareButton>
            <StoryShareUrl url={url} />
        </div>
    );
}

export default StoryShareSocial;
