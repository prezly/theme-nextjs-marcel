import { useAnalyticsContext } from '@prezly/analytics-nextjs';
import type { ExtendedStory } from '@prezly/sdk';
import { isEmbargoStory } from '@prezly/theme-kit-core';
import { StorySeo } from '@prezly/theme-kit-nextjs';
import dynamic from 'next/dynamic';

import { StoryMeta, StoryShareSocial } from '@/components';

import { Embargo } from './Embargo';
import { HeaderRenderer } from './HeaderRenderer';

const ContentRenderer = dynamic(() => import('@/components/ContentRenderer'));

type Props = {
    story: ExtendedStory;
};

function Story({ story }: Props) {
    const { isEnabled: isAnalyticsEnabled } = useAnalyticsContext();

    const { links } = story;
    const nodes = JSON.parse(story.content);

    const url = links.short || links.newsroom_view;

    return (
        <>
            <StorySeo story={story} noindex={!isAnalyticsEnabled} />
            {isEmbargoStory(story) && <Embargo story={story} />}
            <StoryMeta story={story} />
            <article>
                <HeaderRenderer nodes={nodes} />

                {url && <StoryShareSocial url={url} />}

                <div className="pb-6 lg:max-w-[920px] lg:mx-auto">
                    <ContentRenderer nodes={nodes} />
                </div>
            </article>
        </>
    );
}

export default Story;
