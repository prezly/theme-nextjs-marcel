import classNames from 'classnames';
import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    className?: string;
    description?: string;
    error?: string;
}

function FormInput({ className, label, error, description, ...inputProps }: Props) {
    return (
        <label className={classNames('block', className)}>
            <span className="absolute w-1 h-1 p-0 -m-1 overflow-hidden border-0">{label}</span>
            <input
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...inputProps}
                className="appearance-none block w-full bg-transparent py-3 px-4 leading-tight focus:outline-none"
            />
            {description && !error && (
                <p className="text-xs mt-1 mb-0 text-gray-500 p-2">{description}</p>
            )}
            {error && <p className="text-xs mt-1 mb-0 text-red-500 p-2">{error}</p>}
        </label>
    );
}

export default FormInput;
