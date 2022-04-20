import { useCurrentLocale } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import { format } from 'date-fns';
import * as locales from 'date-fns/locale';
import type { PropsWithChildren } from 'react';

import Icon from '../Icon';

interface Props {
    published_at: string | number | null;
    className?: string;
}

function StoryPublicationDate({ published_at, className }: PropsWithChildren<Props>) {
    const currentLocale = useCurrentLocale().toHyphenCode().replace('-', '');

    const selectedLocale: Locale = (locales as any)[currentLocale];

    let publishedDate: string;

    if (typeof published_at === 'number') {
        publishedDate = format(new Date(published_at * 1000), 'LLL d, yyyy', {
            locale: selectedLocale,
        });
    } else {
        publishedDate = format(new Date(published_at as string), 'LLL d, yyyy', {
            locale: selectedLocale,
        });
    }

    return (
        <div className={classNames('flex items-center leading-5', className)}>
            <Icon name="calendar" className="text-gray-100 w-5 h-5 lg:w-4 lg:h-4 mr-2" />
            {publishedDate}
        </div>
    );
}

export default StoryPublicationDate;
