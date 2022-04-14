import classNames from 'classnames';
import type { ReactNode } from 'react';

interface Props {
    isMenuOpen: boolean;
    dropdownList: Array<ReactNode>;
}

function Dropdown({ isMenuOpen, dropdownList }: Props) {
    return (
        <div
            className={classNames(
                isMenuOpen ? 'block absolute top-full right-0 z-50 sm:mt-0 md:mt-3' : 'hidden',
                isMenuOpen &&
                    'bg-gray-700 border border-gray-600 rounded-xl overflow-hidden min-w-[200px]',
            )}
        >
            <ul className={classNames('w-screen md:w-[320px]')}>{dropdownList}</ul>
        </div>
    );
}

export default Dropdown;
