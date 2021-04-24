import { useCompanyInformation } from '@/hooks/useCompanyInformation';
import Boilerplate from './Boilerplate';
import SocialLinks from './SocialLinks';
import SubscriptionForm from './SubscriptionForm';

const Sidebar = () => {
    const companyInformation = useCompanyInformation();

    return (
        <div className="mb-16 lg:mb-0 lg:w-80 lg:flex-shrink-0 lg:ml-16">
            {companyInformation && (
                <>
                    <SubscriptionForm companyInformation={companyInformation} />
                    <Boilerplate companyInformation={companyInformation} />
                    <SocialLinks companyInformation={companyInformation} />
                </>
            )}
        </div>
    );
};

export default Sidebar;
