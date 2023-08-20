import { CalcData, HslObj } from '../types';
export default function generateCalcData(data: {
    [p in number | string]: HslObj;
}): CalcData[];
