import { Newsroom } from '@prezly/sdk/dist/types';
import Icon from '@/components/Icon';

type Props = {
    newsroom: Newsroom;
};

const SocialLinks = ({ newsroom }: Props) => (
    <div className="flex items-center">
        <a className="mr-6 text-gray-400" href="https://discord.com/">
            <Icon name="social-discord" />
        </a>
        <a className="mr-6 text-gray-400" href="https://discord.com/">
            <Icon name="social-instagram" />
        </a>
        <a className="mr-6 text-gray-400" href="https://discord.com/">
            <Icon name="social-twitch" />
        </a>
        <a className="mr-6 text-gray-400" href="https://discord.com/">
            <Icon name="social-twitter" />
        </a>
    </div>
);

export default SocialLinks;
