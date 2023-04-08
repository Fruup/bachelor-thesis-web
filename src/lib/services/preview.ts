import { browser } from '$app/environment'
import { get, writable } from 'svelte/store'
import type { Action } from 'svelte/action'

interface HistoryEntry {
  scrollPosition: number
  toHash: string
}

const createAnchorEventListener = (a: HTMLAnchorElement) => (e: MouseEvent) => {
  e.preventDefault()

  const toElement = document.querySelector(a.hash)
  if (!toElement) return

  // Cancel default navigation and scroll smoothly instead
  e.preventDefault()

  toElement.scrollIntoView({ behavior: 'smooth' })

  // Add entry to history
  navigationHistory.update((history) =>
    history.concat({ scrollPosition: window.scrollY, toHash: a.hash }),
  )
}

export const navigationHistory = writable<HistoryEntry[]>([])

const handleRestore = (e: CustomEvent<number>) => {
  const index = e.detail

  // Restore scroll position
  window.scrollTo({
    top: get(navigationHistory)[index].scrollPosition,
    behavior: 'smooth',
  })

  // Remove element
  navigationHistory.update((history) => [...history.slice(0, index), ...history.slice(index + 1)])
}

export const usePreview: Action = (node) => {
  const anchors = node.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')

  const listeners = Array.from(anchors.values()).map((a) => {
    const listener = () => {
      const targetElement = node.querySelector<HTMLElement>(a.getAttribute('href') ?? '_')

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
