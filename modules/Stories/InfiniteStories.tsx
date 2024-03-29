import type { Category, Story } from '@prezly/sdk';
import { type PaginationProps, useInfiniteStoriesLoading } from '@prezly/theme-kit-nextjs';

import { LoadMore } from '@/components';
import { useDevice } from '@/hooks';

import LoadMoreButton from './LoadMoreButton';
import StoriesList from './StoriesList';

type Props = {
    initialStories: Story[];
    pagination: PaginationProps;
    category?: Category;
};

function InfiniteStories({ initialStories, pagination, category }: Props) {
    const { canLoadMore, stories, loadMoreStories, isLoading } = useInfiniteStoriesLoading(
        initialStories,
        pagination,
        category,
    );

    const { isTablet } = useDevice();

    return (
        <div className="mb-16">
            <StoriesList stories={stories} />

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
