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

function HitComponent({ hit }: Props) {
    const { attributes: story } = hit;
    const { slug, subtitle } = story;

    return (
        <div className="mb-16">
            <StoryMeta story={story} />
            <h2 className={styles.title}>
                <Link href={`/${slug}`} locale={false} passHref>
                    <a>
                        <Highlight hit={hit} attribute="attributes.title" tagName="span" />
                    </a>
                </Link>
            </h2>
            {subtitle && <h3 className={styles.subtitle}>{subtitle}</h3>}

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
