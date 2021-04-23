import dynamic from 'next/dynamic';

export default dynamic(() => import('./Icon'), { ssr: true });
export const FileTypeIcon = dynamic(() => import('./FileTypeIcon'), { ssr: true });
