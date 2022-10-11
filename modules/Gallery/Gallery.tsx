import { IconDownload } from '@prezly/icons';
import type { NewsroomGallery } from '@prezly/sdk';
import { getUploadcareGroupUrl } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button, SlateRenderer, StoryShareSocial } from '@/components';

import styles from './Gallery.module.css';

interface Props {
    gallery: NewsroomGallery;
}

function Gallery({ gallery }: Props) {
    const { name, content, description, uploadcare_group_uuid } = gallery;
    const [url, setUrl] = useState<string>();

    useEffect(() => {
        if (typeof window !== undefined) {
            setUrl(window.location.href);
        }
    }, []);

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>{name}</h1>
                {(description || true) && (
                    <p className="text-white text-lg leading-7">{description}</p>
                )}
            </div>

            <div className={styles.actions}>
                {uploadcare_group_uuid && (
                    <Button
                        variant="primary"
                        href={getUploadcareGroupUrl(uploadcare_group_uuid, name)}
                        className={styles.button}
                    >
                        <FormattedMessage {...translations.actions.download} />{' '}
                        <IconDownload width={16} height={16} />
                    </Button>
                )}
                {url && <StoryShareSocial url={url} className={styles.social} />}
            </div>

            <SlateRenderer nodes={JSON.parse(content)} />
        </div>
    );
}

export default Gallery;
