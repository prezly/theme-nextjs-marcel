import { IconArrowRight } from '@prezly/icons';
import type { AlgoliaStory } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import Link from 'next/link';
import type { Hit } from 'react-instantsearch-core';
import { Highlight } from 'react-instantsearch-dom';
import { FormattedMessage } from 'react-intl';

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
                    <Highlight hit={hit} attribute="attributes.title" tagName="span" />
                </Link>
            </h2>
            {subtitle && <h3 className={styles.subtitle}>{subtitle}</h3>}

            <Link href={`/${slug}`} passHref className={styles.link}>
                <FormattedMessage {...translations.actions.readMore} />
                <IconArrowRight className={styles.icon} width={14} height={14} />
            </Link>
        </div>
    );
}

export default HitComponent;
