import classNames from 'classnames';

import Icon from '../Icon';

import styles from './ScrollToTopButton.module.css';

interface Props {
    isVisible: boolean;
    onClick: () => void;
}

function ScrollToTopButton({ isVisible, onClick }: Props) {
    return (
        <button
            className={classNames(styles.button, { [styles.visible]: isVisible })}
            onClick={onClick}
        >
            <Icon name="arrow-top" className="w-3.5 h-3.5" />
        </button>
    );
}

export default ScrollToTopButton;
