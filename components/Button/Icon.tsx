import classNames from 'classnames';

import Icon from '../Icon';

import type { BaseProps } from './types';

import styles from './Button.module.css';

interface Props {
    icon?: BaseProps['icon'];
    isLoading?: boolean;
    placement: 'left' | 'right';
}

function ButtonIcon({ icon, isLoading, placement }: Props) {
    const isLeft = placement === 'left';
    const isRight = placement === 'right';

    if (isLoading) {
        return (
            <Icon
                name="loading"
                className={classNames(styles.icon, styles.loading, {
                    [styles.left]: isLeft,
                    [styles.right]: isRight,
                })}
            />
        );
    }

    if (icon) {
        return (
            <Icon
                name={icon}
                className={classNames(styles.icon, {
                    [styles.left]: isLeft,
                    [styles.right]: isRight,
                })}
            />
        );
    }

    return null;
}

export default ButtonIcon;
