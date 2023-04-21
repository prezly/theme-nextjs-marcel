import classNames from 'classnames';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import { makeCompoundComponent } from '@/utils';

import { Icon } from './Icon';
import { Link } from './Link';
import type { BaseProps } from './types';

import styles from './Button.module.scss';

export interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    isDisabled?: boolean;
    // TODO: This prop does basically nothing (and only works for navigation)
    isActive?: boolean;
    activeClassName?: string;
    onClick?: () => void;
    contentClassName?: string;
}

const ButtonComponent = forwardRef<
    HTMLButtonElement,
    Omit<PropsWithChildren<ButtonProps>, 'onResize' | 'onResizeCapture'>
>(
    (
        {
            variation,
            className,
            type = 'button',
            icon,
            iconPlacement = 'left',
            isLoading,
            isDisabled,
            isActive,
            activeClassName,
            onClick,
            children,
            contentClassName,
            ...buttonProps
        },
        ref,
    ) => (
        <button
            ref={ref}
            // eslint-disable-next-line react/button-has-type
            type={type}
            className={classNames(styles.button, className, {
                [styles.primary]: variation === 'primary',
                [styles.secondary]: variation === 'secondary',
                [styles.navigation]: variation === 'navigation',
                [styles.loading]: isLoading,
                [styles.active]: isActive,
                ...(activeClassName && {
                    [activeClassName]: isActive,
                }),
                [styles.iconOnly]: Boolean(icon) && !children,
            })}
            onClick={onClick}
            disabled={isDisabled || isLoading}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...buttonProps}
        >
            {iconPlacement === 'left' && (
                <Icon icon={icon} isLoading={isLoading} placement="left" />
            )}
            {/* If there are no children, we insert a zero-width space to preserve the line-height */}
            <span className={contentClassName}>{children ?? <>&#8203;</>}</span>
            {iconPlacement === 'right' && (
                <Icon icon={icon} isLoading={isLoading} placement="right" />
            )}
        </button>
    ),
);

ButtonComponent.displayName = 'Button';

export const Button = makeCompoundComponent(ButtonComponent, { Link });
