import type { ContactNode } from '@prezly/story-content-format';

interface Props {
    contact: ContactNode.ContactInfo;
    showAvatar: boolean;
}

export function AvatarWithName({ contact, showAvatar }: Props) {
    const { avatar_url, company, description, name } = contact;
    const subtitle = description && company ? `${description}, ${company}` : description ?? company;

    return (
        <div className="flex items-center">
            {avatar_url && showAvatar && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    className="block w-14 h-14 rounded mb-6 lg:mb-0 mr-4"
                    src={avatar_url}
                    alt={name}
                />
            )}
            <div>
                <h4 className="text-lg text-neutral-200 font-semibold">{name}</h4>
                {subtitle && <h5 className="text-neutral-400">{subtitle}</h5>}
            </div>
        </div>
    );
}
