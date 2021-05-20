import { useCallback, useMemo, useState } from 'react';
import { useLatest } from 'react-use';
import throttle from 'lodash.throttle';
import { Category } from '@prezly/sdk/dist/types';

import { PaginationProps } from 'types';
import { StoryWithContent } from '@/modules/Stories';

const LOAD_MORE_THROTTLE_MS = 1000;

async function fetchStories(
    page: number,
    pageSize: number,
    category?: Category,
): Promise<{ stories: StoryWithContent[] }> {
    const result = await fetch('/api/fetch-stories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            page,
            pageSize,
            category,
            include: ['content'],
        }),
    });

    if (!result.ok) {
        const { message } = await result.json();
        throw new Error(message);
    }

    return result.json();
}

export const useInfiniteStoriesLoading = (
    initialStories: StoryWithContent[],
    pagination: PaginationProps,
    category?: Category,
) => {
    const [displayedStories, setDisplayedStories] = useState<StoryWithContent[]>(initialStories);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const currentPageLatest = useLatest(currentPage);

    const { itemsTotal, pageSize } = pagination;
    const totalPages = Math.ceil(itemsTotal / pageSize);

    const canLoadMore = currentPage < totalPages;

    const loadMoreStories = useCallback(async () => {
        try {
            setIsLoading(true);

            const { stories: newStories } = await fetchStories(currentPageLatest.current + 1, pageSize, category);
            setDisplayedStories((stories) => stories.concat(newStories));
            setCurrentPage((page) => page + 1);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [category]);

    const loadMoreStoriesThrottled = useMemo(() => (
        throttle(loadMoreStories, LOAD_MORE_THROTTLE_MS, { leading: false })
    ), [loadMoreStories]);

    return {
        canLoadMore,
        displayedStories,
        isLoading,
        loadMoreStories: loadMoreStoriesThrottled,
    };
};
