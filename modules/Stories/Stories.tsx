import type { FunctionComponent } from 'react';

import StoryItem from './StoryItem';
import { StoryWithContent } from './types';

type Props = {
    stories: StoryWithContent[];
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
