import { CookieConsentLink } from '@prezly/analytics-nextjs';
import { useNewsroom } from '@prezly/theme-kit-nextjs';

import { MadeWithPrezly } from '@/components/MadeWithPrezly';

import { DataRequestLink } from './DataRequestLink';

function Footer() {
    const newsroom = useNewsroom();

    return (
        <div className="mt-12">
            <div className="flex items-center">
                <DataRequestLink className="mr-4 underline font-normal" />
                <CookieConsentLink className="underline font-normal" />
            </div>
            {!newsroom.is_white_labeled && <MadeWithPrezly />}
        </div>
    );
}

export default Footer;
