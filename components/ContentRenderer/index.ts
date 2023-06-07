import dynamic from 'next/dynamic';

const ContentRenderer = dynamic(() => import('./ContentRenderer'), { ssr: true });

export default ContentRenderer;
