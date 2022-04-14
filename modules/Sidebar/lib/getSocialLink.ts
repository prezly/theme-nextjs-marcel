import type { NewsroomCompanyInformation } from '@prezly/sdk';

import type { SocialNetwork } from './types';

export default function getSocialLink(
    socialNetwork: SocialNetwork,
    companyInformation: NewsroomCompanyInformation,
) {
    const link = companyInformation[socialNetwork];
    if (!link || link.startsWith('http') || link.startsWith('www')) {
        return link;
    }

    switch (socialNetwork) {
        case 'facebook':
            return `https://facebook.com/${link}`;
        case 'twitter':
            return `https://twitter.com/${link}`;
        case 'instagram':
            return `https://instagram.com/${link}/`;
        case 'linkedin':
            return `https://linkedin.com/in/${link}`;
        case 'pinterest':
            return `https://pinterest.com/${link}`;
        case 'youtube':
            return `https://youtube.com/${link}`;
        default:
            return null;
    }
}
