import { Newsroom } from '@prezly/sdk/dist/types';
import Boilerplate from './Boilerplate';
import SocialLinks from './SocialLinks';
import SubscriptionForm from './SubscriptionForm';

type Props = {
    newsroom: Newsroom;
};

const Sidebar = ({ newsroom }: Props) => (
    <div className="lg:w-80 lg:flex-shrink-0 lg:ml-16">
        <SubscriptionForm newsroom={newsroom} />
        <Boilerplate newsroom={newsroom} />
        <SocialLinks newsroom={newsroom} />
    </div>
);

export default Sidebar;
