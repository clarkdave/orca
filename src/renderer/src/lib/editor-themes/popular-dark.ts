import { mergeEditorThemeCatalogs } from './shared'
import { POPULAR_DARK_CORE_EDITOR_THEMES } from './popular-dark-core'
import { POPULAR_DARK_EXTENDED_EDITOR_THEMES } from './popular-dark-extended'
import { POPULAR_DARK_SUPPLEMENTAL_EDITOR_THEMES } from './popular-dark-supplemental'

export const POPULAR_DARK_EDITOR_THEMES = mergeEditorThemeCatalogs(
  POPULAR_DARK_CORE_EDITOR_THEMES,
  POPULAR_DARK_EXTENDED_EDITOR_THEMES,
  POPULAR_DARK_SUPPLEMENTAL_EDITOR_THEMES
)
