declare module '@citation-js/core' {
  export class Cite {
    public data: CitationReference[]

    constructor(source: string)

    format(type: 'bibliography', options: FormatOptions): string
  }

  interface FormatOptions {
    format: 'html'
    template: 'apa'
  }

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
}

declare module '@citation-js/plugin-bibtex' {}

declare module '@citation-js/plugin-csl' {}
