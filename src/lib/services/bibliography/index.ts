import { Cite } from '@citation-js/core'
import '@citation-js/plugin-bibtex'
import '@citation-js/plugin-csl'

export interface CitationReference {
  id: string
  type: 'paper-conference' | 'chapter' | 'thesis' | 'article-journal' | 'webpage'
  title: string
  author: any[]
  editor?: any[]
  publisher?: string
  'publisher-place'?: string
  DOI?: string
  ISBN?: string
  ISSN?: string
  issued?: { 'date-parts': any[] }
  page?: string
  volume?: string
  issue?: string
  URL?: string
  node?: string
  accessed?: { 'date-parts': any[] }
}

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
    refs: cite.data as CitationReference[],
    html,
  }
}
