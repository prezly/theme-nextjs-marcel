import translations from '@prezly/themes-intl-messages';
import { useIntl } from 'react-intl';

import { Button } from '@/ui';

import styles from './LoadMoreButton.module.css';

interface Props {
    canLoadMore: boolean;
    isLoading: boolean;
    onLoadMore: () => void;
}

function LoadMoreButton({ canLoadMore, onLoadMore, isLoading }: Props) {
    const { formatMessage } = useIntl();

    if (!canLoadMore) return null;

    return (
        <div className={styles.container}>
            <Button variation="primary" onClick={onLoadMore} className={styles.button}>
                {formatMessage(
                    isLoading ? translations.misc.stateLoading : translations.actions.loadMore,
                )}
            </Button>
        </div>
    );
}

export default LoadMoreButton;
