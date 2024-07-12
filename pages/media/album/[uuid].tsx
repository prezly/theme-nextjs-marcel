/* eslint-disable @typescript-eslint/no-use-before-define */
import { NewsroomGallery } from '@prezly/sdk';
import { getAssetsUrl, getGalleryThumbnail } from '@prezly/theme-kit-core';
import { translations } from '@prezly/theme-kit-intl';
import type { GalleryAlbumPageProps } from '@prezly/theme-kit-nextjs/server';
import { getGalleryAlbumPageServerSideProps } from '@prezly/theme-kit-nextjs/server';
import dynamic from 'next/dynamic';
import { useIntl } from 'react-intl';

import Layout from '@/modules/Layout';
import { importMessages, isTrackingEnabled } from '@/utils';
import type { BasePageProps } from 'types';

const Gallery = dynamic(() => import('@/modules/Gallery'), { ssr: true });

type Props = BasePageProps & GalleryAlbumPageProps;

export default function GalleryPage({ gallery }: Props) {
    const { name } = gallery;
    const galleryThumbnail = getGalleryThumbnail(gallery);
    const metaDescription = useGalleryPageMetaDescription(gallery);

    return (
        <Layout
            title={name}
            imageUrl={galleryThumbnail ? getAssetsUrl(galleryThumbnail.uuid) : undefined}
            description={metaDescription}
        >
            <Gallery gallery={gallery} />
        </Layout>
    );
}

export const getServerSideProps = getGalleryAlbumPageServerSideProps<BasePageProps>(
    async (context, { newsroomContextProps }) => ({
        isTrackingEnabled: isTrackingEnabled(context),
        translations: await importMessages(newsroomContextProps.localeCode),
    }),
);

function useGalleryPageMetaDescription(gallery: NewsroomGallery) {
    const { formatMessage } = useIntl();
    const description = gallery.description?.trim() ?? '';

    if (gallery.type === NewsroomGallery.Type.IMAGE) {
        const imagesCount = formatMessage(translations.mediaGallery.imagesCount, {
            imagesCount: gallery.images_number,
        });

        return [imagesCount, description].filter(Boolean).join(' - ');
    }

    if (gallery.type === NewsroomGallery.Type.VIDEO) {
        const videosCount = formatMessage(translations.mediaGallery.videosCount, {
            videosCount: gallery.videos_number,
        });
        return [videosCount, description].filter(Boolean).join(' - ');
    }

    return description;
}
