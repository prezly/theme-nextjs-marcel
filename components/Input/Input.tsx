import { IconCheck, IconLoading, IconWarning } from '@prezly/icons';
import classNames from 'classnames';
import { forwardRef } from 'react';
import type { ComponentPropsWithRef, ForwardedRef, ReactNode } from 'react';

type Props = {
    helper?: ReactNode;
    wrapperClassName?: string;
    error?: string;
    success?: string;
    isLoading?: boolean;
} & ComponentPropsWithRef<'input'>;

function Input(
    {
        wrapperClassName,
        helper,
        error,
        success,
        isLoading,
        className,
        type = 'text',
        disabled,
        ...rest
    }: Props,
    ref: ForwardedRef<HTMLInputElement>,
) {
    const isError = Boolean(error);
    const isSuccess = Boolean(success);
    const hasIcon = isError || isLoading || isSuccess;
    return (
        <div
            className={classNames(
                'flex gap-y-2 flex-col',
                {
                    'opacity-40 select-none': disabled,
                },
                wrapperClassName,
            )}
        >
            <div className="relative flex w-full">
                <input
                    ref={ref}
                    className={classNames(
                        'px-4 py-3 w-full bg-neutral-600 text-neutral-300 rounded-lg focus:ring-4 focus:ring-primary-light outline-none transition-all',
                        {
                            'pointer-events-none': disabled,
                            '!pr-12': hasIcon,
                        },
                        className,
                    )}
                    disabled={disabled}
                    type={type}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...rest}
                />
                {hasIcon && (
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex justify-center items-center w-4 h-4">
                        {isError && <IconWarning className="text-error-tint" />}
                        {isSuccess && <IconCheck className="text-success-tint" />}
                        {isLoading && (
                            <IconLoading width={16} height={16} className="animate-spin" />
                        )}
                    </div>
                )}
            </div>
            {(helper || error || success) && (
                <div className="font-semibold text-sm flex flex-col gap-y-2">
                    {helper && <span className="text-neutral-300">{helper}</span>}
                    {error && <span className="text-error-tint">{error}</span>}
                    {success && <span className="text-success-tint">{success}</span>}
                </div>
            )}
        </div>
    );
}

export default forwardRef<HTMLInputElement, Props>(Input);
