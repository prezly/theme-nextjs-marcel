import type { Story } from '@prezly/sdk';
import classNames from 'classnames';
import { format } from 'date-fns';
import type { PropsWithChildren } from 'react';

import Icon from '../Icon';

interface Props {
    story: Story;
    className?: string;
}

function StoryPublicationDate({ story, className }: PropsWithChildren<Props>) {
    const { published_at } = story;

    const publishedDate = format(new Date(published_at as string), 'dd/MM/yyyy');

    return (
        <div className={classNames('flex items-center leading-5', className)}>
            <Icon name="calendar" className="text-gray-400 w-5 h-5 lg:w-4 lg:h-4 mr-2" />
            {publishedDate}
        </div>
    );
}

export default StoryPublicationDate;
