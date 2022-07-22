import { IconSearch } from '@prezly/icons';
import { useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import { Button, FormInput } from '@prezly/themes-ui-components';
import type { SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import styles from './SearchBar.module.css';

interface Props extends SearchBoxProvided, SearchBoxExposed {}

const SEARCH_PAGE_URL = 'search';

function SearchBar({ currentRefinement, refine }: Props) {
    const { formatMessage } = useIntl();
    const getLinkLocaleSlug = useGetLinkLocaleSlug();
    const localeSlug = getLinkLocaleSlug();

    const action = localeSlug ? `/${localeSlug}/${SEARCH_PAGE_URL}` : `/${SEARCH_PAGE_URL}`;

    return (
        <form method="GET" action={action} className={styles.container}>
            <div className={styles.inputWrapper}>
                <FormInput
                    label={formatMessage(translations.search.inputLabel)}
                    type="search"
                    name="query"
                    value={currentRefinement}
                    onChange={(event) => refine(event.currentTarget.value)}
                    className={styles.input}
                    autoComplete="off"
                />
                {!currentRefinement.length && (
                    <span className={styles.inputHint}>
                        <FormattedMessage {...translations.search.inputHint} />
                    </span>
                )}
            </div>
            <Button variation="navigation" type="submit">
                <IconSearch className="text-primary-main" width={14} height={14} />
            </Button>
        </form>
    );
}

export default connectSearchBox(SearchBar);
