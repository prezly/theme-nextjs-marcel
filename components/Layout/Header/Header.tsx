import { useNewsroom } from '@prezly/theme-kit-nextjs';
import Image from '@prezly/uploadcare-image';
import Link from 'next/link';

import CategoriesDropdown from '@/modules/CategoriesDropdown';
import LanguagesDropdown from '@/modules/LanguagesDropdown';

function Header() {
    const newsroom = useNewsroom();

    // TODO: Show logo when Image component from `website-nextjs` repo is extracted to a package
    const { display_name, newsroom_logo } = newsroom || {};

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

                <div className="flex items-center justify-between">
                    <CategoriesDropdown className="mr-4" />
                    <LanguagesDropdown />
                </div>
            </nav>
        </header>
    );
}

export default Header;
