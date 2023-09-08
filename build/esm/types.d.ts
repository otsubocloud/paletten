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
    variant?: PalettenVariant | undefined;
    extend?: readonly number[] | undefined;
    format?: 'hex' | 'hsl' | 'rgb' | undefined;
    prefix?: string | undefined;
    reversed?: boolean | undefined;
};
export type PalettenFunc = <Variant extends PalettenVariant | undefined = PalettenVariant, Extend extends readonly number[] | undefined = undefined, Prefix extends string | undefined = undefined, Reversed extends boolean | undefined = undefined>(value: string | {
    [p in number | string]: string;
}, options?: {
    variant?: Variant;
    extend?: Extend;
    format?: 'hex' | 'hsl' | 'rgb';
    prefix?: Prefix;
    reversed?: Reversed;
}) => PalettenData<Variant, Extend, Prefix>;
export type PalettenData<Variant extends PalettenVariant | unknown = PalettenVariant, Extend extends readonly number[] | unknown = [], Prefix extends string | unknown = unknown> = Prefix extends string ? PalettenDataWithPrefix<Variant, Extend, Prefix> : PalettenDataNonePrefix<Variant, Extend>;
type PalettenDataWithPrefix<Variant extends PalettenVariant | unknown = PalettenVariant, Extend extends readonly number[] | unknown = [], Prefix extends string = string> = {
    [key in `${Prefix}${PalettenDataVariantKey<Variant, Extend>}`]: string;
};
type PalettenDataNonePrefix<Variant extends PalettenVariant | unknown = PalettenVariant, Extend extends readonly number[] | unknown = []> = {
    [key in `${PalettenDataVariantKey<Variant, Extend>}`]: string;
};
type PalettenDataVariantKey<Variant extends PalettenVariant | unknown, Extend extends readonly number[] | unknown> = Extend extends readonly number[] ? Variant extends 'coarse' ? (typeof VARIANT_COARSE_KEYS)[number] | Extend[number] : Variant extends 'fine' ? (typeof VARIANT_FINE_KEYS)[number] | Extend[number] : (typeof VARIANT_STANDARD_KEYS)[number] | Extend[number] : Variant extends 'coarse' ? (typeof VARIANT_COARSE_KEYS)[number] : Variant extends 'fine' ? (typeof VARIANT_FINE_KEYS)[number] : (typeof VARIANT_STANDARD_KEYS)[number];
export {};
