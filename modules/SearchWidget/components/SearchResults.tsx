import type { AlgoliaStory } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { StateResultsProvided } from 'react-instantsearch-core';
import { Hits } from 'react-instantsearch-dom';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/components';

import Hit from './Hit';

import styles from './MainPanel.module.css';

type Props = Pick<StateResultsProvided<AlgoliaStory>, 'searchResults'> & {
    query?: string;
};

function SearchResults({ searchResults, query }: Props) {
    const { nbHits: totalResults } = searchResults;
    const { asPath } = useRouter();

    const isOnSearchPage = asPath.startsWith('/search');

    return (
        <div className="px-4 py-2">
            {!totalResults && (
                <p className={styles.empty}>
                    <FormattedMessage {...translations.search.noResults} />
                </p>
            )}
            <Hits hitComponent={Hit} />
            {totalResults > 3 && isOnSearchPage ? (
                <a href={`/search?query=${query}`} className={styles.link}>
                    <span>View All</span>
                    <Icon name="arrow-right" className="w-3.5 h-3.5 ml-2" />
                </a>
            ) : (
                <Link href={`/search?query=${query}`} passHref>
                    <a className={classNames(styles.link, 'text-primary mt-6 mb-3 uppercase')}>
                        <span>View All</span>
                        <Icon name="arrow-right" className="w-3.5 h-3.5 ml-2" />
                    </a>
                </Link>
            )}
        </div>
    );
}

export default SearchResults;
