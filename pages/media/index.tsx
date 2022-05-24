import type { GalleryPageProps } from '@prezly/theme-kit-nextjs';
import { getGalleryPageServerSideProps } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import dynamic from 'next/dynamic';
import type { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import Layout from '@/modules/Layout';
import { importMessages, isTrackingEnabled } from '@/utils';
import type { BasePageProps } from 'types';

const Galleries = dynamic(() => import('@/modules/Galleries'), { ssr: true });

type Props = BasePageProps & GalleryPageProps;

const GalleriesPage: FunctionComponent<Props> = ({ galleries, pagination }) => {
    const { formatMessage } = useIntl();

    return (
        <Layout title={formatMessage(translations.mediaGallery.title)}>
            <Galleries initialGalleries={galleries} pagination={pagination} />
        </Layout>
    );
};

export const getServerSideProps = getGalleryPageServerSideProps<BasePageProps>(
    async (context, { newsroomContextProps }) => ({
        isTrackingEnabled: isTrackingEnabled(context),
        translations: await importMessages(newsroomContextProps.localeCode),
    }),
);

export default GalleriesPage;
