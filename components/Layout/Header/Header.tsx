import { useAlgoliaSettings, useNewsroom } from '@prezly/theme-kit-nextjs';
import Image from '@prezly/uploadcare-image';
import Link from 'next/link';
import { useState } from 'react';

import CategoriesDropdown from '@/modules/CategoriesDropdown';
import LanguagesDropdown from '@/modules/LanguagesDropdown';

import Button from '../../Button';

function Header() {
    const newsroom = useNewsroom();
    const { ALGOLIA_API_KEY } = useAlgoliaSettings();
    const [isSearchWidgetShown, setIsSearchWidgetShown] = useState(false);

    // TODO: Show logo when Image component from `website-nextjs` repo is extracted to a package
    const { display_name, newsroom_logo } = newsroom || {};

    const IS_SEARCH_ENABLED = Boolean(ALGOLIA_API_KEY);

    function openSearchWidget() {
        setIsSearchWidgetShown(true);
    }
    function closeSearchWidget() {
        setIsSearchWidgetShown(false);
    }

    return (
        <header>
            <nav className="h-20 py-4 flex justify-between items-center">
                <Link href="/" passHref>
                    <a>
                        {newsroom_logo ? (
                            <Image
                                layout="fill"
                                objectFit="contain"
                                imageDetails={newsroom_logo}
                                alt={display_name}
                                className="w-auto max-w-xs max-h-11"
                            />
                        ) : (
                            display_name
                        )}
                    </a>
                </Link>

                <div className="hidden md:flex items-center justify-between">
                    <CategoriesDropdown className="mr-4" />
                    <LanguagesDropdown />
                    {IS_SEARCH_ENABLED && (
                        <Button
                            content="Search"
                            className="uppercase"
                            icon="search"
                            iconPlacement="left"
                            onClick={openSearchWidget}
                        />
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
