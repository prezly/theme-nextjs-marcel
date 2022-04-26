import type { Newsroom } from '@prezly/sdk';
import { getNewsroomFaviconUrl } from '@prezly/theme-kit-nextjs';
import Head from 'next/head';

interface Props {
    newsroom: Newsroom;
}

// TODO: Figure out if we can load the stylesheets in `_document` to make Next happy
function Branding({ newsroom }: Props) {
    const faviconUrl = getNewsroomFaviconUrl(newsroom, 180);

    return (
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            {faviconUrl && (
                <>
                    <link rel="shortcut icon" href={faviconUrl} />
                    <link rel="apple-touch-icon" href={faviconUrl} />
                    <meta name="msapplication-TileImage" content={faviconUrl} />
                </>
            )}
        </Head>
    );
}
export default Branding;
