import { compile } from 'svelte/compiler'
import { SKIP, visit } from 'unist-util-visit'
import { unified, type Plugin } from 'unified'
import * as fs from 'node:fs'
// import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Root as MdastRoot } from 'mdast'
import type { RootContentMap, Root as HastRoot } from 'hast'
import type { Processor } from 'unified'
import type { SvelteSSRComponent } from './helper'
import type { Raw } from 'mdast-util-to-hast'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const parseComponents = (source: string): string[] => {
  const regex = /<([A-Z][A-Za-z]*)/g
  let m

  const result: string[] = []

  while ((m = regex.exec(source)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex++

    result.push(m[1])
  }

  return result
}

const replaceStuff = (s: string): string => {
  while (s.includes('$$')) {
    s = s.replace('$$', '<span class="math math-display">')
    s = s.replace('$$', '</span>')
  }

  while (s.includes('$')) {
    s = s.replace('$', '<span class="math math-inline">')
    s = s.replace('$', '</span>')
  }

  return s
}

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
 * Finds `raw` nodes in an `mdast` and...
 * - scans their content for component instances (starting with `<[A-Z]`),
 * - compiles the content as a Svelte component,
 * - replaces the content with the compiled HTML and
 * - collects CSS in `file.data.css` along the way.
 */
export const rehypeSvelte: Plugin<[], HastRoot> = function () {
  return async (tree, file) => {
    // Collect nodes to transform
    const nodes: RootContentMap['raw'][] = []

    visit(
      tree,
      (node): node is Raw => node.type === 'raw',
      (node) => {
        const components = parseComponents(node.value)

        // Skip if there are no components to be rendered.
        if (!components.length) return

        // Add components information to the node
        node.data = {
          ...node.data,
          components,
        }

        nodes.push(node)

        return SKIP
      },
    )

    // Transform nodes asynchronously
    const promises = nodes.map((node) => async () => {
      const markup = node.value

      const components = node.data!.components as string[]

      const allComponents = Object.keys(import.meta.glob('/src/lib/**/*.svelte'))
      const componentLocations: string[] = components
        .map((component) => allComponents.find((path) => path.endsWith(`${component}.svelte`)))
        .filter((x): x is string => !!x)

      // TODO: Render error for not-found components

      let locationMapper: (location: string, index: number) => string

      if (import.meta.env.MODE === 'production') {
        // This applies for adapter-static:
        locationMapper = (_, i) => `import ${components[i]} from '../../chunks/${components[i]}.js'`

        // This applies for adapter-auto:
        // locationMapper = (location, i) => `import ${components[i]} from './${components[i]}.js'`
      } else {
        locationMapper = (location, i) => `import ${components[i]} from '${location}'`
      }

      const imports = componentLocations.map(locationMapper).join('\n')

      const svelteSource = `
				<script>
					${imports}
				</script>

				${markup}
			`

      const compiled = compile(svelteSource, {
        // dev: true,
        generate: 'ssr',
        enableSourcemap: false,
        hydratable: true,
        // preserveWhitespace: true,
      })

      const code = compiled.js.code

      // Create temporary TS file to import
      const index = Math.floor(Math.random() * 0xffffff)

      const TMP_FILENAME = `./~tmp-${index}.js`
      const TMP_PATH = path.join(__dirname, TMP_FILENAME)

      // await fs.writeFile(TMP_PATH, code)
      fs.writeFileSync(TMP_PATH, code)

      // Import component and perform SSR
      const Component: SvelteSSRComponent = await import(
        `${__dirname}/~tmp-${index}.js` /* @vite-ignore */
      ).then((module) => module.default)

      const rendered = Component.render()

      // Delete temporary file
      // await fs.rm(TMP_PATH)
      fs.rmSync(TMP_PATH)

      // Replace HTML
      node.value = rendered.html

      node.value = replaceStuff(node.value)

      // Accumulate generated CSS
      file.data.css = (file.data.css ?? '') + rendered.css.code
    })

    for (const promise of promises) {
      await promise()
      // await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    // await Promise.all(promises)
  }
}

/**
 * Finds `text` nodes in an `hast` and...
 * - parses their content as markdown,
 * - transforms the `mdast` to an `hast`
 * - and replaces the `text` node with the generated `hast` tree.
 */
export const rehypeMath: Plugin<[], HastRoot> = function () {
  return (tree, file) => {
    visit(tree, (node, index, parent) => {
      if (node.type !== 'text' || !parent || typeof index !== 'number') return

      // console.log(node);
      // return SKIP

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

      // parent.children[index] = {
      //   type: 'element',
      //   tagName: 'span',
      //   children: child.children,
      // }

      // Skip children of this node
      return SKIP
    })
  }
}
