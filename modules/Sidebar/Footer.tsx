import { CookieConsentLink } from '@prezly/analytics-nextjs';

import { DataRequestLink } from './DataRequestLink';

function Footer() {
    return (
        <div className="mt-12">
            <div className="flex items-center">
                <DataRequestLink className="mr-4 underline font-normal" />
                <CookieConsentLink className="underline font-normal" />
            </div>
        </div>
    );
}

export default Footer;
