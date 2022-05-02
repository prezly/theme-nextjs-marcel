import type { NewsroomGallery } from '@prezly/sdk';
import { getUploadcareGroupUrl } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button, SlateRenderer, StoryShareSocial } from '@/components';

import Layout from '../Layout';

import styles from './Gallery.module.css';

interface Props {
    gallery: NewsroomGallery;
}

function Gallery({ gallery }: Props) {
    const { title, images, content, uploadcare_group_uuid } = gallery;
    const [url, setUrl] = useState<string>();

    useEffect(() => {
        if (typeof window !== undefined) {
            setUrl(window.location.href);
        }
    }, []);

    return (
        <Layout title={title} imageUrl={images[0].uploadcare_image.uuid}>
            <div className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
            </div>

            <div className={styles.actions}>
                {uploadcare_group_uuid && (
                    <Button.Link
                        variation="primary"
                        href={getUploadcareGroupUrl(uploadcare_group_uuid, title)}
                        className={styles.button}
                        icon="download"
                        iconPlacement="right"
                    >
                        <FormattedMessage {...translations.actions.download} />
                    </Button.Link>
                )}
                {url && <StoryShareSocial url={url} className={styles.social} />}
            </div>

            <SlateRenderer nodes={JSON.parse(content)} />
        </Layout>
    );
}

export default Gallery;
