import translations from '@prezly/themes-intl-messages';
import { useIntl } from 'react-intl';

import Button from '@/components/Button';

interface Props {
    canLoadMore: boolean;
    isLoading: boolean;
    onLoadMore: () => void;
}

function LoadMoreButton({ canLoadMore, onLoadMore, isLoading }: Props) {
    const { formatMessage } = useIntl();

    if (!canLoadMore) return null;

    return (
        <div className="flex items-center justify-center">
            <Button
                variation="primary"
                onClick={onLoadMore}
                className="border-none rounded-lg px-[16px] py-[12px] w-full sm:w-max font-normal text-gray-200"
            >
                {formatMessage(
                    isLoading ? translations.misc.stateLoading : translations.actions.loadMore,
                )}
            </Button>
        </div>
    );
}

export default LoadMoreButton;
