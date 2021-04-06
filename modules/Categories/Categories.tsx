import React, { FunctionComponent } from 'react';
import type { Category } from '@prezly/sdk/dist/types';
import CategoryComponent from '../Category';

type Props = {
    categories: Category[];
};

const Categories: FunctionComponent<Props> = ({ categories }) => (
    <ul className="lg:flex lg:uppercase">
        {categories.map((c) => (
            <li key={c.id} className="mx-2">
                <CategoryComponent category={c} />
            </li>
        ))}
    </ul>
);

export default Categories;
