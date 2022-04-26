import { useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import type { SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, FormInput, Icon } from '@/components';

interface Props extends SearchBoxProvided, SearchBoxExposed {}

const SEARCH_PAGE_URL = 'search';

function SearchBar({ currentRefinement, refine }: Props) {
    const { formatMessage } = useIntl();
    const getLinkLocaleSlug = useGetLinkLocaleSlug();
    const localeSlug = getLinkLocaleSlug();

    const action = localeSlug ? `/${localeSlug}/${SEARCH_PAGE_URL}` : `/${SEARCH_PAGE_URL}`;

    return (
        <form
            method="GET"
            action={action}
            className="border-b-2 border-b-gray-600 flex justify-between items-start"
        >
            <div className="flex-grow relative">
                <FormInput
                    label={formatMessage(translations.search.inputLabel)}
                    type="search"
                    name="query"
                    value={currentRefinement}
                    onChange={(event) => refine(event.currentTarget.value)}
                    autoComplete="off"
                />
                {!currentRefinement.length && (
                    <span className="text-base absolute top-0 left-1 right-0 border-t-2 border-t-transparent border-b-2 border-b-transparent px-4 py-2 text-gray-400 pointer-events-none">
                        <FormattedMessage {...translations.search.inputHint} />
                    </span>
                )}
            </div>
            <Button variation="navigation" className="mt-2" type="submit">
                <Icon name="search" className="text-primary" />
            </Button>
        </form>
    );
}

export default connectSearchBox(SearchBar);
