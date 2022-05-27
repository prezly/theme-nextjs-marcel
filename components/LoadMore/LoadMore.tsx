import { useIntersectionObserver } from '@react-hookz/web';
import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';

import styles from './LoadMore.module.css';

type Props = {
    canLoadMore: boolean;
    onLoadMore: () => void;
};

function LoadMore({ canLoadMore, onLoadMore }: PropsWithChildren<Props>) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const intersection = useIntersectionObserver(wrapperRef, { threshold: [1.0] });

    const { isIntersecting } = intersection || {};

    useEffect(() => {
        if (isIntersecting && canLoadMore) {
            onLoadMore();
        }
    }, [isIntersecting, canLoadMore, onLoadMore]);

    if (!canLoadMore) {
        return null;
    }

    return (
        <div ref={wrapperRef} className="flex justify-center align-center h-16 py-3">
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
        </div>
    );
}

export default LoadMore;
