import { SKIP, visit } from 'unist-util-visit'
import { unified, type Plugin } from 'unified'
import type { Root as MdastRoot } from 'mdast'
import type { Root as HastRoot } from 'hast'
import type { Processor } from 'unified'

import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'

/**
 * Used to transform nested `text` nodes.
 * Enables math to exist inside raw HTML nodes.
 * Resolves to an `hast` root node.
 */
const nestedTextProcessor = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkRehype) as Processor<MdastRoot, HastRoot, HastRoot>

const processNestedText = (source: string): HastRoot => {
  const ast = nestedTextProcessor.parse(source)
  return nestedTextProcessor.runSync(ast)
}

/**
 * Finds `text` nodes in an `hast` and...
 * - parses their content as markdown,
 * - transforms the `mdast` to an `hast`
 * - and replaces the `text` node with the generated `hast` tree.
 */
export const rehypeMath: Plugin<[], HastRoot> = function () {
  return (tree, file) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return

      // As only `text` nodes are processed,
      // the resulting tree is always a `Root` with exactly one `paragraph` child.
      const processed = processNestedText(node.value.trim())

      // Skip empty nodes
      if (processed.children.length === 0) return

      const child = processed.children[0]

      if (processed.children.length !== 1 || child.type !== 'element' || child.tagName !== 'p') {
        throw Error('Unexpected processing result!')
      }

      // Replace this part of the tree
      parent.children = parent.children
        .slice(0, index)
        .concat(child.children)
        .concat(parent.children.slice(index + 1))

      // Skip children of this node
      return SKIP
    })
  }
}
