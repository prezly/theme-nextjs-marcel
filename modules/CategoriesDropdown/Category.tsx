import type { Category } from '@prezly/sdk/dist/types';
import { getCategoryUrl, useCurrentLocale } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

type Props = {
    category: Category;
    isExtendedDisplay?: boolean;
};

function CategoryComponent({ category, isExtendedDisplay }: PropsWithChildren<Props>) {
    const locale = useCurrentLocale();

    return (
        <Link href={getCategoryUrl(category, locale)}>
            <a
                className={classNames(
                    'px-4 leading-7 block',
                    'hover:bg-gray-600 focus-visible:bg-gray-600',
                    'active:bg-gray-500',
                    'focus-visible:ring-inset focus-visible:ring-4',
                    'focus-visible:ring-blue-300 focus:outline-none',
                    'py-3',
                )}
            >
                {isExtendedDisplay ? (
                    <>
                        <span className="block uppercase">{category.display_name}</span>
                        {category.display_description && (
                            <span className="block text-gray-400 text-sm mt-1">
                                {category.display_description}
                            </span>
                        )}
                    </>
                ) : (
                    category.display_name
                )}
            </a>
        </Link>
    );
}

export default CategoryComponent;
