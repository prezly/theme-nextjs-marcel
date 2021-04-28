import type { FunctionComponent } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import Icon from '@/components/Icon';
import CategoryTag from '@/components/CategoryTag';
import StoryPublicationDate from '@/components/StoryPublicationDate';
import getStoryExcerpt from './lib/getStoryExcerpt';
import { StoryWithContent } from './lib/types';

type Props = {
    story: StoryWithContent;
};

const StoryItem: FunctionComponent<Props> = ({ story }) => {
    const {
        categories,
        title,
        subtitle,
        slug,
    } = story;

    const excerpt = getStoryExcerpt(story);

    return (
        <div className="mb-16">
            <div className="md:flex md:items-center md:mb-4">
                {!!categories.length && (
                    <div className="flex mb-3 md:mr-6 md:mb-0">
                        {categories.map((category) => (
                            <CategoryTag key={category.id} category={category} />
                        ))}
                    </div>
                )}
                <StoryPublicationDate story={story} className="mb-6 md:mb-0 text-gray-400" />
            </div>

            <h2 className="text-gray-50 text-2xl font-bold mb-2 leading-9">
                <Link href={`/${slug}`} passHref>
                    <a className={classNames(
                        'hover:underline hover:text-blue-300 active:text-blue-400',
                        'focus:outline-none focus:underline focus:text-blue-300',
                    )}
                    >
                        {title}
                    </a>
                </Link>
            </h2>
            {subtitle && (
                <h3 className="text-gray-300 font-semibold text-lg leading-7 mb-4">{subtitle}</h3>
            )}
            {excerpt && (
                <div className="mb-4 text-gray-400 line-clamp-3">{excerpt}</div>
            )}
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
};

export default StoryItem;
