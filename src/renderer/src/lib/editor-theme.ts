import { EDITOR_THEME_CATALOG } from './editor-themes'
import type { EditorThemeEntry } from './editor-themes/types'
import { getSystemPrefersDark } from './system-color-scheme'
import type { GlobalSettings } from '../../../shared/types'

// Monaco's built-in theme ids, used when no custom editor theme is chosen.
export const DEFAULT_EDITOR_THEME_DARK = 'vs-dark'
export const DEFAULT_EDITOR_THEME_LIGHT = 'vs'

export const BUILTIN_EDITOR_THEME_NAMES: string[] = Object.keys(EDITOR_THEME_CATALOG).sort((a, b) =>
  a.localeCompare(b)
)

export function getEditorThemeEntry(displayName: string): EditorThemeEntry | null {
  return EDITOR_THEME_CATALOG[displayName] ?? null
}

export function resolveEffectiveEditorThemeName(
  settings:
    | Pick<
        GlobalSettings,
        'theme' | 'editorThemeDark' | 'editorThemeLight' | 'editorUseSeparateLightTheme'
      >
    | null
    | undefined,
  systemPrefersDark = getSystemPrefersDark()
): string {
  // Why: nullish (not-yet-loaded) or 'system' settings resolve dark/light from
  // systemPrefersDark, so callers don't have to compute their own fallback.
  const sourceTheme =
    !settings || settings.theme === 'system'
      ? systemPrefersDark
        ? 'dark'
        : 'light'
      : settings.theme
  // Why: light mode reuses the dark selection unless the user opted into a
  // separate light theme, matching the terminal resolver's behavior.
  const useLightVariant = sourceTheme === 'light' && !!settings?.editorUseSeparateLightTheme
  const displayName = useLightVariant ? settings?.editorThemeLight : settings?.editorThemeDark
  const fallback = sourceTheme === 'dark' ? DEFAULT_EDITOR_THEME_DARK : DEFAULT_EDITOR_THEME_LIGHT

  // Why: '' (no custom theme) and unknown/stale names both fall back to the
  // Monaco built-ins.
  const entry = displayName ? getEditorThemeEntry(displayName) : null
  return entry ? entry.id : fallback
}
