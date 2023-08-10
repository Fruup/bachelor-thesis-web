import { Cite, type CitationReference } from '@citation-js/core'
import '@citation-js/plugin-bibtex'
import '@citation-js/plugin-csl'

export interface Bibliography {
  refs: CitationReference[]
  html: string
}

export const generateBibliography = (bibtex: string): Bibliography => {
  const cite = new Cite(bibtex)

  let html: string = cite.format('bibliography', {
    format: 'html',
    template: 'apa',
  })

  /**
   * Add an ID to each element. It can then be used as a link target.
   *
   * data-csl-entry-id="Hello"
   * ->
   * data-csl-entry-id="Hello" id="Hello"
   */
  const regex = /data-csl-entry-id="[^\"]*"/g
  html = html.replaceAll(
    regex,
    (substring) => substring + substring.slice('data-csl-entry-'.length),
  )

  return {
    refs: cite.data,
    html,
  }
}
