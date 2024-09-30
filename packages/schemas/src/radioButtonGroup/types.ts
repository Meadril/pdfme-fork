import type { TextSchema } from '../text/types';

export interface RadioButtonGroupSchema extends TextSchema {
  text: string;
  variables: string[];
  label: string[];
  numButtons: number;
  options: string[];
}
