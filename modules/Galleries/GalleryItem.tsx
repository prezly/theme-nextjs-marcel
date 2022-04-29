import type { NewsroomGallery } from '@prezly/sdk';
import { useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import Image from '@prezly/uploadcare-image';
import Link from 'next/link';

import styles from './GalleryItem.module.css';

interface Props {
    gallery: NewsroomGallery;
}

function GalleryItem({ gallery }: Props) {
    const getLinkLocaleSlug = useGetLinkLocaleSlug();

    return (
        <Link href={`/media/album/${gallery.uuid}`} locale={getLinkLocaleSlug()} passHref>
            <a className={styles.container}>
                <Image
                    alt={gallery.title}
                    imageDetails={gallery.images[0].uploadcare_image}
                    lazy
                    layout="fill"
                    objectFit="cover"
                    className={styles.image}
                />
                <span className={styles.title}>{gallery.title}</span>
            </a>
        </Link>
    );
}

export default GalleryItem;
