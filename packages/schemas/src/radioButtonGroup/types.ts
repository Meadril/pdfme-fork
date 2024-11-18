import type { TextSchema } from '../text/types';

export interface RadioButtonGroupSchema extends TextSchema {
  text: string;
  variables: string[];
  label: string;
  numButtons: number;
  options: string[];
  group: string;
}


export type ALIGNMENT = 'left' | 'center' | 'right';
export type VERTICAL_ALIGNMENT = 'top' | 'middle' | 'bottom';
export type DYNAMIC_FONT_SIZE_FIT = 'horizontal' | 'vertical';