import { IconArrowRight } from '@prezly/icons';
import type { AlgoliaStory } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import Link from 'next/link';
import type { Hit } from 'react-instantsearch-core';
import { Highlight } from 'react-instantsearch-dom';
import { FormattedMessage } from 'react-intl';

import Button from '@/components/Button';
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

            <Button variant="secondary" href={`/${slug}`} className="text-lg group">
                <FormattedMessage {...translations.actions.readMore} />
                <IconArrowRight
                    className="transform translate-x-0 group-hover:translate-x-1 transition-transform"
                    width={14}
                    height={14}
                />
            </Button>
        </div>
    );
}

export default HitComponent;
