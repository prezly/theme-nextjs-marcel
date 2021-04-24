import { NewsroomCompanyInformation } from '@prezly/sdk/dist/types';

export default function hasSocialLinks(companyInformation: NewsroomCompanyInformation) {
    return Boolean(
        companyInformation.twitter
        || companyInformation.facebook
        || companyInformation.linkedin
        || companyInformation.pinterest
        || companyInformation.youtube
        || companyInformation.instagram,
    );
}
