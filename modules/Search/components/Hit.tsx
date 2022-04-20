import type { AlgoliaStory } from '@prezly/theme-kit-nextjs';
import Link from 'next/link';
import type { Hit } from 'react-instantsearch-core';
import { Highlight } from 'react-instantsearch-dom';

import Icon from '@/components/Icon';
import StoryMeta from '@/components/StoryMeta';

import styles from './Hit.module.css';

interface Props {
    hit: Hit<{ attributes: AlgoliaStory }>;
}

const MAX_TOTAL_TEXT_LENGTH = 300;

function HitComponent({ hit }: Props) {
    const { attributes: story } = hit;
    const { content_text, slug, subtitle, published_at, categories } = story;

    return (
        <div className="mb-16">
            <StoryMeta published_at={published_at} categories={categories} />
            <h2 className={styles.title}>
                <Link href={`/${slug}`} locale={false} passHref>
                    <a>
                        <Highlight hit={hit} attribute="attributes.title" tagName="mark" />
                    </a>
                </Link>
            </h2>
            {subtitle && <h3 className={styles.subtitle}>{subtitle}</h3>}
            {content_text && (
                <div className={styles.content}>
                    {content_text.slice(0, MAX_TOTAL_TEXT_LENGTH)}...
                </div>
            )}
            <Link href={`/${slug}`} passHref>
                <a className={styles.link}>
                    Read more
                    <Icon name="arrow-right" className={styles.icon} />
                </a>
            </Link>
        </div>
    );
}

export default HitComponent;
