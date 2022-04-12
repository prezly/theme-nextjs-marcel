import type { PaginationProps, StoryWithContent } from 'types';

import Pagination from './Pagination';
import StoriesList from './StoriesList';

type Props = {
    stories: StoryWithContent[];
    pagination: PaginationProps;
};

function PaginatedStories({ stories, pagination }: Props) {
    return (
        <div>
            <StoriesList stories={stories} />

            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Pagination {...pagination} />
        </div>
    );
}

export default PaginatedStories;
