import type { Story } from '@prezly/sdk';
import { getStoryPublicationDate } from '@prezly/theme-kit-nextjs';
import type { AlgoliaStory } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import { FormattedDate } from 'react-intl';

import Icon from '../Icon';

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
            <Icon name="calendar" className="text-gray-100 w-5 h-5 lg:w-4 lg:h-4 mr-2" />
            <FormattedDate value={date} day="numeric" month="short" year="numeric" />
        </div>
    );
}

export default StoryPublicationDate;
