import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import type { Category } from '@prezly/sdk/dist/types';

import CategoryComponent from '../Category';

type Props = {
    categories: Category[];
    forcePopup?: boolean;
    onClosePopup?: () => void;
};

const Categories: FunctionComponent<Props> = ({ categories, forcePopup, onClosePopup }) => {
    const isExtendedDisplay = categories.some(({ display_description }) => !!display_description);

    return (
        <ul
            className={classNames(
                !forcePopup && 'lg:flex lg:uppercase lg:items-center',
                isExtendedDisplay && 'min-w-[300px]',
            )}
        >
            {categories.map((c) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <li
                    key={c.id}
                    className={classNames(!forcePopup && 'mx-2 last:mr-0')}
                    role="menuitem"
                    onClick={onClosePopup}
                >
                    <CategoryComponent category={c} forcePopup={forcePopup} isExtendedDisplay={isExtendedDisplay} />
                </li>
            ))}
        </ul>
    );
};

export default Categories;
