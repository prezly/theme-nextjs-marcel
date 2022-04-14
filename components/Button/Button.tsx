import classNames from 'classnames';
import type { PropsWithChildren, ReactChild } from 'react';
import { forwardRef } from 'react';

import Icon from '../Icon';

import styles from './button.module.css';

interface Props {
    content: ReactChild;
    isLoading?: boolean;
    isDisabled?: boolean;
    icon?: string;
    iconPlacement?: 'left' | 'right';
    className?: string;
    variation?: 'primary' | 'secondary' | 'tertiary';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    isActive?: boolean;
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
    (
        {
            content,
            isDisabled,
            isLoading,
            isActive,
            icon,
            iconPlacement = 'left',
            className,
            variation,
            type = 'button',
            onClick,
        },
        ref,
    ) => (
        <button
            ref={ref}
            type={type}
            onClick={onClick}
            className={classNames(
                styles.btn,
                {
                    [styles.primary]: variation === 'primary',
                    [styles.secondary]: variation === 'secondary',
                    [styles.tertiary]: variation === 'tertiary',
                    [styles.active]: isActive,
                },
                className,
            )}
            disabled={isDisabled || isLoading}
        >
            {icon && iconPlacement === 'left' && <Icon name={icon} className="w-3.5 h-3.5 mr-1" />}
            {content}
            {icon && iconPlacement === 'right' && <Icon name={icon} className="w-3.5 h-3.5 ml-1" />}
        </button>
    ),
);

Button.displayName = 'button';

export default Button;
