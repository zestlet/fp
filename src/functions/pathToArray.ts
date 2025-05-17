const regex = /\.?([^\.\[\]]+)|\[(\d+)\]/g;

function pathToArrayImpl(path: string): PropertyKey[] {
  if (!path) return [];

  // 匹配点号分隔的属性名、数组索引和数字属性
  const result: PropertyKey[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(path)) !== null) {
    // 如果是数组索引 [0]，使用 match[2]
    // 如果是普通属性名，使用 match[1]
    const value = match[2] ? Number(match[2]) : match[1];
    if (value !== undefined) {
      result.push(value);
    }
  }

  return result;
}

/**
 * Converts a path string to an array of property keys
 * Supports dot notation, array indices, and numeric properties
 *
 * @category Object
 * @param path - The path string to convert (e.g. 'a.b[0].1.c')
 * @returns Returns an array of property keys
 * @example
 * pathToArray('a.b.c'); // ['a', 'b', 'c']
 * pathToArray('user.profile[0].name'); // ['user', 'profile', 0, 'name']
 * pathToArray('a.1.b[2]'); // ['a', '1', 'b', 2]
 * pathToArray(''); // []
 */
export const pathToArray = pathToArrayImpl;
