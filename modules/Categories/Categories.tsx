import React, { FunctionComponent } from 'react';
import type { Category } from '@prezly/sdk/dist/types';

import Icon from '@/components/Icon';
import CategoryComponent from '../Category';

type Props = {
    categories: Category[];
};

const MAX_DISPLAYED_CATEGORIES = 5;

const Categories: FunctionComponent<Props> = ({ categories }) => {
    const displayedCategories = categories.length > MAX_DISPLAYED_CATEGORIES
        ? categories.slice(0, MAX_DISPLAYED_CATEGORIES)
        : categories;
    const extraCategories = categories.length > MAX_DISPLAYED_CATEGORIES
        ? categories.slice(MAX_DISPLAYED_CATEGORIES)
        : [];

    return (
        <ul className="lg:flex lg:uppercase lg:items-center">
            {displayedCategories.map((c) => (
                <li key={c.id} className="mx-2">
                    <CategoryComponent category={c} />
                </li>
            ))}
            {extraCategories.length && (
                <button
                    type="button"
                    title="Toggle mobile menu"
                    aria-label="Toggle mobile menu"
                    className="px-3 py-2 flex items-center"
                >
                    <Icon name="menu" />
                    <span className="hidden md:block uppercase ml-2">More categories</span>
                </button>
            )}
        </ul>
    );
};

export default Categories;
