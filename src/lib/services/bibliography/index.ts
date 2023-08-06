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

  return {
    refs: cite.data as CitationReference[],
    html: cite.format('bibliography', {
      format: 'html',
      template: 'apa',
    }),
  }
}
