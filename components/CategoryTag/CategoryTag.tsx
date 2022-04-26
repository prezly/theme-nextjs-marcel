import type { Category } from '@prezly/sdk/dist/types';
import type { AlgoliaCategoryRef } from '@prezly/theme-kit-nextjs';
import { getCategoryUrl, useCurrentLocale } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import Link from 'next/link';

interface Props {
    additionalCategories?: number;
    category?: Category | AlgoliaCategoryRef;
    className?: string;
    onClick?: () => void;
}

function CategoryTag({ additionalCategories, category, className, onClick }: Props) {
    const locale = useCurrentLocale();

    if (additionalCategories) {
        return (
            <button
                className={classNames(
                    'uppercase text-sm font-semibold tracking-wider leading-5',
                    'py-1 px-2 bg-gray-700 bg-opacity-80 rounded-lg mr-3 mb-3 md:mb-0 last:mr-0',
                    'hover:bg-gray-600 active:bg-gray-500 active:text-gray-100',
                    'focus-visible:ring focus-visible:ring-inset',
                    'focus-visible:ring-blue-300 focus:outline-none',
                    className,
                )}
                onClick={onClick}
            >
                +{additionalCategories}
            </button>
        );
    }

    if (category) {
        return (
            <Link key={category.id} href={getCategoryUrl(category, locale)} passHref>
                <a
                    className={classNames(
                        'uppercase text-sm font-semibold tracking-wider leading-5',
                        'py-1 px-2 bg-gray-700 bg-opacity-80 rounded-lg mr-3 mb-3 md:mb-0 last:mr-0',
                        'hover:bg-gray-600 active:bg-gray-500 active:text-gray-100',
                        'focus-visible:ring focus-visible:ring-inset',
                        'focus-visible:ring-blue-300 focus:outline-none',
                        className,
                    )}
                >
                    {(category as Category).display_name || (category as AlgoliaCategoryRef).name}
                </a>
            </Link>
        );
    }
    return null;
}

export default CategoryTag;
