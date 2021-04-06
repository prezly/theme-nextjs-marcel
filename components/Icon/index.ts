import dynamic from 'next/dynamic';

export default dynamic(() => import('./Icon'), { ssr: true });
