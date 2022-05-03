import type { NewsroomGallery } from '@prezly/sdk';

import GalleryItem from './GalleryItem';

interface Props {
    galleries: NewsroomGallery[];
}

function GalleriesList({ galleries }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12">
            {galleries.map((gallery) => (
                <GalleryItem gallery={gallery} key={gallery.uuid} />
            ))}
        </div>
    );
}

export default GalleriesList;
