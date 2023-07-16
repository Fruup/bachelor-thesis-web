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
import { rehypeSvelte } from './plugin'
import type { Root as MdastRoot } from 'mdast'
import { VFile } from 'vfile'
import { visit } from 'unist-util-visit'
import type { Node } from 'mdast-util-toc/lib'
import { generateBibliography, type Bibliography } from '../bibliography'

const remarkToc = () => {
  return (tree: MdastRoot, file: VFile) => {
    visit(tree, (node: Node) => {
      if (node.type !== 'heading') return

      file.data.headings = [
        ...((file.data.headings as Heading[]) ?? []),
        { depth: node.depth, title: node.children[0].value },
      ]
    })
  }
}

const processor = unified()
  .use(remarkParse)
  .use(remarkToc)
  .use(remarkDirective)
  .use(remarkMath)
  .use(remarkRehype, {
    allowDangerousHtml: true,
  })
  .use(rehypeSvelte)
  .use(rehypeRaw)
  .use(rehypeSlug)
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

  const result = await processor.process(file)
  const html = String(result.value)

  return {
    html: String(html),
    css: (result.data.css as string) ?? '',
    headings: result.data.headings as Heading[],
    bibliography,
  }
}
