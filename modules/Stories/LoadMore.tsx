import { FunctionComponent, useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';

type Props = {
    canLoadMore: boolean;
    isLoading: boolean;
    onLoadMore: () => void;
};

const LoadMore: FunctionComponent<Props> = ({ canLoadMore, isLoading, onLoadMore }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const intersection = useIntersection(wrapperRef, { threshold: 1 });

    const { isIntersecting } = intersection || {};

    useEffect(() => {
        if (isIntersecting && canLoadMore) {
            onLoadMore();
        }
    }, [isIntersecting, canLoadMore, onLoadMore]);

    return (
        <div ref={wrapperRef}>
            {isLoading ? 'Loading more stories...' : ''}
        </div>
    );
};

export default LoadMore;
