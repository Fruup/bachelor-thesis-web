export const trimSlashes = (s: string): string => {
  s = s.trim()

  if (s === '/') return ''

  let start = 0
  let end = s.length - 1

  while (start < s.length && s[start] === '/') start++
  while (end >= 0 && s[end] === '/') end--

  return s.substring(start, end + 1)
}

export const joinPaths = (...paths: string[]): string =>
  paths
    .map(trimSlashes)
    .filter((path) => !!path)
    .join('/')
