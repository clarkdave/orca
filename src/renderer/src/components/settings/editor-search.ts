import type { SettingsSearchEntry } from './settings-search'

export const EDITOR_DARK_THEME_SEARCH_ENTRIES: SettingsSearchEntry[] = [
  {
    title: 'Dark Theme',
    description: 'Choose the editor and diff theme used in dark mode.',
    keywords: ['editor', 'theme', 'diff colors', 'syntax', 'monaco', 'dark theme', 'preview']
  }
]

export const EDITOR_LIGHT_THEME_SEARCH_ENTRIES: SettingsSearchEntry[] = [
  {
    title: 'Use Separate Theme In Light Mode',
    description: 'When disabled, light mode reuses the dark editor theme.',
    keywords: ['editor', 'light mode', 'theme', 'monaco']
  },
  {
    title: 'Light Theme',
    description: 'Choose the editor and diff theme used when Orca is in light mode.',
    keywords: ['editor', 'theme', 'diff colors', 'syntax', 'monaco', 'light theme', 'preview']
  }
]

export const EDITOR_PANE_SEARCH_ENTRIES: SettingsSearchEntry[] = [
  ...EDITOR_DARK_THEME_SEARCH_ENTRIES,
  ...EDITOR_LIGHT_THEME_SEARCH_ENTRIES
]
