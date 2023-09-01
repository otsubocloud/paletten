import { CalcData, HslObj } from '../types.js';
export default function generateCalcData(data: {
    [p in number | string]: HslObj;
}): CalcData[];
