import { useAnalyticsContext } from '@prezly/analytics-nextjs';
import type { ExtendedStory } from '@prezly/sdk';
import { FormatVersion, isEmbargoStory } from '@prezly/theme-kit-core';
import { StorySeo } from '@prezly/theme-kit-nextjs';
import Image from '@prezly/uploadcare-image';
import dynamic from 'next/dynamic';

import { StoryMeta, StoryShareSocial } from '@/components';
import { getStoryImageSizes } from '@/utils';

import { Embargo } from './Embargo';

const SlateRenderer = dynamic(() => import('@/components/SlateRenderer'));

type Props = {
    story: ExtendedStory;
};

function Story({ story }: Props) {
    const { isEnabled: isAnalyticsEnabled } = useAnalyticsContext();

    const { format_version, content, title, subtitle, links } = story;
    const headerImage = story.header_image ? JSON.parse(story.header_image) : null;

    const url = links.short || links.newsroom_view;

    return (
        <>
            <StorySeo story={story} noindex={!isAnalyticsEnabled} />
            <StoryMeta story={story} />
            <article>
                <h1 className="text-4xl font-bold text-neutral-100 mt-6">{title}</h1>
                <h3 className="text-neutral-300 mt-3">{subtitle}</h3>

                {url && <StoryShareSocial url={url} />}

                {headerImage && (
                    <Image
                        imageDetails={headerImage}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="mt-6"
                        sizes={getStoryImageSizes()}
                    />
                )}

                <div className="pt-12 py-6 lg:max-w-[920px] lg:mx-auto">
                    {isEmbargoStory(story) && <Embargo story={story} />}

                    {format_version === FormatVersion.HTML && (
                        // eslint-disable-next-line react/no-danger
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    )}
                    {format_version === FormatVersion.SLATEJS && (
                        <SlateRenderer nodes={JSON.parse(content)} />
                    )}
                </div>
            </article>
        </>
    );
}

export default Story;
