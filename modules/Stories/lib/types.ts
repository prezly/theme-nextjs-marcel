import { Story } from '@prezly/sdk/dist/types';
import { ExtraStoryFields } from '@prezly/sdk/dist/types/Story';

export type StoryWithContent = Story & Pick<ExtraStoryFields, 'content'>;
