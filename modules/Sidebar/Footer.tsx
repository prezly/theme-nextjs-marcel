import { CookieConsentLink } from '@prezly/analytics-nextjs';
import { useNewsroom } from '@prezly/theme-kit-nextjs';

import { LogoPrezly } from '@/icons';

import { DataRequestLink } from './DataRequestLink';

function Footer() {
    const newsroom = useNewsroom();

    return (
        <div className="mt-12">
            <div className="flex items-center">
                <DataRequestLink className="mr-4 underline font-normal" />
                <CookieConsentLink className="underline font-normal" />
            </div>
            {!newsroom.is_white_labeled && (
                <p className="mt-8 flex items-center">
                    <span className="mr-2">Powered by</span>{' '}
                    <a
                        href="https://prezly.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-lighter"
                    >
                        <LogoPrezly width={77} />
                    </a>
                </p>
            )}
        </div>
    );
}

export default Footer;
