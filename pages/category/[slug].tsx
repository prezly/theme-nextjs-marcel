import type { Category } from '@prezly/sdk/dist/types';
import type { CategoryPageProps } from '@prezly/theme-kit-nextjs';
import { getCategoryPageServerSideProps, useCurrentCategory } from '@prezly/theme-kit-nextjs';
import type { FunctionComponent } from 'react';

import Layout from '@/modules/Layout';
import { InfiniteStories } from '@/modules/Stories';
import { importMessages, isTrackingEnabled } from '@/utils';
import type { BasePageProps } from 'types';

type Props = BasePageProps & CategoryPageProps;

const CategoryPage: FunctionComponent<Props> = ({ stories, pagination }) => {
    const category = useCurrentCategory() as Category;

    return (
        <Layout title={category.display_name} description={category.display_description as string}>
            <div className="mb-12">
                <h1 className="text-gray-100 font-bold text-4xl mb-2">{category.display_name}</h1>
                {category.display_description && (
                    <p className="font-normal text-lg text-gray-200">
                        {category.display_description}
                    </p>
                )}
                <hr className="w-[100px] mt-10 border-0 border-t-2 border-gray-600" />
            </div>
            <InfiniteStories initialStories={stories} pagination={pagination} category={category} />
        </Layout>
    );
};

export const getServerSideProps = getCategoryPageServerSideProps<BasePageProps>(
    async (context, { newsroomContextProps }) => ({
        isTrackingEnabled: isTrackingEnabled(context),
        translations: await importMessages(newsroomContextProps.localeCode),
    }),
);

export default CategoryPage;
