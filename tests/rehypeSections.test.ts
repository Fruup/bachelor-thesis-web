import { rehypeSections } from '$lib/plugins/rehypeSections'
import { test } from 'vitest'
import rehypeRaw from 'rehype-raw'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import rehypeStringify from 'rehype-stringify'
import src from './test.md?raw'
import rehypeSlug from 'rehype-slug'

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, {
    allowDangerousHtml: true,
  })
  .use(rehypeRaw)
  .use(rehypeSlug)
  // .use(rehypeAutolink)
  .use(rehypeSections)
  .use(rehypeStringify, { allowDangerousHtml: true })

test('test', () => {
  const result = processor.processSync(src)
  const html = result.value as string

  console.log(html.replaceAll('>', '>\n'))
})
