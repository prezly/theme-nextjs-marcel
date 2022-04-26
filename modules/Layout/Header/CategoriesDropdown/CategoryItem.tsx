import type { Category } from '@prezly/sdk';
import {
    getCategoryUrl,
    getLocalizedCategoryData,
    useCurrentLocale,
} from '@prezly/theme-kit-nextjs';

import { Dropdown } from '@/components';

type Props = {
    category: Category;
};

function CategoryItem({ category }: Props) {
    const currentLocale = useCurrentLocale();
    const { name, description } = getLocalizedCategoryData(category, currentLocale);

    return (
        <Dropdown.Item
            href={getCategoryUrl(category, currentLocale)}
            localeCode={currentLocale.toUnderscoreCode()}
            withMobileDisplay
        >
            <span className="block">{name}</span>
            {description && (
                <span className="text-base line-clamp-2 block mt-2 text-gray-300 font-normal capitalize">
                    {description}
                </span>
            )}
        </Dropdown.Item>
    );
}

export default CategoryItem;
