import { NewsroomCompanyInformation } from '@prezly/sdk';

import hasSocialLinks from './lib/hasSocialLinks';
import SocialLink from './SocialLink';

type Props = {
    companyInformation: NewsroomCompanyInformation;
};

const SocialLinks = ({ companyInformation }: Props) => {
    if (!hasSocialLinks(companyInformation)) {
        return null;
    }

    return (
        <div className="flex items-center">
            <SocialLink socialNetwork="twitter" companyInformation={companyInformation} />
            <SocialLink socialNetwork="facebook" companyInformation={companyInformation} />
            <SocialLink socialNetwork="linkedin" companyInformation={companyInformation} />
            <SocialLink socialNetwork="pinterest" companyInformation={companyInformation} />
            <SocialLink socialNetwork="youtube" companyInformation={companyInformation} />
            <SocialLink socialNetwork="instagram" companyInformation={companyInformation} />
        </div>
    );
};

export default SocialLinks;
