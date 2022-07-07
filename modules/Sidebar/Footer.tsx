import { CookieConsentLink } from '@prezly/analytics-nextjs';
import { LogoPrezly } from '@prezly/icons';

import { DataRequestLink } from './DataRequestLink';

function Footer() {
    return (
        <div className="mt-12">
            <div className="flex items-center">
                <DataRequestLink className="mr-4 underline font-normal" />
                <CookieConsentLink className="underline font-normal" />
            </div>
            <p className="mt-8 flex items-center">
                <span className="mr-2">Powered by</span>{' '}
                <a
                    href="https://prezly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                >
                    <LogoPrezly className="w-16" width="64px" />
                </a>
            </p>
        </div>
    );
}

export default Footer;
