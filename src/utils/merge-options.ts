const isObject = (obj: unknown) => obj && typeof obj === 'object';

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 *
 * @param  objects - Objects to merge
 * @returns  New object with merged key/values
 */
export function mergeOptions<
  Defaults extends Record<string, any>,
  Options extends Record<string, any>
>(defaults: Defaults, options?: Options): Defaults & Options {
  return [defaults, options].reduce<Record<string, any>>((prev, obj) => {
    if (obj === undefined) {
      return prev;
    }

    const result: Record<string, any> = { ...prev };
    Object.keys(obj).map((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        result[key] = [...pVal, ...oVal];
      } else if (isObject(pVal) && isObject(oVal)) {
        result[key] = mergeOptions(pVal, oVal);
      } else {
        result[key] = oVal;
      }
      return result;
    });

    return result;
  }, {}) as Defaults & Options;
}
