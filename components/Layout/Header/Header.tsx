import { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Category, Newsroom } from '@prezly/sdk/dist/types';

import getAssetsUrl from '@/utils/prezly/getAssetsUrl';
import Categories from '@/modules/Categories';
import Icon from '@/components/Icon';

type Props = {
    newsroom: Newsroom;
    categories?: Array<Category>;
};

const Header: FunctionComponent<Props> = ({ newsroom, categories }) => {
    // TODO: Show logo when Image component from `website-nextjs` repo is extracted to a package
    const { display_name, newsroom_logo } = newsroom;

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((o) => !o);

    return (
        <header>
            <nav className="py-6 flex justify-between items-center">
                <Link href="/" passHref>
                    <a>
                        {newsroom_logo ? (
                            <img
                                src={getAssetsUrl(newsroom_logo.uuid)}
                                alt={display_name}
                                className="max-h-8"
                            />
                        ) : display_name }
                    </a>
                </Link>
                {categories && (
                    <div
                        className={classNames(
                            'hidden lg:block',
                            // ['']: isMenuOpen,
                        )}
                    >
                        <Categories categories={categories} />
                    </div>
                )}

                <button
                    type="button"
                    title="Toggle mobile menu"
                    aria-label="Toggle mobile menu"
                    className="lg:hidden px-3 py-2 flex items-center"
                    onClick={toggleMenu}
                >
                    <Icon name="menu" />
                    <span className="hidden md:block uppercase ml-2">Categories</span>
                </button>
            </nav>
        </header>
    );
};

export default Header;
