import { LogoPrezly } from 'icons';

import styles from './MadeWithPrezly.module.css';

export function MadeWithPrezly() {
    return (
        <a
            // TODO: replace with new landing page URL
            href="https://prezly.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.wrapper}
        >
            <span className={styles.text}>Made with</span>

            <LogoPrezly className={styles.logo} />
        </a>
    );
}
