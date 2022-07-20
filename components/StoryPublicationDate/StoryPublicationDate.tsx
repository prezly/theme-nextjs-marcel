import { IconCalendar } from '@prezly/icons';
import type { Story } from '@prezly/sdk';
import { getStoryPublicationDate } from '@prezly/theme-kit-nextjs';
import type { AlgoliaStory } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import { FormattedDate } from 'react-intl';

interface Props {
    story: Story | AlgoliaStory;
    className?: string;
}

function StoryPublicationDate({ story, className }: PropsWithChildren<Props>) {
    const date = getStoryPublicationDate(story);

    if (!date) {
        return null;
    }

    return (
        <div className={classNames('flex items-center leading-5', className)}>
            <IconCalendar
                className="text-neutral-400 w-5 h-5 lg:w-4 lg:h-4 mr-2"
                width="16px"
                height="16px"
            />
            <FormattedDate value={date} day="numeric" month="short" year="numeric" />
        </div>
    );
}

export default StoryPublicationDate;
