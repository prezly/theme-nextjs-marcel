import type { FunctionComponent } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import type { Story } from '@prezly/sdk';

import Icon from '@/components/Icon';
import CategoryTag from '@/components/CategoryTag';
import StoryPublicationDate from '@/components/StoryPublicationDate';

type Props = {
    story: Story;
};

const StoryItem: FunctionComponent<Props> = ({ story }) => {
    const {
        categories,
        title,
        subtitle,
        intro,
        slug,
    } = story;

    return (
        <div className="mb-16">
            <div className="md:flex md:items-center md:mb-4">
                {!!categories.length && (
                    <div className="flex mb-3 md:mr-6 md:mb-0">
                        {categories.map((category) => (
                            <CategoryTag category={category} />
                        ))}
                    </div>
                )}
                <StoryPublicationDate story={story} className="mb-6 md:mb-0 text-gray-400" />
            </div>

            <h2 className="text-gray-50 text-xl font-bold mb-3 leading-9">
                <Link href={`/${slug}`} passHref>
                    <a className="hover:underline">
                        {title}
                    </a>
                </Link>
            </h2>
            {subtitle && (
                <h3 className="text-gray-300 font-semibold text-lg leading-7">{subtitle}</h3>
            )}
            <p className="mt-6 mb-4">{intro}</p>
            <Link href={`/${slug}`} passHref>
                <a
                    className={classNames(
                        'default-link inline-flex items-center border-b-2 border-transparent',
                        'hover:border-blue-500',
                    )}
                >
                    Read more
                    <Icon name="arrow-right" className="ml-2" />
                </a>
            </Link>
        </div>
    );
};

export default StoryItem;
