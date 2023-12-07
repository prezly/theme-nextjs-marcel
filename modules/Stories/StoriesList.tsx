import type { Story } from '@prezly/sdk';
import { translations } from '@prezly/theme-kit-intl';
import { useCompanyInformation, useNewsroom } from '@prezly/theme-kit-nextjs';
import { FormattedMessage } from 'react-intl';

import StoryItem from './StoryItem';

type Props = {
    stories: Story[];
};

function StoriesList({ stories }: Props) {
    const { name } = useCompanyInformation();
    const { display_name } = useNewsroom();

    return (
        <>
            {!stories.length && (
                <div>
                    <h1 className="text-[34px] text-white font-bold leading-[140%]">
                        <FormattedMessage
                            {...translations.noStories.title}
                            values={{ newsroom: name || display_name }}
                        />
                    </h1>
                    <p className="text-lg text-white mt-3 leading-[160%]">
                        <FormattedMessage {...translations.noStories.subtitle} />
                    </p>
                </div>
            )}
            {stories.map((story) => (
                <StoryItem key={story.uuid} story={story} />
            ))}
        </>
    );
}

export default StoriesList;
