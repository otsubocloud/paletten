import { VARIANT_COARSE_KEYS, VARIANT_FINE_KEYS, VARIANT_STANDARD_KEYS } from './const';
export type HslObj = {
    h: number;
    s: number;
    l: number;
};
export type PalettenVariant = 'fine' | 'standard' | 'coarse';
export type CalcData = {
    overKey: number;
    underKey: number;
    hUnit?: number;
    sUnit?: number;
    lUnit?: number;
    count?: number;
    baseHsl?: HslObj;
};
export type Options = {
    variant?: PalettenVariant;
    extend?: number[];
    format?: 'hex' | 'hsl' | 'rgb';
    prefix?: string;
    reversed?: boolean;
};
export type PalettenFunc = <T>(value: string | {
    [p in number | string]: string;
}, options?: Options) => T extends PalettenDataWithPrefix ? T : T extends PalettenDataBasic ? T : {
    [p: string]: string;
};
/** palette type */
export type PalettenData<Variant extends PalettenVariant | unknown = PalettenVariant, Extend extends number[] | unknown = [], Prefix extends string | unknown = unknown> = Prefix extends string ? PalettenDataWithPrefix<Variant, Extend, Prefix> : PalettenDataBasic<Variant, Extend>;
type PalettenDataWithPrefix<Variant extends PalettenVariant | unknown = PalettenVariant, Extend extends number[] | unknown = [], Prefix extends string = string> = {
    [key in `${Prefix}${PalettenDataVariantKey<Variant>}`]: string;
} & ExtendPalettenDataWithPrefix<Extend, Prefix>;
type PalettenDataBasic<Variant extends PalettenVariant | unknown = PalettenVariant, Extend extends number[] | unknown = []> = {
    [key in PalettenDataVariantKey<Variant>]: string;
} & ExtendPalettenData<Extend>;
/** extend */
type ExtendPalettenDataWithPrefix<Extend extends number[] | unknown = [], Prefix extends string = string> = Extend extends number[] ? ExtendObjectWithPrefix<Extend, Prefix> : {};
type ExtendPalettenData<Extend extends number[] | unknown> = Extend extends number[] ? ExtendObject<Extend> : {};
/** extend object */
type ExtendObjectWithPrefix<Extend extends number[], Prefix extends string> = {
    [key in `${Prefix}${Extend[number]}`]: string;
};
type ExtendObject<Extend extends number[]> = {
    [key in Extend[number]]: string;
};
type PalettenDataVariantKey<Variant extends PalettenVariant | unknown> = Variant extends 'coarse' ? (typeof VARIANT_COARSE_KEYS)[number] : Variant extends 'fine' ? (typeof VARIANT_FINE_KEYS)[number] : (typeof VARIANT_STANDARD_KEYS)[number];
export {};
