import type { Category } from '@prezly/sdk';
import type { AlgoliaCategoryRef } from '@prezly/theme-kit-nextjs';
import {
    getCategoryUrl,
    getLocalizedCategoryData,
    useCurrentLocale,
    useGetLinkLocaleSlug,
} from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import Link from 'next/link';

type Props = {
    category: Category | AlgoliaCategoryRef;
    className?: string;
};

function CategoryLink({ category, className }: Props) {
    const currentLocale = useCurrentLocale();
    const { name } = getLocalizedCategoryData(category, currentLocale);
    const getLinkLocaleSlug = useGetLinkLocaleSlug();

    return (
        <Link href={getCategoryUrl(category, currentLocale)} locale={getLinkLocaleSlug()} passHref>
            <a
                className={classNames(
                    'text-base uppercase font-medium text-primary no-underline hover:focus:underline hover:focus:text-primaryShade active:text-primaryShade',
                    'cursor-pointer after:mr-2 last:after:mr-0',
                    className,
                )}
            >
                <span>{name}</span>
            </a>
        </Link>
    );
}

export default CategoryLink;
