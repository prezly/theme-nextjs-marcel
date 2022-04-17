import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';

import CategoryTag from '@/components/CategoryTag';
import Icon from '@/components/Icon';
import { useDevice } from '@/hooks/useDevice';
import type { StoryWithContent } from 'types';

import getStoryExcerpt from './lib/getStoryExcerpt';

const StoryPublicationDate = dynamic(() => import('@/components/StoryPublicationDate'));

type Props = {
    story: StoryWithContent;
};

function StoryItem({ story }: Props) {
    const [showAdditionalCategories, setShowAdditionalCategories] = useState(false);
    const { isMobile } = useDevice();
    const NUM_OF_INITIAL_CATEGORIES = isMobile ? 2 : 3;

    const { categories, title, subtitle, slug } = story;
    const additionalCategories =
        categories.length > NUM_OF_INITIAL_CATEGORIES &&
        categories.length - NUM_OF_INITIAL_CATEGORIES;

    const excerpt = getStoryExcerpt(story);

    return (
        <div className="mb-16">
            <div className="md:flex md:items-center md:mb-4">
                <StoryPublicationDate story={story} className="mb-6 md:mb-0 text-gray-100" />
                {!!categories.length && (
                    <div className="flex mb-3 md:ml-6 md:mb-0">
                        {categories.slice(0, NUM_OF_INITIAL_CATEGORIES).map((category) => (
                            <CategoryTag key={category.id} category={category} />
                        ))}
                        {additionalCategories && !showAdditionalCategories && (
                            <CategoryTag
                                additionalCategories={additionalCategories}
                                onClick={() => setShowAdditionalCategories(true)}
                            />
                        )}
                    </div>
                )}
            </div>
            {showAdditionalCategories && (
                <div className="flex items-center flex-wrap">
                    {categories.slice(NUM_OF_INITIAL_CATEGORIES).map((category) => (
                        <CategoryTag key={category.id} category={category} className="w-max" />
                    ))}
                </div>
            )}

            <h2 className="text-gray-50 text-2xl font-bold mb-2 leading-9 md:mt-4">
                <Link href={`/${slug}`} passHref>
                    <a
                        className={classNames(
                            'hover:underline hover:text-blue-300 active:text-blue-400',
                            'focus:outline-none focus:underline focus:text-blue-300',
                        )}
                    >
                        {title}
                    </a>
                </Link>
            </h2>
            {subtitle && (
                <h3 className="text-gray-300 font-medium text-lg leading-7 mb-4">{subtitle}</h3>
            )}
            {excerpt && <div className="mb-4 text-gray-400 leading-7 line-clamp-3">{excerpt}</div>}
            <Link href={`/${slug}`} passHref>
                <a
                    className={classNames(
                        'default-link inline-flex items-center border-b-2 border-transparent',
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

export default StoryItem;
