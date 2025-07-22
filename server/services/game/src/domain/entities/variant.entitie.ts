export const variants = [
    'bullet(1+0)',
    'bullet(1+2)',
    'blitz(3+0)',
    'blitz(3+2)',
    'rapid(10+0)',
    'rapid(10+5)',
    'classic(60+30)',
    'classic(90+30)'
] as const;

export type VariantType = typeof variants[number];

export interface IVariantSchema {
    varientName: VariantType;
    timeBase: number;
    timeInc: number;
}