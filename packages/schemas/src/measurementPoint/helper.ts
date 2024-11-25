import {BarcodeTypes} from "../barcodes/types";
import {Buffer} from "buffer";
import {DEFAULT_BARCODE_INCLUDETEXT} from "../barcodes/constants";
import bwipjs, {RenderOptions} from "bwip-js";
import {b64toUint8Array} from "@pdfme/common";
import {barCodeType2Bcid, mapHexColorForBwipJsLib} from "../barcodes/helper";

export const createBarCode = async (arg: {
    type: BarcodeTypes;
    input: string;
    width: number;
    height: number;
    backgroundColor?: string;
    barColor?: string;
    textColor?: string;
    includetext?: boolean;
}): Promise<Buffer> => {
    const {
        type,
        input,
        width,
        height,
        backgroundColor,
        barColor,
        textColor,
        includetext = DEFAULT_BARCODE_INCLUDETEXT,
    } = arg;

    const bcid = barCodeType2Bcid(type);
    const scale = 5;
    const bwipjsArg: RenderOptions = { bcid, text: input, width, height, scale, includetext, textxalign: 'center' };

    if (backgroundColor) bwipjsArg.backgroundcolor = mapHexColorForBwipJsLib(backgroundColor);
    if (barColor) bwipjsArg.barcolor = mapHexColorForBwipJsLib(barColor);
    if (textColor) bwipjsArg.textcolor = mapHexColorForBwipJsLib(textColor);

    let res: Buffer;

    if (typeof window !== 'undefined') {
        const canvas = document.createElement('canvas');
        // @ts-ignore
        bwipjs.toCanvas(canvas, bwipjsArg);
        const dataUrl = canvas.toDataURL('image/png');
        res = b64toUint8Array(dataUrl).buffer as Buffer;
    } else {
        res = await bwipjs.toBuffer(bwipjsArg);
    }

    return res;
};
