import type { NewsroomGallery } from '@prezly/sdk';
import { translations } from '@prezly/theme-kit-intl';
import type { PaginationProps } from '@prezly/theme-kit-nextjs';
import { useInfiniteGalleriesLoading } from '@prezly/theme-kit-nextjs';
import { useIntl } from 'react-intl';

import { LoadMore } from '@/components';

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
        <div>
            <div className="mb-12">
                <h1 className="text-neutral-100 font-bold text-4xl mb-2">
                    {formatMessage(translations.mediaGallery.title)}
                </h1>
                <hr className="w-[100px] mt-10 border-0 border-t-2 border-neutral-600" />
            </div>

            <GalleriesList galleries={galleries} />

            <LoadMore onLoadMore={loadMoreGalleries} canLoadMore={canLoadMore} />
        </div>
    );
}

export default Galleries;
