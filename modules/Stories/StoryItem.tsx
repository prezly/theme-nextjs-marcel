import type { FunctionComponent } from 'react';
import Link from 'next/link';
import type { Story } from '@prezly/sdk';
import { format } from 'date-fns';

import Icon from '@/components/Icon';
import getCategoryUrl from '@/utils/prezly/getCategoryUrl';
import classNames from 'classnames';

type Props = {
    story: Story;
};

const StoryItem: FunctionComponent<Props> = ({ story }) => {
    const {
        categories,
        published_at,
        title,
        subtitle,
        intro,
        slug,
    } = story;

    const publishedDate = format(
        new Date(published_at as string),
        'dd/MM/yyyy',
    );

    return (
        <div className="mb-16">
            <div className="md:flex md:items-center md:mb-4">
                {!!categories.length && (
                    <div className="flex mb-3 md:mr-3 md:mb-0">
                        {categories.map((category) => (
                            <Link key={category.id} href={getCategoryUrl(category)} passHref>
                                <a className={
                                    classNames(
                                        'uppercase text-xs font-bold tracking-wide leading-5',
                                        'py-1 px-2 bg-gray-700 rounded mr-3 mb-3 md:mb-0',
                                    )
                                }
                                >
                                    {category.display_name}
                                </a>
                            </Link>
                        ))}
                    </div>
                )}
                <div className="flex items-center mb-6 md:mb-0 text-gray-400">
                    <Icon name="calendar" className="mr-2" />
                    {publishedDate}
                </div>
            </div>

            <h2 className="text-gray-50 text-xl font-bold mb-3 leading-9">{title}</h2>
            {subtitle && (
                <h3 className="text-gray-300 font-semibold text-lg leading-7">{subtitle}</h3>
            )}
            <p className="mt-6 mb-4">{intro}</p>
            <Link href={`/${slug}`} passHref>
                <a className="text-blue-400 flex items-center">
                    Read more
                    <Icon name="arrow-right" className="ml-2" />
                </a>
            </Link>
        </div>
    );
};

export default StoryItem;
