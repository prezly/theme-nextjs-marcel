import type { Story } from '@prezly/sdk';
import { useCurrentLocale } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import { format } from 'date-fns';
import * as locales from 'date-fns/locale';
import type { PropsWithChildren } from 'react';

import Icon from '../Icon';

interface Props {
    story: Story;
    className?: string;
}

function StoryPublicationDate({ story, className }: PropsWithChildren<Props>) {
    const currentLocale = useCurrentLocale().toHyphenCode().replace('-', '');
    const { published_at } = story;

    const selectedLocale: Locale = (locales as any)[currentLocale];

    const publishedDate = format(new Date(published_at as string), 'LLL d, yyyy', {
        locale: selectedLocale,
    });

    return (
        <div className={classNames('flex items-center leading-5', className)}>
            <Icon name="calendar" className="text-gray-100 w-5 h-5 lg:w-4 lg:h-4 mr-2" />
            {publishedDate}
        </div>
    );
}

export default StoryPublicationDate;
