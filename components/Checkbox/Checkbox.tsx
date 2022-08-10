import { IconCheck } from '@prezly/icons';
import classNames from 'classnames';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Props = {
    label?: ReactNode;
    htmlFor?: string;
} & ComponentPropsWithoutRef<'input'>;

function Checkbox({ htmlFor, label, className, disabled, type, ...props }: Props) {
    return (
        <div
            className={classNames('flex items-center gap-x-2', {
                'opacity-50 pointer-events-none select-none': disabled,
            })}
        >
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    className={classNames(
                        'w-4 h-4 appearance-none border checked:bg-neutral-600 rounded border-neutral-300 peer focus:ring-primary-light focus:ring-4',
                        className,
                    )}
                    disabled={disabled}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...props}
                />
                <IconCheck
                    className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 hidden peer-checked:block"
                    width={10}
                    height={10}
                />
            </div>
            {label && (
                <label className="text-white font-medium" htmlFor={htmlFor}>
                    {label}
                </label>
            )}
        </div>
    );
}

export default Checkbox;
