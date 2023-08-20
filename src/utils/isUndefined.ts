export default function isUndefined(v: any): v is null | undefined {
  return v === undefined || v === null
}
