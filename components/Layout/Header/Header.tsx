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

const MAX_DISPLAYED_CATEGORIES = 5;

const Header: FunctionComponent<Props> = ({ newsroom, categories }) => {
    // TODO: Show logo when Image component from `website-nextjs` repo is extracted to a package
    const { display_name, newsroom_logo } = newsroom;

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((o) => !o);

    const canShowCategories = categories && categories.length <= MAX_DISPLAYED_CATEGORIES;

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
                    <div className="relative flex items-center z-0">
                        {isMenuOpen && (
                            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                            <div
                                className="fixed top-0 left-0 right-0 bottom-0 z-[-1]"
                                onClick={toggleMenu}
                            />
                        )}

                        <button
                            type="button"
                            title="Toggle categories menu"
                            aria-label="Toggle categories menu"
                            className={classNames(
                                'p-2 md:py-1 flex items-center rounded-md leading-6 tracking-wide',
                                'hover:bg-gray-700 active:bg-gray-600 active:text-gray-100',
                                'focus-visible:ring focus-visible:ring-inset focus-visible:ring-4',
                                'focus-visible:ring-blue-300 focus:outline-none',
                                { 'bg-gray-600 text-gray-100': isMenuOpen },
                                { 'lg:hidden': canShowCategories },
                            )}
                            onClick={toggleMenu}
                        >
                            <Icon name="menu" />
                            <span className="hidden md:block uppercase ml-2">Categories</span>
                        </button>

                        <div
                            className={classNames(
                                { 'lg:block': canShowCategories },
                                isMenuOpen ? 'block absolute top-full right-0 z-50 mt-3' : 'hidden',
                                isMenuOpen && 'bg-gray-700 border border-gray-600 rounded-xl py-1 overflow-hidden min-w-[200px]',
                            )}
                        >
                            <Categories categories={categories} forcePopup={!canShowCategories} />
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
