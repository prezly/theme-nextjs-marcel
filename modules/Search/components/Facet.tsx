import { Disclosure } from '@headlessui/react';
import { IconCaret } from '@prezly/icons';
import translations from '@prezly/themes-intl-messages';
import { Button } from '@prezly/themes-ui-components';
import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import type { RefinementListExposed, RefinementListProvided } from 'react-instantsearch-core';
import { connectRefinementList } from 'react-instantsearch-dom';
import { FormattedDate, FormattedMessage } from 'react-intl';

import Checkbox from '@/components/Checkbox';

import { type ArrayElement, FacetAttribute } from '../types';

import styles from './Facet.module.css';

const DEFAULT_FACETS_LIMIT = 4;

function Facet({ attribute, items, refine }: RefinementListProvided & RefinementListExposed) {
    const [isExtended, setIsExtended] = useState(false);
    const visibleItems = useMemo(
        () =>
            items
                .sort((a, b) => a.label.localeCompare(b.label))
                .slice(0, isExtended ? undefined : DEFAULT_FACETS_LIMIT),
        [isExtended, items],
    );

    function toggleList() {
        return setIsExtended((i) => !i);
    }

    const facetTitle = useMemo(() => {
        switch (attribute) {
            case FacetAttribute.CATEGORY:
                return <FormattedMessage {...translations.searchFacets.category} />;
            case FacetAttribute.YEAR:
                return <FormattedMessage {...translations.searchFacets.year} />;
            case FacetAttribute.MONTH:
                return <FormattedMessage {...translations.searchFacets.month} />;
            default:
                return attribute;
        }
    }, [attribute]);

    const getItemLabel = useCallback(
        (item: ArrayElement<typeof items>) => {
            switch (attribute) {
                case FacetAttribute.MONTH: {
                    const date = new Date();
                    date.setMonth(Number(item.label) - 1);
                    return <FormattedDate value={date} month="long" />;
                }
                default:
                    return item.label;
            }
        },
        [attribute],
    );

    if (!items.length) {
        return null;
    }

    return (
        <Disclosure as="div" className={styles.container} defaultOpen>
            {({ open }) => (
                <>
                    <Disclosure.Button className={styles.header}>
                        <span className={styles.title}>{facetTitle}</span>
                        <IconCaret
                            width={14}
                            height={14}
                            className={classNames(styles.caret, { [styles.caretOpen]: open })}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className={styles.panel}>
                        <ul className={styles.list}>
                            {visibleItems.map((item) => (
                                <li
                                    key={`${attribute}_${item.label}`}
                                    className="mb-2 last:mb-0 flex items-center"
                                >
                                    <Checkbox
                                        checked={item.isRefined}
                                        onChange={() => refine(item.value)}
                                        label={
                                            <>
                                                {getItemLabel(item)}
                                                <span className={styles.count}>({item.count})</span>
                                            </>
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                        {items.length > DEFAULT_FACETS_LIMIT && (
                            <Button
                                onClick={toggleList}
                                variation="navigation"
                                className={styles.button}
                            >
                                {isExtended ? (
                                    <FormattedMessage {...translations.search.viewLess} />
                                ) : (
                                    <FormattedMessage {...translations.search.viewMore} />
                                )}
                            </Button>
                        )}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

export default connectRefinementList(Facet);
