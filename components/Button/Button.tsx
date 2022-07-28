import classNames from 'classnames';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SharedProps = {
    variant?: 'primary' | 'secondary' | 'tertiary';
    loading?: boolean;
    fullWidth?: boolean;
    className?: string;
    children: ReactNode;
};
type ButtonProps = SharedProps & ComponentPropsWithoutRef<'button'>;
type ButtonAsLinkProps = SharedProps & LinkProps;
type ButtonOverload = {
    (props: ButtonProps): JSX.Element;
    (props: ButtonAsLinkProps): JSX.Element;
};

function hasHref(props: ButtonProps | ButtonAsLinkProps): props is ButtonAsLinkProps {
    return 'href' in props;
}

// eslint-disable-next-line func-style
const Button: ButtonOverload = (props: ButtonProps | ButtonAsLinkProps) => {
    const { variant = 'primary', fullWidth = false, loading = false, className, ...rest } = props;

    const classes = classNames(
        'rounded-lg inline-flex gap-x-2 justify-center items-center transition-all active:ring-0 cursor-pointer',
        {
            'py-3 px-4 bg-primary-darker hover:bg-primary focus:bg-primary-light focus:ring-4 focus:ring-primary-lightest active:bg-primary-darkest text-white':
                variant === 'primary',
            'bg-transparent text-primary-light hover:text-primary-lightest focus:text-primary-light focus:ring-3 focus:ring-primary-light active:text-primary':
                variant === 'secondary',
            'py-1 px-3 bg-transparent hover:bg-neutral-700 focus:ring-3 focus:bg-neutral-700 focus:ring-primary-light active:bg-neutral-700 text-white':
                variant === 'tertiary',
            'w-full': fullWidth,
        },
        className,
    );

    if (hasHref(props)) {
        return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Link className={classes} {...props}>
                {props.children}
            </Link>
        );
    }

    return (
        <button
            type={props.type ? props.type : 'button'}
            className={classNames(classes, {
                // It doesn't make sense for links to be in loading/disabled states
                // That's why this logic is only applied to button
                // https://stackoverflow.com/questions/18711317/is-disabled-a-valid-attribute-for-an-anchor-tag
                'opacity-50 pointer-events-none': props.disabled || loading,
            })}
            disabled={props.disabled || loading}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    );
};

export default Button;
