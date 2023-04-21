import type { Story } from '@prezly/sdk';
import type { AlgoliaStory } from '@prezly/theme-kit-core';
import translations from '@prezly/themes-intl-messages';
import classNames from 'classnames';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import Button from '@/components/Button';
import StoryMeta from '@/components/StoryMeta';
import { IconArrowRight } from '@/icons';

type Props = {
    story: Story | AlgoliaStory;
};

function StoryItem({ story }: Props) {
    const { title, subtitle, slug } = story;

    return (
        <div className="mb-16">
            <StoryMeta story={story} />
            <h2 className="text-neutral-50 text-[1.6rem] font-semibold mb-2 leading-9 md:mt-4">
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
                <h3 className="text-neutral-400 font-normal text-base leading-7 mb-4">
                    {subtitle}
                </h3>
            )}
            <Button variant="secondary" href={`/${slug}`} className="text-lg group">
                <FormattedMessage {...translations.actions.readMore} />
                <IconArrowRight
                    className="transform translate-x-0 group-hover:translate-x-1 transition-transform"
                    width={14}
                    height={14}
                />
            </Button>
        </div>
    );
}

export default StoryItem;
