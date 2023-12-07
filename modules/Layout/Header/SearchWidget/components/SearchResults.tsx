import type { AlgoliaStory } from '@prezly/theme-kit-core';
import { translations } from '@prezly/theme-kit-intl';
import classNames from 'classnames';
import type { StateResultsProvided } from 'react-instantsearch-core';
import { Hits } from 'react-instantsearch-dom';
import { FormattedMessage } from 'react-intl';

import { IconArrowRight } from '@/icons';

import Hit from './Hit';

import styles from './MainPanel.module.css';

type Props = Pick<StateResultsProvided<AlgoliaStory>, 'searchResults'> & {
    query?: string;
};

function SearchResults({ searchResults, query }: Props) {
    const totalResults = searchResults?.nbHits ?? 0;

    return (
        <div className="px-6 py-2">
            {!totalResults && (
                <p className={styles.empty}>
                    <FormattedMessage {...translations.search.noResults} />
                </p>
            )}
            <Hits hitComponent={Hit} />
            {totalResults > 3 && (
                <a
                    href={`/search?query=${query}`}
                    className={classNames(styles.link, 'text-primary mt-6 mb-3 uppercase')}
                >
                    <span>View All</span>
                    <IconArrowRight className="ml-2" width={14} height={14} />
                </a>
            )}
        </div>
    );
}

export default SearchResults;
