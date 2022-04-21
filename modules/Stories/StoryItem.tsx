import type { Story } from '@prezly/sdk';
import classNames from 'classnames';
import Link from 'next/link';

import Icon from '@/components/Icon';
import StoryMeta from '@/components/StoryMeta';

type Props = {
    story: Story;
};

function StoryItem({ story }: Props) {
    const { title, subtitle, slug, published_at, categories } = story;

    return (
        <div className="mb-16">
            <StoryMeta published_at={published_at} categories={categories} />
            <h2 className="text-gray-50 text-2xl font-bold mb-2 leading-9 md:mt-4">
                <Link href={`/${slug}`} locale={false} passHref>
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
                <h3 className="text-gray-400 font-normal text-base leading-7 mb-4">{subtitle}</h3>
            )}
            <Link href={`/${slug}`} passHref>
                <a
                    className={classNames(
                        'inline-flex text-primary font-medium items-center border-b-2 border-transparent uppercase text-sm',
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
