import type { GalleryAlbumPageProps } from '@prezly/theme-kit-nextjs';
import { getGalleryAlbumPageServerSideProps } from '@prezly/theme-kit-nextjs';
import dynamic from 'next/dynamic';
import type { FunctionComponent } from 'react';

import Layout from '@/modules/Layout';
import { importMessages, isTrackingEnabled } from '@/utils';
import type { BasePageProps } from 'types';

const Gallery = dynamic(() => import('@/modules/Gallery'), { ssr: true });

type Props = BasePageProps & GalleryAlbumPageProps;

const GalleryPage: FunctionComponent<Props> = ({ gallery }) => {
    const { title, images } = gallery;

    return (
        <Layout title={title} imageUrl={images[0].uploadcare_image.uuid}>
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
