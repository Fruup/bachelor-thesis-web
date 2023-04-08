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
import type { VFile } from 'vfile'
import { visit } from 'unist-util-visit'
import type { Node } from 'mdast-util-toc/lib'

const remarkToc = () => {
  return (tree: MdastRoot, file: VFile) => {
    visit(tree, (node: Node) => {
      if (node.type !== 'heading') return

      file.data.headings = [
        ...(file.data.headings ?? []),
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

interface ProcessResult {
  html: string
  css: string
  headings: { depth: number; title: string }[]
}

export const process = async (source: string): Promise<ProcessResult> => {
  const result = await processor.process(source)
  const html = String(result.value)

  return {
    html: String(html),
    css: (result.data.css as string) ?? '',
    headings: result.data.headings,
  }
}
