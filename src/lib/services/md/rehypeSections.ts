import type { Plugin } from 'unified'
import type { ElementContent, Root as Root, Element, Node, Nodes, Parent } from 'hast'
import { SKIP, visit } from 'unist-util-visit'

interface Options {
  sectionTag?: 'section' | 'article'
}

type Heading = Element & { tagName: `h${1 | 2 | 3 | 4 | 5 | 6}` }

const isHeading = (node: Nodes): node is Heading =>
  node.type === 'element' && node.tagName.length === 2 && node.tagName[0] === 'h'

const getDepth = (node: Heading): number => Number(node.tagName[1])

const doStuff = (tree: Parent, sectionTag: string, forDepth: number) => {
  visit(tree, 'element', (node, index, parent) => {
    if (!isHeading(node)) return
    if (typeof index !== 'number' || !parent) return

    const depth = getDepth(node)
    if (depth !== forDepth) return

    // Determine the number of elements to be included in the section.
    let count = 1

    for (let i = index + 1; i < parent.children.length; i++) {
      const element = parent.children[i]

      // If `element` is a heading with lower or equal depth (higher or equal precedence), stop here.
      // if (isHeading(element)) break
      if (isHeading(element) && getDepth(element) <= depth) break

      count++
    }

    // Splice children and insert a new section.
    const section: Element = {
      type: 'element',
      tagName: sectionTag,
      children: [],
      // TODO
      // properties: node.properties,
      properties: {},
    }

    const children = parent.children.splice(index, count, section)
    section.children = children as ElementContent[]
  })
}

/**
 *
 */
export const rehypeSections: Plugin<[options?: Options], Root> = function (options) {
  // Set default options.
  const { sectionTag = 'section' } = options ?? {}

  return (tree, file) => {
    for (let depth = 6; depth >= 1; depth--) {
      doStuff(tree, sectionTag, depth)
    }
  }
}
