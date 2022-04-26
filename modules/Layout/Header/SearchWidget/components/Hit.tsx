import type { AlgoliaStory } from '@prezly/theme-kit-nextjs';
import Link from 'next/link';
import type { Hit } from 'react-instantsearch-core';
import { Highlight } from 'react-instantsearch-dom';

import { StoryImage } from '@/components';

interface Props {
    hit: Hit<{ attributes: AlgoliaStory }>;
}

function HitComponent({ hit }: Props) {
    const { attributes: story } = hit;

    return (
        <Link href={`/${story.slug}`} locale={false} passHref>
            <a className="flex items-center text-inherit no-underline hover:text-primary;">
                <div className="rounded-sm block overflow-hidden w-14 h-14 mr-4 shrink-0">
                    <StoryImage
                        story={story}
                        className="rounded-sm"
                        placeholderClassName="rounded-sm"
                    />
                </div>
                <p className="text-base line-clamp-2 font-medium pl-2 ml-2 text-gray-100 highlight">
                    <Highlight hit={hit} attribute="attributes.title" tagName="mark" />
                </p>
            </a>
        </Link>
    );
}

export default HitComponent;
