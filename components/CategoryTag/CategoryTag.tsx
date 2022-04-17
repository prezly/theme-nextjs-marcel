import type { Category } from '@prezly/sdk/dist/types';
import { getCategoryUrl, useCurrentLocale } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import Link from 'next/link';

import styles from './CategoryTag.module.css';

interface Props {
    additionalCategories?: number;
    category?: Category;
    className?: string;
    onClick?: () => void;
}

function CategoryTag({ additionalCategories, category, className, onClick }: Props) {
    const locale = useCurrentLocale();

    if (additionalCategories) {
        return (
            <button className={classNames(styles.categoryTag, className)} onClick={onClick}>
                +{additionalCategories}
            </button>
        );
    }

    if (category) {
        return (
            <Link key={category.id} href={getCategoryUrl(category, locale)} passHref>
                <a className={classNames(styles.categoryTag, className)}>{category.display_name}</a>
            </Link>
        );
    }
    return null;
}

export default CategoryTag;
