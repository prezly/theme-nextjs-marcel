import { IconArrowRight } from '@prezly/icons';
import type { Story } from '@prezly/sdk';
import type { AlgoliaStory } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import Link from 'next/link';

import StoryMeta from '@/components/StoryMeta';

type Props = {
    story: Story | AlgoliaStory;
};

function StoryItem({ story }: Props) {
    const { title, subtitle, slug } = story;

    return (
        <div className="mb-16">
            <StoryMeta story={story} />
            <h2 className="text-gray-50 text-2xl font-bold mb-2 leading-9 md:mt-4">
                <Link href={`/${slug}`} locale={false} passHref>
                    <a
                        className={classNames(
                            'hover:underline',
                            'focus:outline-none focus:underline ',
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
                        'inline-flex text-primary font-medium items-center border-transparent uppercase text-sm',
                    )}
                >
                    Read more
                    <IconArrowRight className="w-3.5 h-3.5 ml-2" width="14px" height="14px" />
                </a>
            </Link>
        </div>
    );
}

export default StoryItem;
