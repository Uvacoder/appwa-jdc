export const a = (i: any) => (Array.isArray(i) ? i[0] : i)

export const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
