import type { TextSchema } from '../text/types';

export interface CheckBoxSchema extends TextSchema {
  text: string;
  variables: string[];
  label: string;
  numButtons: number;
}
