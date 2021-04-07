import type { FunctionComponent } from 'react';
import type { Story } from '@prezly/sdk';

import StoryItem from './StoryItem';

type Props = {
    stories: Story[];
};

const Stories: FunctionComponent<Props> = ({ stories }) => (
    <div>
        {stories.map((story) => (
            <StoryItem key={story.id} story={story} />
        ))}
    </div>
);

export default Stories;
