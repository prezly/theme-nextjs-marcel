import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { Category } from '@prezly/sdk/dist/types';
import getCategoryUrl from '@/utils/prezly/getCategoryUrl';

interface Props {
    category: Category;
}

const CategoryTag: FunctionComponent<Props> = ({ category }) => (
    <Link key={category.id} href={getCategoryUrl(category)} passHref>
        <a
            className={
                classNames(
                    'uppercase text-xs font-bold tracking-wide leading-5',
                    'py-1 px-2 bg-gray-700 rounded mr-3 mb-3 md:mb-0 last:mr-0',
                )
            }
        >
            {category.display_name}
        </a>
    </Link>
);

export default CategoryTag;
