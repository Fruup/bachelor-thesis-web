import { process } from '$lib/services/md'

export const ssr = true
export const csr = true
export const prerender = true

export const load = async () => {
  const fileImports = [
    import('$thesis-md/abstract.md?raw'),
    import('$thesis-md/acknowledgements.md?raw'),
    import('$thesis-md/chapter-related-work.md?raw'),
    import('$thesis-md/chapter-introduction.md?raw'),
    import('$thesis-md/chapter-fundamentals.md?raw'),
    import('$thesis-md/chapter-pipeline.md?raw'),
    import('$thesis-md/chapter-particle-neighborhood.md?raw'),
    import('$thesis-md/chapter-acceleration.md?raw'),
    import('$thesis-md/chapter-results.md?raw'),
    import('$thesis-md/chapter-future-work.md?raw'),
    import('$thesis-md/chapter-conclusion.md?raw'),

    import('$thesis-md/links.md?raw'),
  ]

  const source = (await Promise.all(fileImports)).map((module) => module.default).join('\n\n')
  const { html, css, headings } = await process(source)

  return { html, css, headings }
}
