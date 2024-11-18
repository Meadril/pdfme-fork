import type { TextSchema } from '../text/types';

export interface MeasureCompSchema extends TextSchema {
  text: string;
  variables: string[];
  data: object;
}
