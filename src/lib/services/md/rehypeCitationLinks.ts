import type { Plugin } from 'unified'
import type { Root } from 'hast'
import { SKIP, visit } from 'unist-util-visit'

/**
 * Allows citation links prefixed with `cite:`.
 * Also adds `target="_blank"` for absolute links.
 */
export const rehypeCitationLinks: Plugin<[], Root> = function () {
  return (tree, file) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return

      const { href } = node.properties
      if (typeof href !== 'string') return

      const isCitation = href.startsWith('cite:')
      const isAbsolute = href.toLowerCase().startsWith('http')

      if (isCitation) {
        node.properties.href = '#' + href.slice('cite:'.length)
        node.properties['data-is-citation'] = true
      }

      if (isAbsolute) {
        node.properties.target = '_blank'
      }

      return SKIP
    })
  }
}
