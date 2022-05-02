import type { NewsroomGallery } from '@prezly/sdk';
import { useInfiniteGalleriesLoading } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import { useIntl } from 'react-intl';

import { LoadMore } from '@/components';
import type { PaginationProps } from 'types';

import Layout from '../Layout';

import GalleriesList from './GalleriesList';

type Props = {
    initialGalleries: NewsroomGallery[];
    pagination: PaginationProps;
};

function Galleries({ initialGalleries, pagination }: Props) {
    const { formatMessage } = useIntl();

    const { canLoadMore, galleries, loadMoreGalleries } = useInfiniteGalleriesLoading(
        initialGalleries,
        pagination,
    );

    return (
        <Layout title={formatMessage(translations.mediaGallery.title)}>
            <div className="mb-12">
                <h1 className="text-gray-100 font-bold text-4xl mb-2">
                    {formatMessage(translations.mediaGallery.title)}
                </h1>
                <hr className="w-[100px] mt-10 border-0 border-t-2 border-gray-600" />
            </div>

            <GalleriesList galleries={galleries} />

            <LoadMore onLoadMore={loadMoreGalleries} canLoadMore={canLoadMore} />
        </Layout>
    );
}

export default Galleries;
