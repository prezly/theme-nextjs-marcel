import { Story, ExtraStoryFields } from '@prezly/sdk';

export type StoryWithContent = Story & Pick<ExtraStoryFields, 'content'>;
