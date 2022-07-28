import classNames from 'classnames';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

type Props<C extends ElementType> = {
    component?: C;
    variant?: 'primary' | 'secondary' | 'tertiary';
    loading?: boolean;
    fullWidth?: boolean;
} & ComponentPropsWithoutRef<C>;

function Button<C extends ElementType = 'button'>({
    component,
    variant = 'primary',
    fullWidth = false,
    loading,
    children,
    disabled,
    className,
    type = 'button',
    ...props
}: Props<C>) {
    const Component = component || 'button';
    return (
        <Component
            type={Component === 'button' ? type : undefined}
            className={classNames(
                'rounded-lg inline-flex gap-x-2 justify-center items-center transition-all active:ring-0 cursor-pointer',
                {
                    'py-3 px-4 bg-primary-darker hover:bg-primary focus:bg-primary-light focus:ring-4 focus:ring-primary-lightest active:bg-primary-darkest text-white':
                        variant === 'primary',
                    'bg-transparent text-primary-light hover:text-primary-lightest focus:text-primary-light focus:ring-3 focus:ring-primary-light active:text-primary':
                        variant === 'secondary',
                    'py-1 px-3 bg-transparent hover:bg-neutral-700 focus:ring-3 focus:bg-neutral-700 focus:ring-primary-light active:bg-neutral-700 text-white':
                        variant === 'tertiary',
                    'opacity-50 pointer-events-none': disabled || loading,
                    'w-full': fullWidth,
                },
                className,
            )}
            disabled={disabled || loading}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        />
    );
}

export default Button;
