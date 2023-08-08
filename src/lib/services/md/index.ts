import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkDirective from 'remark-directive'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolink from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import { rehypeSvelte } from './rehypeSvelte'
// import { rehypeSections } from './rehypeSections'
import type { Link, Root as MdastRoot } from 'mdast'
import { VFile } from 'vfile'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import { generateBibliography, type Bibliography } from '../bibliography'
import { remarkShiftHeadings } from './remarkShiftHeadings'
import { toHast } from 'mdast-util-to-hast'
import type { ElementContent, Nodes } from 'hast'
import { rehypeCitationLinks } from './rehypeCitationLinks'

declare module 'vfile' {
  interface DataMap {
    headings: { depth: number; title: string }[]
  }
}

const remarkToc = () => {
  return (tree: MdastRoot, file: VFile) => {
    visit(tree, 'heading', (node) => {
      file.data.headings = [
        ...(file.data.headings ?? []),
        { depth: node.depth, title: toString(node) },
      ]
    })
  }
}

const processor = unified()
  .use(remarkParse)
  .use(remarkToc)
  .use(remarkShiftHeadings)
  .use(remarkDirective)
  .use(remarkMath)
  .use(remarkRehype, {
    allowDangerousHtml: true,
  })
  .use(rehypeSvelte)
  .use(rehypeRaw)
  .use(rehypeCitationLinks)
  .use(rehypeSlug)
  // .use(rehypeSections)
  .use(rehypeAutolink)
  .use(rehypeKatex)
  .use(rehypeHighlight)
  .use(rehypeStringify, { allowDangerousHtml: true })

interface Heading {
  depth: number
  title: string
}

interface ProcessInput {
  source: string
  bibliography: string
}

interface ProcessOutput {
  html: string
  css: string
  headings: Heading[]
  bibliography: Bibliography
}

export const process = async (input: ProcessInput): Promise<ProcessOutput> => {
  const file = new VFile(input.source)

  const bibliography = generateBibliography(input.bibliography)
  file.data.bibliography = bibliography

  const result = await processor.process(file as any)
  const html = String(result.value)

  return {
    html: String(html),
    css: (result.data.css as string) ?? '',
    headings: result.data.headings as Heading[],
    bibliography,
  }
}
