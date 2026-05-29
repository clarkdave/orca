// Why: shared by the terminal and editor theme resolvers. Defaults to dark when
// the media query is unavailable (non-DOM/headless contexts) so themes still resolve.
export function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}
