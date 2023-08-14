import { get, writable } from 'svelte/store'
import type { Action } from 'svelte/action'

interface HistoryEntry {
  scrollPosition: number
  toHash: string
}

export const navigationHistory = writable<HistoryEntry[]>([])

export const usePreview: Action = (node) => {
  /**
   * Determine anchors for preview.
   * - Skip citation links.
   * - Only use internal links.
   */
  const anchors = node.querySelectorAll<HTMLAnchorElement>('a[href^="#"]:not([data-is-citation])')

  const listeners = Array.from(anchors.values()).map((a) => {
    const listener = () => {
      let targetElement: HTMLElement | undefined | null

      try {
        targetElement = node.querySelector<HTMLElement>(a.getAttribute('href') ?? '_')
      } catch {
        return
      }

      if (targetElement) {
        previewElement.set(targetElement)
        previewAnchor.set(a)
      }
    }

    a.addEventListener('mouseenter', listener)
    return listener
  })

  return {
    destroy: () => {
      // Remove event listeners
      anchors.forEach((a, i) => a.removeEventListener('mouseenter', listeners[i]))
    },
  }
}

export const previewElement = writable<HTMLElement | null>(null)

export const previewAnchor = (() => {
  const store = writable<HTMLAnchorElement | null>(null)

  const handleMouseLeave = () => {
    store.set(null)
    previewElement.set(null)
  }

  return {
    subscribe: store.subscribe,

    set: ((value) => {
      const current = get(store)
      if (current) {
        current.removeEventListener('mouseleave', handleMouseLeave)
      }

      value?.addEventListener('mouseleave', handleMouseLeave)

      store.set(value)
    }) satisfies typeof store.set,
  }
})()
