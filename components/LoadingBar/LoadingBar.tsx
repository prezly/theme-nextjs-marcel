import classNames from 'classnames';

import styles from './LoadingBar.module.css';

interface Props {
    isLoading: boolean;
}

function LoadingBar({ isLoading }: Props) {
    return <div className={classNames(styles.bar, { [styles.visible]: isLoading })} />;
}

export default LoadingBar;
