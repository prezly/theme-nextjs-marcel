import { CookieConsentLink } from '@prezly/analytics-nextjs';

import Icon from '@/components/Icon';

import { DataRequestLink } from './DataRequestLink';

function Footer() {
    return (
        <div className="mt-12">
            <div className="flex items-center">
                <DataRequestLink className="mr-4 underline font-normal" />
                <CookieConsentLink className="underline font-normal" />
            </div>
            <p className="mt-2 flex items-center">
                <span className="mr-2">Powered by</span>{' '}
                <a href="https://prezly.com" target="_blank" rel="noopener noreferrer">
                    <Icon name="prezly-logo" className="text-primary w-16 h-16" />
                </a>
            </p>
        </div>
    );
}

export default Footer;
