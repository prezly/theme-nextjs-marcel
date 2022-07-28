import type { NewsroomGallery } from '@prezly/sdk';
import { useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import Image from '@prezly/uploadcare-image';
import classNames from 'classnames';
import Link from 'next/link';

import styles from './GalleryItem.module.css';

interface Props {
    gallery: NewsroomGallery;
}

function GalleryItem({ gallery }: Props) {
    const getLinkLocaleSlug = useGetLinkLocaleSlug();

    return (
        <Link
            href={`/media/album/${gallery.uuid}`}
            locale={getLinkLocaleSlug()}
            passHref
            className={classNames(styles.container, 'group')}
        >
            <Image
                alt={gallery.title}
                imageDetails={gallery.images[0].uploadcare_image}
                lazy
                layout="fill"
                objectFit="cover"
                className={styles.image}
            />
            <span className={classNames(styles.title, 'group-hover:underline')}>
                {gallery.title}
            </span>
        </Link>
    );
}

export default GalleryItem;
