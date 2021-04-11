import { NewsroomCompanyInformation } from '@prezly/sdk/dist/types';
import Boilerplate from './Boilerplate';
import SocialLinks from './SocialLinks';
import SubscriptionForm from './SubscriptionForm';

type Props = {
    companyInformation?: NewsroomCompanyInformation;
};

const Sidebar = ({ companyInformation }: Props) => (
    <div className="mb-72 lg:mb-0 lg:w-80 lg:flex-shrink-0 lg:ml-16">
        {companyInformation && (
            <>
                <SubscriptionForm companyInformation={companyInformation} />
                <Boilerplate companyInformation={companyInformation} />
                <SocialLinks companyInformation={companyInformation} />
            </>
        )}
    </div>
);

export default Sidebar;
