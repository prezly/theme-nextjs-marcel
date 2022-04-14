import { useCategories } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import classNames from 'classnames';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';

import CategoryComponent from './Category';

interface Props {
    className?: string;
}

function CategoriesDropdown({ className }: Props) {
    const categories = useCategories();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen((o) => !o);
    }
    function closeMenu() {
        setIsMenuOpen(false);
    }
    const { formatMessage } = useIntl();

    const filteredCategories = categories.filter(({ stories_number }) => stories_number > 0);
    const isExtendedDisplay = filteredCategories.some(
        ({ display_description }) => !!display_description,
    );

    if (!filteredCategories.length) {
        return null;
    }

    return (
        <div className={classNames('md:relative flex items-center z-10', className)}>
            {isMenuOpen && (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div className="fixed top-0 left-0 right-0 bottom-0 z-[-1]" onClick={toggleMenu} />
            )}
            <Button
                content={formatMessage(translations.categories.title)}
                variation="tertiary"
                onClick={toggleMenu}
                className="uppercase"
                icon="caret"
                iconPlacement="right"
                isActive={isMenuOpen}
            />
            <Dropdown
                isMenuOpen={isMenuOpen}
                dropdownList={filteredCategories.map((c) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <li
                        key={c.id}
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                        role="menuitem"
                        onClick={closeMenu}
                    >
                        <CategoryComponent category={c} isExtendedDisplay={isExtendedDisplay} />
                    </li>
                ))}
            />
        </div>
    );
}

export default CategoriesDropdown;
