import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import type { Category } from '@prezly/sdk/dist/types';

import CategoryComponent from '../Category';

type Props = {
    categories: Category[];
    forcePopup?: boolean;
};

const Categories: FunctionComponent<Props> = ({ categories, forcePopup }) => (
    <ul
        className={classNames(
            !forcePopup && 'lg:flex lg:uppercase lg:items-center',
        )}
    >
        {categories.map((c) => (
            <li
                key={c.id}
                className={classNames(!forcePopup && 'mx-2')}
            >
                <CategoryComponent category={c} forcePopup={forcePopup} />
            </li>
        ))}
    </ul>
);

export default Categories;
