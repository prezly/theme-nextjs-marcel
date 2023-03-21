import classNames from 'classnames';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { IconCheck } from '@/icons';

type Props = {
    label: ReactNode;
    htmlFor?: string;
} & ComponentPropsWithoutRef<'input'>;

function Checkbox({ htmlFor, label, className, disabled, type, ...props }: Props) {
    return (
        <label
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
                    aria-hidden="true"
                />
            </div>
            <div className="text-white font-medium">{label}</div>
        </label>
    );
}

export default Checkbox;
