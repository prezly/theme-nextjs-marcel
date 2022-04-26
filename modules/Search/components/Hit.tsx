import type { AlgoliaStory } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import Link from 'next/link';
import type { Hit } from 'react-instantsearch-core';
import { Highlight } from 'react-instantsearch-dom';

import Icon from '@/components/Icon';
import StoryMeta from '@/components/StoryMeta';

interface Props {
    hit: Hit<{ attributes: AlgoliaStory }>;
}

function HitComponent({ hit }: Props) {
    const { attributes: story } = hit;
    const { slug, subtitle } = story;

    return (
        <div className="mb-16">
            <StoryMeta story={story} />
            <h2 className="text-gray-50 text-2xl font-bold mb-2 leading-9 md:mt-4">
                <Link href={`/${slug}`} locale={false} passHref>
                    <a className="hover:underline focus:outline-none focus:underline highlight">
                        <Highlight hit={hit} attribute="attributes.title" tagName="mark" />
                    </a>
                </Link>
            </h2>
            {subtitle && (
                <h3 className="text-gray-400 font-normal text-base leading-7 mb-4">{subtitle}</h3>
            )}

            <Link href={`/${slug}`} passHref>
                <a
                    className={classNames(
                        'inline-flex items-center border-b-2 border-transparent',
                        'focus:border-blue-500 hover:border-blue-500',
                    )}
                >
                    Read more
                    <Icon name="arrow-right" className="w-3.5 h-3.5 ml-2" />
                </a>
            </Link>
        </div>
    );
}

export default HitComponent;
