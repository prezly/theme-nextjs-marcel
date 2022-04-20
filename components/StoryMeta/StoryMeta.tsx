import type { Category } from '@prezly/sdk';
import type { AlgoliaCategoryRef } from '@prezly/theme-kit-nextjs';
import { useState } from 'react';

import { useDevice } from '@/hooks/useDevice';

import CategoryTag from '../CategoryTag';
import StoryPublicationDate from '../StoryPublicationDate';

interface Props {
    published_at: string | number | null;
    categories: (Category | AlgoliaCategoryRef)[];
}

function StoryMeta({ categories, published_at }: Props) {
    const [showAdditionalCategories, setShowAdditionalCategories] = useState(false);
    const { isMobile } = useDevice();

    const NUM_OF_INITIAL_CATEGORIES = isMobile ? 2 : 3;

    const additionalCategories =
        categories.length > NUM_OF_INITIAL_CATEGORIES &&
        categories.length - NUM_OF_INITIAL_CATEGORIES;

    return (
        <>
            <div className="md:flex md:items-center md:mb-4">
                <StoryPublicationDate
                    published_at={published_at}
                    className="mb-6 md:mb-0 text-gray-100"
                />
                {!!categories.length && (
                    <div className="flex mb-3 md:ml-6 md:mb-0">
                        {categories.slice(0, NUM_OF_INITIAL_CATEGORIES).map((category) => (
                            <CategoryTag key={category.id} category={category} />
                        ))}
                        {additionalCategories && !showAdditionalCategories && (
                            <CategoryTag
                                additionalCategories={additionalCategories}
                                onClick={() =>
                                    isMobile ? null : setShowAdditionalCategories(true)
                                }
                            />
                        )}
                    </div>
                )}
            </div>
            {showAdditionalCategories && (
                <div className="flex items-center flex-wrap">
                    {categories.slice(NUM_OF_INITIAL_CATEGORIES).map((category) => (
                        <CategoryTag key={category.id} category={category} className="w-max" />
                    ))}
                </div>
            )}
        </>
    );
}

export default StoryMeta;
