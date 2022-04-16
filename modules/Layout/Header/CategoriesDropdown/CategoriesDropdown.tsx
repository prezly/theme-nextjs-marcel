import type { Category } from '@prezly/sdk';
import { getCategoryHasTranslation, useCurrentLocale } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { Dropdown } from '@/components';

import CategoryButton from './CategoryButton';
import CategoryItem from './CategoryItem';

import styles from './CategoriesDropdown.module.css';

type Props = {
    categories: Category[];
    buttonClassName?: string;
    navigationItemClassName?: string;
    navigationButtonClassName?: string;
};

function CategoriesDropdown({
    categories,
    buttonClassName,
    navigationItemClassName,
    navigationButtonClassName,
}: Props) {
    const currentLocale = useCurrentLocale();

    const filteredCategories = categories.filter(
        (category) =>
            category.stories_number > 0 && getCategoryHasTranslation(category, currentLocale),
    );

    if (filteredCategories.length === 0) {
        return null;
    }

    return (
        <>
            {filteredCategories.map((category) => (
                <li
                    key={category.id}
                    className={classNames(navigationItemClassName, styles.mobileCategory)}
                >
                    <CategoryButton
                        category={category}
                        navigationButtonClassName={navigationButtonClassName}
                    />
                </li>
            ))}
            <li
                className={classNames(navigationItemClassName, {
                    [styles.desktopCategories]: true,
                })}
            >
                <Dropdown
                    label={<FormattedMessage {...translations.categories.title} />}
                    buttonClassName={buttonClassName}
                    withMobileDisplay
                >
                    {filteredCategories.map((category) => (
                        <CategoryItem category={category} key={category.id} />
                    ))}
                </Dropdown>
            </li>
        </>
    );
}

export default CategoriesDropdown;
