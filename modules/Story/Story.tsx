import type { ExtendedStory } from '@prezly/sdk';
import { StoryFormatVersion } from '@prezly/sdk';
import { StorySeo } from '@prezly/theme-kit-nextjs';
import Image from '@prezly/uploadcare-image';
import dynamic from 'next/dynamic';

import { StoryMeta, StoryShareSocial } from '@/components';

const SlateRenderer = dynamic(() => import('@/components/SlateRenderer'));

type Props = {
    story: ExtendedStory;
};

function Story({ story }: Props) {
    const { format_version, content, title, subtitle, categories, published_at } = story;
    const headerImage = story.header_image ? JSON.parse(story.header_image) : null;

    return (
        <>
            <StorySeo story={story} />
            <StoryMeta categories={categories} published_at={published_at} />
            <article>
                <h1 className="text-4xl font-bold text-gray-100 mt-6">{title}</h1>
                <h3 className="text-gray-300 mt-6">{subtitle}</h3>

                <StoryShareSocial story={story} />

                {headerImage && (
                    <Image
                        imageDetails={headerImage}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="mt-12"
                    />
                )}

                <div className="pt-16 py-6 lg:max-w-[920px] lg:mx-auto">
                    {format_version === StoryFormatVersion.HTML && (
                        // eslint-disable-next-line react/no-danger
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    )}
                    {format_version === StoryFormatVersion.SLATEJS && (
                        <SlateRenderer nodes={JSON.parse(content)} />
                    )}
                </div>
            </article>
        </>
    );
}

export default Story;
