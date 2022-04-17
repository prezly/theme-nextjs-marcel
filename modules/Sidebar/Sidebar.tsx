import { useCompanyInformation } from '@prezly/theme-kit-nextjs';

import Boilerplate from './Boilerplate';
import Footer from './Footer';
import SocialLinks from './SocialLinks';
import SubscriptionForm from './SubscriptionForm';

function Sidebar() {
    const companyInformation = useCompanyInformation();

    return (
        <div className="mb-16 lg:mb-0 lg:w-80 lg:flex-shrink-0 lg:ml-16">
            {companyInformation && (
                <>
                    <SubscriptionForm />
                    <Boilerplate companyInformation={companyInformation} />
                    <SocialLinks companyInformation={companyInformation} />
                    <Footer />
                </>
            )}
        </div>
    );
}

export default Sidebar;
