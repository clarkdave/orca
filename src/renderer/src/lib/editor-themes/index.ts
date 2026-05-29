import { POPULAR_DARK_EDITOR_THEMES } from './popular-dark'
import { POPULAR_LIGHT_EDITOR_THEMES } from './popular-light'
import { mergeEditorThemeCatalogs } from './shared'
import type { EditorThemeMap } from './types'

const THEME_CATEGORIES: readonly EditorThemeMap[] = [
  POPULAR_DARK_EDITOR_THEMES,
  POPULAR_LIGHT_EDITOR_THEMES
]

export const EDITOR_THEME_CATALOG: EditorThemeMap = mergeEditorThemeCatalogs(...THEME_CATEGORIES)
