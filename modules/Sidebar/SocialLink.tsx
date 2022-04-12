import type { NewsroomCompanyInformation } from '@prezly/sdk';
import type { PropsWithChildren } from 'react';

import Icon from '@/components/Icon';

import getSocialLink from './lib/getSocialLink';
import type { SocialNetwork } from './lib/types';

type Props = {
    socialNetwork: SocialNetwork;
    companyInformation: NewsroomCompanyInformation;
};

function SocialLink({ socialNetwork, companyInformation }: PropsWithChildren<Props>) {
    const socialLink = getSocialLink(socialNetwork, companyInformation);

    if (!socialLink) {
        return null;
    }

    return (
        <a
            className="mr-6 text-gray-300 hover:text-blue-400 active:text-blue-500"
            href={socialLink}
            target="_blank"
            rel="noreferrer"
        >
            <Icon name={`social-${socialNetwork}`} />
        </a>
    );
}

export default SocialLink;
