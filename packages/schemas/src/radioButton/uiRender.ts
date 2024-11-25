import { UIRenderProps } from '@pdfme/common';
import { RadioButtonSchema } from './types';
import { isEditable, addAlphaToHex, createErrorElm } from '../utils.js';
import { XMLValidator } from "fast-xml-parser";

const isValidSVG = (svgString: string) => XMLValidator.validate(svgString) === true;

const getUncheckedIcon = (color: string, buttons: []) => {
  let circles = "";
  const spacing = 24;
  for (let i = 0; i < buttons.length; i++) {
    const cx = spacing * i + 12;
    const cy = 12;
    const r = 9;
    circles += `<circle cx="${cx}" cy="${cy}" r="${r}" stroke-width="1" fill="none"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${spacing * buttons.length} 24" fill="none" stroke="${color}" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle" style="display: block; margin: auto; max-width: 210mm; max-height: 297mm;">${circles}</svg>`;
}

const getIcon = ({ color, buttons }: { color: string, buttons: [] }): string => {
  if (!buttons) return '';
  return getUncheckedIcon(color, buttons);
}

export const uiRender = (arg: UIRenderProps<RadioButtonSchema>) => {
  const { rootElement, mode, onChange, theme, schema } = arg;
  const value: string = getIcon({ color: 'black', buttons: schema.appRender.buttons });

  const container = document.createElement(isEditable(mode, schema) ? 'textarea' : 'div');
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.boxSizing = 'border-box';
  if (isEditable(mode, schema)) {
    const textarea = container as HTMLTextAreaElement;
    textarea.value = value;
    textarea.style.position = 'absolute';
    textarea.style.backgroundColor = addAlphaToHex(theme.colorPrimaryBg, 30);

    if (isValidSVG(value)) {
      const svgElement = new DOMParser().parseFromString(value, 'image/svg+xml').documentElement;
      if (svgElement instanceof SVGElement) {
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', '100%');
        svgElement.style.position = 'absolute';
        rootElement.appendChild(svgElement);
      }
    } else if (value && value !== '') {
      const errorElm = createErrorElm();
      errorElm.style.position = 'absolute';
      rootElement.appendChild(errorElm);
    }

    textarea.addEventListener('change', (e: Event) => {
      const newValue = (e.target as HTMLTextAreaElement).value;
      onChange && onChange({ key: 'content', value: newValue });
    });
    rootElement.appendChild(container);
    textarea.setSelectionRange(value.length, value.length);
    textarea.focus();
  } else {
    if (!value) return;
    if (!isValidSVG(value)) {
      rootElement.appendChild(createErrorElm());
      return;
    }
    container.innerHTML = value;
    const svgElement = container.childNodes[0];
    if (svgElement instanceof SVGElement) {
      svgElement.setAttribute('width', '100%');
      svgElement.setAttribute('height', '100%');
      svgElement.style.position = 'absolute';
      rootElement.appendChild(svgElement);
    }
  }
};