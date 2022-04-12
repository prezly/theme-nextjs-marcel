import { NextSeo } from 'next-seo';

type Props = {
    title: string;
    description: string;
    url: string;
    imageUrl: string;
};

function PageSeo({ title, description, url, imageUrl }: Props) {
    return (
        <NextSeo
            title={title}
            description={description}
            canonical={url}
            openGraph={{
                url,
                title,
                description,
                images: [
                    {
                        url: imageUrl,
                        alt: title,
                    },
                ],
                site_name: title,
            }}
        />
    );
}

export default PageSeo;
