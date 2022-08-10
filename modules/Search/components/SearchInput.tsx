import { IconFilter, IconSearch } from '@prezly/icons';
import translations from '@prezly/themes-intl-messages';
import { Button, FormInput } from '@prezly/themes-ui-components';
import classNames from 'classnames';
import { useState } from 'react';
import type { SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';
import { FormattedMessage, useIntl } from 'react-intl';

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
            className="flex items-center bg-neutral-700 justify-between px-4 py-0 rounded-lg my-6 relative"
        >
            <IconSearch className="text-neutral-200" width={20} height={20} />
            <FormInput
                label={formatMessage(translations.search.inputLabel)}
                type="search"
                name="query"
                value={currentRefinement}
                className={styles.searchInput}
                inputClassName={styles.input}
                onChange={(event) => refine(event.currentTarget.value)}
                placeholder={formatMessage(translations.search.inputHint, { inputHintExtra: '' })}
                autoComplete="off"
            />
            <Button
                variation="navigation"
                iconPlacement="left"
                onClick={toggleFacets}
                contentClassName="font-semibold tracking-wide text-sm uppercase text-neutral-200 flex gap-x-2 items-center"
            >
                <IconFilter width={14} height={14} />
                <FormattedMessage {...translations.search.filters} />
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
