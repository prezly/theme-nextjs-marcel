import type { NewsroomGallery } from '@prezly/sdk';
import { getGalleryThumbnail } from '@prezly/theme-kit-core';
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
    const galleryThumbnail = getGalleryThumbnail(gallery);

    return (
        <Link
            href={`/media/album/${gallery.uuid}`}
            locale={getLinkLocaleSlug()}
            className={classNames(styles.container, 'group')}
        >
            {galleryThumbnail && (
                <Image
                    alt={gallery.name}
                    imageDetails={galleryThumbnail}
                    lazy
                    layout="fill"
                    objectFit="cover"
                    className={styles.image}
                />
            )}
            <span className={classNames(styles.title, 'group-hover:underline')}>
                {gallery.name}
            </span>
        </Link>
    );
}

export default GalleryItem;
