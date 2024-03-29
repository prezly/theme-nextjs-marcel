import { getAssetsUrl, getGalleryThumbnail } from '@prezly/theme-kit-core';
import type { GalleryAlbumPageProps } from '@prezly/theme-kit-nextjs/server';
import { getGalleryAlbumPageServerSideProps } from '@prezly/theme-kit-nextjs/server';
import dynamic from 'next/dynamic';
import type { FunctionComponent } from 'react';

import Layout from '@/modules/Layout';
import { importMessages, isTrackingEnabled } from '@/utils';
import type { BasePageProps } from 'types';

const Gallery = dynamic(() => import('@/modules/Gallery'), { ssr: true });

type Props = BasePageProps & GalleryAlbumPageProps;

const GalleryPage: FunctionComponent<Props> = ({ gallery }) => {
    const { name } = gallery;
    const galleryThumbnail = getGalleryThumbnail(gallery);

    return (
        <Layout
            title={name}
            imageUrl={galleryThumbnail ? getAssetsUrl(galleryThumbnail.uuid) : undefined}
        >
            <Gallery gallery={gallery} />
        </Layout>
    );
};

export const getServerSideProps = getGalleryAlbumPageServerSideProps<BasePageProps>(
    async (context, { newsroomContextProps }) => ({
        isTrackingEnabled: isTrackingEnabled(context),
        translations: await importMessages(newsroomContextProps.localeCode),
    }),
);

export default GalleryPage;
