import { NewsroomCompanyInformation } from '@prezly/sdk/dist/types';

import Icon from '@/components/Icon';
import { SocialNetwork } from './lib/types';
import getSocialLink from './lib/getSocialLink';

type Props = {
    socialNetwork: SocialNetwork;
    companyInformation: NewsroomCompanyInformation;
};

const SocialLink = ({ socialNetwork, companyInformation }: Props) => {
    const socialLink = getSocialLink(socialNetwork, companyInformation);

    if (!socialLink) {
        return null;
    }

    return (
        <a
            className="mr-6 text-gray-400 hover:text-blue-400 active:text-blue-500"
            href={socialLink}
            target="_blank"
            rel="noreferrer"
        >
            <Icon name={`social-${socialNetwork}`} />
        </a>
    );
};

export default SocialLink;
