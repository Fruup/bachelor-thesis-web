import { get, writable } from 'svelte/store'
import type { Action } from 'svelte/action'

interface HistoryEntry {
  scrollPosition: number
  toHash: string
}

const isHistoryEvent = (e: any): e is HistoryEntry =>
  typeof e.scrollPosition === 'number' && typeof e.toHash === 'string'

export const navigationHistory = writable<HistoryEntry[]>([])

const scrollToHash = (hash: string) => {
  let toElement: HTMLElement | null = null

  try {
    toElement = document.querySelector(hash)
    if (!toElement) return false
  } catch (e) {
    return false
  }

  toElement.scrollIntoView({ behavior: 'smooth' })

  return true
}

const scrollToPosition = (top: number) => {
  window.scrollTo({
    top,
    behavior: 'smooth',
  })
}

const createAnchorEventListener = (a: HTMLAnchorElement) => (e: MouseEvent) => {
  // Cancel default navigation and scroll smoothly instead
  e.preventDefault()

  scrollToHash(a.hash)

  // Use web history
  const entry: HistoryEntry = { scrollPosition: window.scrollY, toHash: a.hash }
  history.pushState(entry, a.hash, a.hash)

  // Add entry to history
  navigationHistory.update((history) => history.concat(entry))
}

const restore = (index: number) => {
  const length = get(navigationHistory).length
  if (!length) return

  while (index < 0) index += length

  // Restore scroll position
  scrollToPosition(get(navigationHistory)[index].scrollPosition)

  // Remove element
  navigationHistory.update((history) => [...history.slice(0, index), ...history.slice(index + 1)])
}

const handleRestore = ((e: CustomEvent<number>) => restore(e.detail)) as EventListener

export const useNavigationHistory: Action = (node) => {
  window.addEventListener('popstate', (e) => {
    const { state } = e
    if (isHistoryEvent(state)) {
      // Add state back to history.
      navigationHistory.update((history) => [...history, state])

      // Scroll
      scrollToHash(state.toHash)
    }

    // Restore the last history element.
    else if (get(navigationHistory).length) {
      restore(-1)
      e.preventDefault()
    }
  })
  window.addEventListener('', (e) => {
    // Restore the last history element.
    if (get(navigationHistory).length) {
      restore(-1)
      e.preventDefault()
    }
  })

  node.addEventListener('history:restore', handleRestore)

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

      node.removeEventListener('history:restore', handleRestore)
    },
  }
}
