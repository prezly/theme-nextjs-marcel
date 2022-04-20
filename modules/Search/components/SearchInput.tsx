import translations from '@prezly/themes-intl-messages';
import classNames from 'classnames';
import { useState } from 'react';
import type { SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';
import { useIntl } from 'react-intl';

import { Button, FormInput, Icon } from '@/components';

import { AVAILABLE_FACET_ATTRIBUTES } from '../utils';

import Facet from './Facet';

import styles from './SearchInput.module.css';

function SearchInput({ currentRefinement, refine }: SearchBoxProvided & SearchBoxExposed) {
    const { formatMessage } = useIntl();
    const [isShown, setIsShown] = useState(false);

    function toggleFacets() {
        return setIsShown((s) => !s);
    }

    return (
        <form
            method="GET"
            action="/search"
            className="flex items-center bg-gray-700 justify-between px-4 py-0 rounded-lg my-12 relative"
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
                variation="navigation"
                icon="filter"
                iconPlacement="left"
                onClick={toggleFacets}
            >
                <span className="font-normal">FILTERS</span>
            </Button>
            <div className={classNames(styles.facets, { [styles.facetsOpen]: isShown })}>
                {AVAILABLE_FACET_ATTRIBUTES.map((attribute) => (
                    <Facet key={attribute} attribute={attribute} />
                ))}
            </div>
        </form>
    );
}

export default connectSearchBox(SearchInput);
