import type { Category } from '@prezly/sdk';
import {
    getCategoryUrl,
    getLocalizedCategoryData,
    useCurrentLocale,
    useGetLinkLocaleSlug,
} from '@prezly/theme-kit-nextjs';

import { Button } from '@/components';

type Props = {
    category: Category;
    navigationButtonClassName?: string;
    labelClassName?: string;
};

function CategoryButton({ category, navigationButtonClassName, labelClassName }: Props) {
    const currentLocale = useCurrentLocale();
    const { name, description } = getLocalizedCategoryData(category, currentLocale);
    const getLinkLocaleSlug = useGetLinkLocaleSlug();

    return (
        <Button.Link
            variation="navigation"
            href={getCategoryUrl(category, currentLocale)}
            localeCode={getLinkLocaleSlug()}
            className={navigationButtonClassName}
            labelClassName={labelClassName}
        >
            <span className="block">{name}</span>
            {description && (
                <span className="text-base line-clamp-2 block mt-2 text-gray-300 font-normal capitalize">
                    {description}
                </span>
            )}
        </Button.Link>
    );
}

export default CategoryButton;
