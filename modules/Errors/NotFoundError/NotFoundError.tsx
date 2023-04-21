import translations from '@prezly/themes-intl-messages';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import Layout from '@/modules/Layout';
import { Button } from '@/ui';

import styles from './error.module.css';

function NotFoundError() {
    const router = useRouter();

    return (
        <Layout hasError>
            <div className={styles.container}>
                <h2 className={styles.statusCode}>404</h2>
                <p className={styles.title}>
                    <FormattedMessage {...translations.notFound.title} />
                </p>
                <p className={styles.description}>
                    <FormattedMessage {...translations.notFound.subtitle} />
                </p>
                <Button
                    variation="primary"
                    onClick={() => router.push('/')}
                    className={styles.button}
                >
                    <FormattedMessage {...translations.actions.backToHomePage} />
                </Button>
            </div>
        </Layout>
    );
}

export default NotFoundError;
