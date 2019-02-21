export type IAny = any
export type IFormatterOpts = {
  [key: string]: IAny
}
export type IFormatted = string

export type IFormatter = (value: IAny, opts?: IFormatterOpts) => IFormatted
export type IValidator = (value: IAny, opts?: IFormatterOpts) => boolean;
