import type { ContactNode } from '@prezly/story-content-format';

import { IconFacebook, IconTwitter } from '@/icons';

import { AvatarWithName } from './AvatarWithName';
import getSocialHandles from './lib/getSocialHandles';
import { getUrl } from './lib/getUrl';

interface Props {
    node: ContactNode;
}

export function ContactSignature({ node }: Props) {
    const { contact, show_avatar } = node;
    const { email, phone, mobile } = contact;
    const website = getUrl(contact.website);
    const { twitter, facebook } = getSocialHandles(contact);

    return (
        <div className="text-neutral-300 my-10">
            <AvatarWithName contact={contact} showAvatar={show_avatar} />
            <div className="mt-4 flex flex-col gap-2 overflow-hidden">
                {email && (
                    <a
                        href={`mailto:${email}`}
                        className="default-link text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                        E. {email}
                    </a>
                )}
                {phone && (
                    <a
                        href={`tel:${phone}`}
                        className="default-link text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                        P. {phone}
                    </a>
                )}
                {mobile && (
                    <a
                        href={`tel:${mobile}`}
                        className="default-link text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                        M. {mobile}
                    </a>
                )}
                {website && (
                    <a
                        href={`${website}`}
                        className="default-link text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                        W. {website.hostname}
                    </a>
                )}
                <div className="flex gap-4 mt-4">
                    {facebook && (
                        <a
                            href={`https://facebook.com/${twitter}`}
                            className="default-link"
                            title="Facebook"
                        >
                            <IconFacebook className="mr-2" width={16} height={16} />
                        </a>
                    )}
                    {twitter && (
                        <a
                            href={`https://twitter.com/${twitter}`}
                            className="default-link"
                            title="X"
                        >
                            <IconTwitter className="mr-2" width={16} height={16} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
