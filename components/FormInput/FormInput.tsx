import classNames from 'classnames';
import type { InputHTMLAttributes } from 'react';

import styles from './InputForm.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    className?: string;
    description?: string;
    error?: string;
}

function FormInput({ className, label, error, description, ...inputProps }: Props) {
    return (
        <label className={classNames(styles.wrapper, className)}>
            <span className={styles.label}>{label}</span>
            <input
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...inputProps}
                className={styles.input}
            />
            {description && !error && <p className={styles.description}>{description}</p>}
            {error && <p className={styles.error}>{error}</p>}
        </label>
    );
}

export default FormInput;
