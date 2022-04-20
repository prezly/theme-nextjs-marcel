import translations from '@prezly/themes-intl-messages';
import type { SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';
import { useIntl } from 'react-intl';

import { Button, FormInput, Icon } from '@/components';

function SearchInput({ currentRefinement, refine }: SearchBoxProvided & SearchBoxExposed) {
    const { formatMessage } = useIntl();

    return (
        <form
            method="GET"
            action="/search"
            className="flex items-center bg-gray-700 justify-between px-4 py-0 rounded-lg my-12"
        >
            <Icon name="search" className="w-5 h-5 text-gray-200" />
            <FormInput
                label={formatMessage(translations.search.inputLabel)}
                type="search"
                name="query"
                value={currentRefinement}
                className="w-full mt-0 mb-0"
                onChange={(event) => refine(event.currentTarget.value)}
                placeholder={formatMessage(translations.search.inputHint, { inputHintExtra: '' })}
                autoComplete="off"
            />
            <Button
                type="submit"
                variation="navigation"
                title={formatMessage(translations.search.action)}
                icon="filter"
                iconPlacement="left"
            >
                <span className="font-normal">FILTERS</span>
            </Button>
        </form>
    );
}

export default connectSearchBox(SearchInput);
