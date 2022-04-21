import type { Story } from '@prezly/sdk';

import StoryItem from './StoryItem';

type Props = {
    stories: Story[];
};

function StoriesList({ stories }: Props) {
    return (
        <>
            {!stories.length && <p className="text-2xl text-center py-10">No stories here yet.</p>}
            {stories.map((story) => (
                <StoryItem key={story.uuid} story={story} />
            ))}
        </>
    );
}

export default StoriesList;
