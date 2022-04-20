import translations from '@prezly/themes-intl-messages';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAlgoliaState } from './AlgoliaStateContext';

function Title() {
    const { formatMessage } = useIntl();
    const { searchState, searchResults } = useAlgoliaState();

    const { query: searchQuery } = searchState;
    const resultsCount = searchResults ? searchResults.nbHits : 0;
    return (
        <>
            <h1 className="text-4xl font-bold text-gray-100 mt-6">
                {searchQuery
                    ? formatMessage(translations.search.fullResultsTitle)
                    : formatMessage(translations.search.title)}
            </h1>
            {searchQuery ? (
                <h3 className="text-gray-300 mt-6 mb-12">
                    <FormattedMessage
                        {...translations.search.fullResultsSubTitle}
                        values={{
                            resultsCount,
                            searchQuery: <>&quot;{searchQuery}&quot;</>,
                        }}
                    />
                </h3>
            ) : null}
        </>
    );
}

export default Title;
