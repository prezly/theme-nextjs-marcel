import type { Category } from '@prezly/sdk/dist/types';
import classNames from 'classnames';

import CategoryComponent from '../Category';

type Props = {
    categories: Category[];
    forcePopup?: boolean;
    onClosePopup?: () => void;
};

function Categories({ categories, forcePopup, onClosePopup }: Props) {
    const filteredCategories = categories.filter(({ stories_number }) => stories_number > 0);
    const isExtendedDisplay = filteredCategories.some(
        ({ display_description }) => !!display_description,
    );

    return (
        <ul
            className={classNames(
                !forcePopup && 'lg:flex lg:uppercase lg:items-center',
                isExtendedDisplay && 'min-w-[300px]',
            )}
        >
            {filteredCategories.map((c) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <li
                    key={c.id}
                    className={classNames(!forcePopup && 'mx-2 last:mr-0')}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    role="menuitem"
                    onClick={onClosePopup}
                >
                    <CategoryComponent
                        category={c}
                        forcePopup={forcePopup}
                        isExtendedDisplay={isExtendedDisplay}
                    />
                </li>
            ))}
        </ul>
    );
}

export default Categories;
