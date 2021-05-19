import type { FunctionComponent } from 'react';
import { PaginationProps } from 'types';
import Pagination from './Pagination';
import StoriesList from './StoriesList';
import { StoryWithContent } from './lib/types';

type Props = {
    stories: StoryWithContent[];
    pagination: PaginationProps;
};

const PaginatedStories: FunctionComponent<Props> = ({ stories, pagination }) => (
    <div>
        <StoriesList stories={stories} />

        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Pagination {...pagination} />
    </div>
);

export default PaginatedStories;
