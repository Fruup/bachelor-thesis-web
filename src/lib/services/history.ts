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

export const useNavigationHistory: Action = (node) => {
  window.addEventListener('popstate', (e) => {
    if (get(navigationHistory).length) {
      e.preventDefault()
    }
  })

  node.addEventListener('history:restore', handleRestore as EventListener)

  const anchors = node.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')

  const listeners = Array.from(anchors.values()).map((a) => {
    const listener = createAnchorEventListener(a)

    a.addEventListener('click', listener)
    return listener
  })

  return {
    destroy: () => {
      // Remove event listeners
      anchors.forEach((a, i) => a.removeEventListener('click', listeners[i]))

      node.removeEventListener('history:restore', handleRestore as EventListener)
    },
  }

  return {
    restore: (index: number) => {
      // Restore scroll position
      window.scrollTo({
        top: get(navigationHistory)[index].scrollPosition,
        behavior: 'smooth',
      })

      // Remove element
      navigationHistory.update((history) => [
        ...history.slice(0, index),
        ...history.slice(index + 1),
      ])
    },

    removeEventListeners: () => {
      anchors.forEach((a, i) => a.removeEventListener('click', listeners[i]))
    },
  }
}
