import classNames from 'classnames';
import Link from 'next/link';

import Icon from '@/components/Icon';
import StoryMeta from '@/components/StoryMeta';
import type { StoryWithContent } from 'types';

import getStoryExcerpt from './lib/getStoryExcerpt';

type Props = {
    story: StoryWithContent;
};

function StoryItem({ story }: Props) {
    const { title, subtitle, slug } = story;

    const excerpt = getStoryExcerpt(story);

    return (
        <div className="mb-16">
            <StoryMeta story={story} />
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
                <h3 className="text-gray-300 font-medium text-base leading-7 mb-4">{subtitle}</h3>
            )}
            {excerpt && <div className="mb-4 text-gray-400 leading-7 line-clamp-3">{excerpt}</div>}
            <Link href={`/${slug}`} locale={false} passHref>
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
