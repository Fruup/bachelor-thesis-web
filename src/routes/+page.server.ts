import { process } from '$lib/services/md'

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
  ]

  const bib = await import('$thesis-md/bib-refs.bib?raw').then((module) => module.default)

  const source = (await Promise.all(fileImports)).map((module) => module.default).join('\n\n')
  const { html, css, headings, bibliography } = await process({ source, bibliography: bib })

  return { html, css, headings, bibliography }
}
