import { Button } from '@prezly/themes-ui-components';

import Layout from '@/modules/Layout';

import styles from './error.module.css';

interface Props {
    title: string;
    description?: string;
    statusCode?: number;
    action?: () => void;
    actionTitle?: string;
}

function Error({ action, actionTitle, title, description, statusCode }: Props) {
    return (
        <Layout hasError>
            <div className={styles.container}>
                <h2 className={styles.statusCode}>{statusCode}</h2>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
                {action && actionTitle && (
                    <Button variation="primary" onClick={action} className={styles.button}>
                        {actionTitle}
                    </Button>
                )}
            </div>
        </Layout>
    );
}

export default Error;
