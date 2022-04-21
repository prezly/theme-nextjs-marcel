import type { Category } from '@prezly/sdk/dist/types';

import { useDevice, useInfiniteStoriesLoading } from '@/hooks';
import type { PaginationProps, StoryWithContent } from 'types';

import LoadMore from './LoadMore';
import LoadMoreButton from './LoadMoreButton';
import StoriesList from './StoriesList';

type Props = {
    initialStories: StoryWithContent[];
    pagination: PaginationProps;
    category?: Category;
};

function InfiniteStories({ initialStories, pagination, category }: Props) {
    const { canLoadMore, displayedStories, loadMoreStories, isLoading } = useInfiniteStoriesLoading(
        initialStories,
        pagination,
        category,
    );

    const { isTablet } = useDevice();

    return (
        <div className="mb-16">
            <StoriesList stories={displayedStories} />

            {isTablet ? (
                <LoadMoreButton
                    canLoadMore={canLoadMore}
                    isLoading={isLoading}
                    onLoadMore={loadMoreStories}
                />
            ) : (
                <LoadMore onLoadMore={loadMoreStories} canLoadMore={canLoadMore} />
            )}
        </div>
    );
}

export default InfiniteStories;
