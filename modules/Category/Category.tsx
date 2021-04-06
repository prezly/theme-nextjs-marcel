import getCategoryUrl from '@/utils/prezly/getCategoryUrl';
import { Category } from '@prezly/sdk/dist/types';
import Link from 'next/link';

type Props = {
    category: Category;
};

const CategoryComponent = ({ category }: Props) => (
    <Link href={getCategoryUrl(category)}>
        <a className="px-2 py-1 leading-6 tracking-wide">{category.display_name}</a>
    </Link>
);

export default CategoryComponent;
