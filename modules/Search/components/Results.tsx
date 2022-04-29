import type { AlgoliaStory } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import type { Hit as HitType, InfiniteHitsProvided } from 'react-instantsearch-core';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import { useIntl } from 'react-intl';

import { LoadMore } from '@/components';

import { useAlgoliaState } from './AlgoliaStateContext';
import Hit from './Hit';

type SearchHit = HitType<{ attributes: AlgoliaStory }>;

function Results({ hits, hasMore, refineNext }: InfiniteHitsProvided<SearchHit>) {
    const { formatMessage } = useIntl();
    const { searching: isSearching } = useAlgoliaState();

    return (
        <>
            {!hits.length && (
                <p className="text-2xl text-center py-10">
                    {formatMessage(
                        isSearching
                            ? translations.misc.stateLoading
                            : translations.search.noResults,
                    )}
                </p>
            )}
            {hits.map((hit) => (
                <Hit key={hit.objectID} hit={hit} />
            ))}
            <LoadMore canLoadMore={hasMore} onLoadMore={refineNext} />
        </>
    );
}

export default connectInfiniteHits(Results);
