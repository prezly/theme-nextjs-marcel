import { IconArrowRight } from '@prezly/icons';
import type { Story } from '@prezly/sdk';
import type { AlgoliaStory } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import classNames from 'classnames';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

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
                        'inline-flex text-primary group font-medium items-center border-transparent text-sm',
                    )}
                >
                    <FormattedMessage {...translations.actions.readMore} />
                    <IconArrowRight
                        className="ml-1 transform translate-x-0 group-hover:translate-x-1 transition-transform"
                        width={14}
                        height={14}
                    />
                </a>
            </Link>
        </div>
    );
}

export default StoryItem;
