import React, { FunctionComponent } from 'react';
import { format } from 'date-fns';
import classNames from 'classnames';

import { Story } from '@prezly/sdk/dist/types';
import Icon from '../Icon';

interface Props {
    story: Story;
    className?: string;
}

const StoryPublicationDate: FunctionComponent<Props> = ({ story, className }) => {
    const { published_at } = story;

    const publishedDate = format(
        new Date(published_at as string),
        'dd/MM/yyyy',
    );

    return (
        <div className={classNames('flex items-center', className)}>
            <Icon name="calendar" className="mr-2" />
            {publishedDate}
        </div>
    );
};

export default StoryPublicationDate;
