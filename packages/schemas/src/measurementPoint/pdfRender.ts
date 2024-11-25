import { PDFRenderProps } from '@pdfme/common';
import { MeasurementPointSchema } from './types';
import { createCanvas } from 'canvas';
import {degrees, rgb} from '@pdfme/pdf-lib';
import {convertForPdfLayoutProps} from "../utils";

export const pdfRender = async (arg: PDFRenderProps<MeasurementPointSchema>) => {
    const { schema, pdfDoc, page } = arg;
    const pageHeight = page.getHeight();
    const {
        width,
        height,
        rotate,
        position: { x, y },
        opacity,
    } = convertForPdfLayoutProps({ schema, pageHeight });

    const pngUrl = 'https://pdf-lib.js.org/assets/minions_banana_alpha.png'
    const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
    const pngImage = await pdfDoc.embedPng(pngImageBytes)

    page.drawImage(pngImage, {
        x: x,
        y: y,
        width: width,
        height: height,
        rotate: rotate,
        opacity: opacity,
    })
};
