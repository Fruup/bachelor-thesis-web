import type { Plugin } from 'unified'
import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'

/**
 * Shifts headings:
 * h1 -> h2
 * h2 -> h3
 * ...
 * h6 -> h6
 */
export const remarkShiftHeadings: Plugin<[], Root, Root> = function () {
  return (tree, file) => {
    visit(tree, 'heading', (node) => {
      node.depth = Math.min(node.depth + 1, 6) as typeof node.depth
    })
  }
}
