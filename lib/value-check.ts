export const isNullOrUndefined = (object: any): boolean =>
  object === null || object === undefined

export const isFalsey = (object: any): boolean =>
  object === null || object === undefined || object === false

export const allIsNullOrUndefined = (things: any[]) =>
  things.every((thing) => isNullOrUndefined(thing))
