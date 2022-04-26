import classNames from 'classnames';

import Icon from '../Icon';

interface Props {
    isVisible: boolean;
    onClick: () => void;
}

function ScrollToTopButton({ isVisible, onClick }: Props) {
    return (
        <button
            className={classNames(
                'fixed bottom-12 right-12 text-sm py-4 px-4 bg-gray-600 bg-opacity-80 rounded-lg',
                'hover:bg-gray-600 active:bg-gray-500 active:text-gray-100',
                'focus-visible:ring focus-visible:ring-inset',
                'focus-visible:ring-blue-300 focus:outline-none',
                isVisible ? 'inline-block' : 'hidden',
            )}
            onClick={onClick}
        >
            <Icon name="arrow-top" className="w-3.5 h-3.5" />
        </button>
    );
}

export default ScrollToTopButton;
