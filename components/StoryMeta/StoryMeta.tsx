import type { Story } from '@prezly/sdk';
import type { AlgoliaStory } from '@prezly/theme-kit-core';
import classNames from 'classnames';
import { useState } from 'react';

import { useDevice } from '@/hooks/useDevice';

import CategoryTag from '../CategoryTag';
import StoryPublicationDate from '../StoryPublicationDate';

interface Props {
    story: Story | AlgoliaStory;
    className?: string;
}

function StoryMeta({ story, className }: Props) {
    const { categories } = story;
    const [showAdditionalCategories, setShowAdditionalCategories] = useState(false);
    const { isMobile } = useDevice();

    const NUM_OF_INITIAL_CATEGORIES = isMobile ? 3 : 4;

    const additionalCategories =
        categories.length > NUM_OF_INITIAL_CATEGORIES &&
        categories.length - NUM_OF_INITIAL_CATEGORIES;

    return (
        <>
            <div className={classNames('md:flex md:items-center md:mb-4', className)}>
                <StoryPublicationDate
                    story={story}
                    className="mb-6 md:mb-0 text-neutral-400 whitespace-nowrap"
                />
                {!!categories.length && (
                    <div className="flex mb-3 md:ml-6 md:mb-0 flex-wrap gap-3">
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
                <div className="flex items-center flex-wrap gap-3">
                    {categories.slice(NUM_OF_INITIAL_CATEGORIES).map((category) => (
                        <CategoryTag key={category.id} category={category} className="w-max" />
                    ))}
                </div>
            )}
        </>
    );
}

export default StoryMeta;
