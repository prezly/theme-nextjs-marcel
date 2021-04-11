import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import type { Category } from '@prezly/sdk/dist/types';

import CategoryComponent from '../Category';

type Props = {
    categories: Category[];
    forcePopup?: boolean;
};

const Categories: FunctionComponent<Props> = ({ categories, forcePopup }) => {
    const isExtendedDisplay = categories.some(({ display_description }) => !!display_description);

    return (
        <ul
            className={classNames(
                !forcePopup && 'lg:flex lg:uppercase lg:items-center',
                isExtendedDisplay && 'min-w-[300px]',
            )}
        >
            {categories.map((c) => (
                <li
                    key={c.id}
                    className={classNames(!forcePopup && 'mx-2')}
                >
                    <CategoryComponent category={c} forcePopup={forcePopup} isExtendedDisplay={isExtendedDisplay} />
                </li>
            ))}
        </ul>
    );
};

export default Categories;
