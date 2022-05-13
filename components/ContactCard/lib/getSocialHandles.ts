import type { ContactNode } from '@prezly/story-content-format';

function extractHandle(url: string) {
    if (url.indexOf('//') > -1) {
        return url.split('/')[3];
    }

    return url.split('/')[1];
}

export default function getSocialHandles(contact: ContactNode.ContactInfo) {
    let { twitter } = contact;
    if (twitter && twitter.startsWith('http')) {
        twitter = extractHandle(twitter);
    }

    let { facebook } = contact;
    if (facebook && facebook.startsWith('http')) {
        facebook = extractHandle(facebook);
    }

    return {
        twitter,
        facebook,
    };
}
