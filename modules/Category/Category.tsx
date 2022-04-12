import { Category } from '@prezly/sdk/dist/types';
import { getCategoryUrl, useCurrentLocale } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import Link from 'next/link';

type Props = {
    category: Category;
    forcePopup?: boolean;
    isExtendedDisplay?: boolean;
};

const CategoryComponent = ({ category, forcePopup, isExtendedDisplay }: Props) => {
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
                    !forcePopup && 'lg:focus-visible:ring focus-visible:bg-transparent',
                    !forcePopup && 'lg:px-2 lg:py-1 lg:leading-6 lg:tracking-wide',
                    !forcePopup &&
                        'lg:rounded-md lg:hover:bg-gray-700 lg:active:bg-gray-600 lg:active:text-gray-100',
                    isExtendedDisplay ? 'py-3' : 'py-1.5',
                )}
            >
                {forcePopup && isExtendedDisplay ? (
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
};

export default CategoryComponent;
