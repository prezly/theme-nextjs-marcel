import type { EmbargoStory } from '@prezly/theme-kit-core';
import { translations } from '@prezly/theme-kit-intl';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';

type Props = {
    story: EmbargoStory;
};

export function Embargo({ story }: Props) {
    const { timezone } = story.newsroom;

    return (
        <div className="rounded-s text-xl mb-12 p-3 font-bold text-center bg-yellow-700 border border-yellow-500">
            <FormattedMessage
                {...translations.misc.embargoMessage}
                values={{
                    date: (
                        <>
                            <FormattedDate
                                value={new Date(story.published_at)}
                                year="numeric"
                                month="long"
                                day="numeric"
                                timeZone={timezone}
                            />{' '}
                            <FormattedTime
                                value={new Date(story.published_at)}
                                hour="2-digit"
                                minute="2-digit"
                                timeZoneName="short"
                                timeZone={timezone}
                            />
                        </>
                    ),
                }}
            />
        </div>
    );
}
