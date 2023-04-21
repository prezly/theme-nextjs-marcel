import { getCategoryHasTranslation } from '@prezly/theme-kit-core';
import { useCategories, useCurrentLocale } from '@prezly/theme-kit-nextjs';
import { useMemo } from 'react';

import { CategoryLink } from '@/components';

import styles from './MainPanel.module.css';

function CategoriesList() {
    const currentLocale = useCurrentLocale();
    const categories = useCategories();

    const filteredCategories = useMemo(
        () =>
            categories.filter(
                (category) =>
                    category.stories_number > 0 &&
                    getCategoryHasTranslation(category, currentLocale),
            ),
        [categories, currentLocale],
    );

    return (
        <div className="px-6 py-2">
            <ul className={styles.list}>
                {filteredCategories.map((category) => (
                    <li key={category.id} className={styles.listItem}>
                        <CategoryLink category={category} className={styles.categoryLink} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoriesList;
