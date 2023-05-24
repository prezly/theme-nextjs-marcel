import type { ContactNode } from '@prezly/story-content-format';

import { IconEmail, IconFacebook, IconGlobe, IconMobile, IconPhone, IconTwitter } from '@/icons';

import { AvatarWithName } from './AvatarWithName';
import getSocialHandles from './lib/getSocialHandles';
import { getUrl } from './lib/getUrl';

interface Props {
    node: ContactNode;
}

export function ContactCard({ node }: Props) {
    const { contact, show_avatar } = node;
    const { email, phone, mobile } = contact;
    const website = getUrl(contact.website);
    const { twitter, facebook } = getSocialHandles(contact);

    return (
        <div className="text-neutral-300 my-10 rounded-xl p-6 border-[1px] border-neutral-600">
            <AvatarWithName contact={contact} showAvatar={show_avatar} />
            <div className="mt-4 gap-x-4 gap-y-3 flex flex-col sm:flex-wrap sm:flex-row overflow-hidden">
                {email && (
                    <a href={`mailto:${email}`} className="default-link flex items-center">
                        <IconEmail className="shrink-0 mr-2" width={16} height={16} />
                        <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                            {email}
                        </span>
                    </a>
                )}
                {phone && (
                    <a
                        href={`tel:${phone}`}
                        className="default-link flex items-center text-ellipsis overflow-hidden"
                    >
                        <IconPhone className="shrink-0 mr-2" width={16} height={16} />
                        <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                            {phone}
                        </span>
                    </a>
                )}
                {mobile && (
                    <a
                        href={`tel:${mobile}`}
                        className="default-link flex items-center text-ellipsis overflow-hidden"
                    >
                        <IconMobile className="shrink-0 mr-2" width={16} height={16} />
                        <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                            {mobile}
                        </span>
                    </a>
                )}
                {website && (
                    <a
                        href={`${website}`}
                        className="default-link flex items-center overflow-hidden"
                    >
                        <IconGlobe className="shrink-0 mr-2" width={16} height={16} />
                        <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                            {website.hostname}
                        </span>
                    </a>
                )}
                {facebook && (
                    <a
                        href={`https://facebook.com/${twitter}`}
                        className="default-link flex items-center"
                    >
                        <IconFacebook className="shrink-0 mr-2" width={16} height={16} />
                        {`${facebook}`}
                    </a>
                )}
                {twitter && (
                    <a
                        href={`https://twitter.com/${twitter}`}
                        className="default-link flex items-center"
                    >
                        <IconTwitter className="shrink-0 mr-2" width={16} height={16} />
                        {`@${twitter}`}
                    </a>
                )}
            </div>
        </div>
    );
}
