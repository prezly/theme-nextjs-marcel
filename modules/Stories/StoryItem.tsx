import type { FunctionComponent } from 'react';
import Link from 'next/link';
import type { Story } from '@prezly/sdk';

import Icon from '@/components/Icon';

type Props = {
    story: Story;
};

const StoryItem: FunctionComponent<Props> = ({ story }) => {
    const {
        categories,
        culture,
        published_at,
        title,
        subtitle,
        intro,
        slug,
    } = story;

    return (
        <div className="mb-16">
            {!!categories.length && (
                <div className="flex mb-3">
                    {categories.map((category) => (
                        // TODO: Create a proper dynamic slug URL
                        <Link key={category.id} href={`/category/${category.i18n[culture.code].slug}`} passHref>
                            <a className="uppercase text-xs leading-5 py-1 px-2 bg-gray-700 rounded mr-3 mb-3">
                                {category.display_name}
                            </a>
                        </Link>
                    ))}
                </div>
            )}
            <div className="flex items-center mb-6">
                <Icon name="calendar" className="mr-2" />
                {published_at}
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
