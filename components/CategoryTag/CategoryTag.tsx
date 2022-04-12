import React, { FunctionComponent } from 'react';
import { getCategoryUrl, useCurrentLocale } from '@prezly/theme-kit-nextjs';
import Link from 'next/link';
import classNames from 'classnames';
import { Category } from '@prezly/sdk/dist/types';

interface Props {
    category: Category;
    className?: string;
}

const CategoryTag: FunctionComponent<Props> = ({ category, className }) => {
    const locale = useCurrentLocale();

    return (
        <Link key={category.id} href={getCategoryUrl(category, locale)} passHref>
            <a
                className={classNames(
                    'uppercase text-sm font-semibold tracking-wider leading-5',
                    'py-1 px-2 bg-gray-700 bg-opacity-80 rounded mr-3 mb-3 md:mb-0 last:mr-0',
                    'hover:bg-gray-600 active:bg-gray-500 active:text-gray-100',
                    'focus-visible:ring focus-visible:ring-inset',
                    'focus-visible:ring-blue-300 focus:outline-none',
                    className,
                )}
            >
                {category.display_name}
            </a>
        </Link>
    );
};

export default CategoryTag;
