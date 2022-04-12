import type { Category } from '@prezly/sdk/dist/types';

import { useInfiniteStoriesLoading } from '@/hooks/useInfiniteStoriesLoading';
import type { PaginationProps, StoryWithContent } from 'types';

import LoadMore from './LoadMore';
import StoriesList from './StoriesList';

type Props = {
    initialStories: StoryWithContent[];
    pagination: PaginationProps;
    category?: Category;
};

function InfiniteStories({ initialStories, pagination, category }: Props) {
    const { canLoadMore, displayedStories, loadMoreStories } = useInfiniteStoriesLoading(
        initialStories,
        pagination,
        category,
    );

    return (
        <div className="mb-16">
            <StoriesList stories={displayedStories} />

            <LoadMore canLoadMore={canLoadMore} onLoadMore={loadMoreStories} />
        </div>
    );
}

export default InfiniteStories;
