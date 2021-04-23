import type { FunctionComponent } from 'react';
import type { Story } from '@prezly/sdk';

import StoryItem from './StoryItem';

type Props = {
    stories: Story[];
};

const Stories: FunctionComponent<Props> = ({ stories }) => (
    <div className="flex-grow">
        {!stories.length && (
            <p className="text-2xl text-center py-10">No stories here yet.</p>
        )}
        {stories.map((story) => (
            <StoryItem key={story.uuid} story={story} />
        ))}
    </div>
);

export default Stories;
