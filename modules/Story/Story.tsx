/* eslint-disable @typescript-eslint/naming-convention */
import type { ExtendedStory } from '@prezly/sdk';
import { Alignment } from '@prezly/story-content-format';
import { isEmbargoStory } from '@prezly/theme-kit-core';
import { StorySeo } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import { StoryMeta, StoryShareSocial } from '@/components';
import { getHeaderAlignment } from '@/utils';

import { Embargo } from './Embargo';
import { HeaderRenderer } from './HeaderRenderer';

const ContentRenderer = dynamic(() => import('@/components/ContentRenderer'));

type Props = {
    story: ExtendedStory;
};

const noIndex = process.env.VERCEL === '1';

function Story({ story }: Props) {
    const { links, visibility } = story;
    const nodes = JSON.parse(story.content);

    const url = links.short || links.newsroom_view;

    const headerAlignment = getHeaderAlignment(nodes);

    return (
        <>
            <StorySeo story={story} noindex={noIndex} />
            {isEmbargoStory(story) && <Embargo story={story} />}
            <StoryMeta
                className={classNames({
                    'justify-start': headerAlignment === Alignment.LEFT,
                    'justify-end': headerAlignment === Alignment.RIGHT,
                    'justify-center': headerAlignment === Alignment.CENTER,
                })}
                story={story}
            />
            <article>
                <HeaderRenderer nodes={nodes} />

                {url && visibility === 'public' && (
                    <StoryShareSocial
                        className={classNames({
                            'justify-start': headerAlignment === Alignment.LEFT,
                            'justify-end': headerAlignment === Alignment.RIGHT,
                            'justify-center': headerAlignment === Alignment.CENTER,
                        })}
                        url={url}
                    />
                )}

                <div className="pb-6 lg:max-w-[920px] lg:mx-auto">
                    <ContentRenderer nodes={nodes} />
                </div>
            </article>
        </>
    );
}

export default Story;
