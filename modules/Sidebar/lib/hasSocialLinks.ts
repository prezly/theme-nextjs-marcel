import { NewsroomCompanyInformation } from '@prezly/sdk';

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
