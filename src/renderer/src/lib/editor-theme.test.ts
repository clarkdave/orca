import { describe, expect, it } from 'vitest'
import {
  BUILTIN_EDITOR_THEME_NAMES,
  DEFAULT_EDITOR_THEME_DARK,
  DEFAULT_EDITOR_THEME_LIGHT,
  getEditorThemeEntry,
  resolveEffectiveEditorThemeName
} from './editor-theme'
import { EDITOR_THEME_CATALOG } from './editor-themes'

// Required diff color keys — the core reason the custom theme catalog exists.
const REQUIRED_DIFF_KEYS = [
  'diffEditor.insertedLineBackground',
  'diffEditor.insertedTextBackground',
  'diffEditor.removedLineBackground',
  'diffEditor.removedTextBackground'
] as const

describe('resolveEffectiveEditorThemeName', () => {
  it('returns the chosen dark theme id when in dark mode', () => {
    const result = resolveEffectiveEditorThemeName(
      {
        theme: 'dark',
        editorThemeDark: 'Dracula',
        editorThemeLight: '',
        editorUseSeparateLightTheme: false
      },
      true
    )

    expect(result).toBe(getEditorThemeEntry('Dracula')!.id)
  })

  it('returns the built-in dark id when editorThemeDark is the empty sentinel', () => {
    const result = resolveEffectiveEditorThemeName(
      {
        theme: 'dark',
        editorThemeDark: '',
        editorThemeLight: '',
        editorUseSeparateLightTheme: false
      },
      true
    )

    expect(result).toBe(DEFAULT_EDITOR_THEME_DARK)
  })

  it('returns the chosen light theme id when separate light theme is on', () => {
    const result = resolveEffectiveEditorThemeName(
      {
        theme: 'light',
        editorThemeDark: 'Dracula',
        editorThemeLight: 'Solarized Light',
        editorUseSeparateLightTheme: true
      },
      false
    )

    expect(result).toBe(getEditorThemeEntry('Solarized Light')!.id)
  })

  it('reuses the dark theme id in light mode when separate light theme is off', () => {
    const result = resolveEffectiveEditorThemeName(
      {
        theme: 'light',
        editorThemeDark: 'Dracula',
        editorThemeLight: 'Solarized Light',
        editorUseSeparateLightTheme: false
      },
      false
    )

    // Why: light mode without the toggle reuses the dark selection, matching
    // the terminal resolver's behavior.
    expect(result).toBe(getEditorThemeEntry('Dracula')!.id)
  })

  it('returns the built-in light id in light mode when the selection is the empty sentinel', () => {
    const result = resolveEffectiveEditorThemeName(
      {
        theme: 'light',
        editorThemeDark: '',
        editorThemeLight: '',
        editorUseSeparateLightTheme: false
      },
      false
    )

    expect(result).toBe(DEFAULT_EDITOR_THEME_LIGHT)
  })

  describe('theme:system delegates to systemPrefersDark', () => {
    const settings = {
      theme: 'system' as const,
      editorThemeDark: 'Dracula',
      editorThemeLight: 'Solarized Light',
      editorUseSeparateLightTheme: true
    }

    it('resolves as dark when systemPrefersDark is true', () => {
      const result = resolveEffectiveEditorThemeName(settings, true)
      expect(result).toBe(getEditorThemeEntry('Dracula')!.id)
    })

    it('resolves as light when systemPrefersDark is false', () => {
      const result = resolveEffectiveEditorThemeName(settings, false)
      expect(result).toBe(getEditorThemeEntry('Solarized Light')!.id)
    })
  })

  describe('nullish settings fall back to the built-in id from systemPrefersDark', () => {
    it('resolves the built-in dark id when settings is null and systemPrefersDark is true', () => {
      expect(resolveEffectiveEditorThemeName(null, true)).toBe(DEFAULT_EDITOR_THEME_DARK)
    })

    it('resolves the built-in light id when settings is null and systemPrefersDark is false', () => {
      expect(resolveEffectiveEditorThemeName(null, false)).toBe(DEFAULT_EDITOR_THEME_LIGHT)
    })

    it('resolves the built-in dark id when settings is undefined and systemPrefersDark is true', () => {
      expect(resolveEffectiveEditorThemeName(undefined, true)).toBe(DEFAULT_EDITOR_THEME_DARK)
    })
  })

  it('falls back to the built-in dark id when editorThemeDark is an unknown/stale name', () => {
    const result = resolveEffectiveEditorThemeName(
      {
        theme: 'dark',
        editorThemeDark: 'No Such Theme',
        editorThemeLight: '',
        editorUseSeparateLightTheme: false
      },
      true
    )

    expect(result).toBe(DEFAULT_EDITOR_THEME_DARK)
  })
})

describe('catalog integrity', () => {
  it('every name in BUILTIN_EDITOR_THEME_NAMES resolves to a non-null entry', () => {
    for (const name of BUILTIN_EDITOR_THEME_NAMES) {
      expect(
        getEditorThemeEntry(name),
        `getEditorThemeEntry('${name}') should be non-null`
      ).not.toBeNull()
    }
  })

  it('every theme entry includes all required diff color keys as non-empty strings', () => {
    for (const [displayName, entry] of Object.entries(EDITOR_THEME_CATALOG)) {
      for (const key of REQUIRED_DIFF_KEYS) {
        const value = entry.data.colors[key]
        expect(value, `'${displayName}' is missing or has empty value for '${key}'`).toBeTruthy()
        expect(typeof value, `'${displayName}'.colors['${key}'] should be a string`).toBe('string')
      }
    }
  })

  it('all theme ids are unique across the catalog', () => {
    const ids = Object.values(EDITOR_THEME_CATALOG).map((entry) => entry.id)
    const uniqueIds = new Set(ids)
    expect(ids.length).toBe(uniqueIds.size)
  })

  it('all theme ids match the valid Monaco id pattern and do not collide with built-ins', () => {
    const validId = /^[a-z0-9-]+$/
    for (const [displayName, entry] of Object.entries(EDITOR_THEME_CATALOG)) {
      expect(
        validId.test(entry.id),
        `'${displayName}' has id '${entry.id}' which is not lowercase/alnum/hyphen`
      ).toBe(true)
      expect(entry.id, `'${displayName}' id must not be 'vs'`).not.toBe('vs')
      expect(entry.id, `'${displayName}' id must not be 'vs-dark'`).not.toBe('vs-dark')
    }
  })

  it('every entry has a valid Monaco base and inherit:true', () => {
    for (const [displayName, entry] of Object.entries(EDITOR_THEME_CATALOG)) {
      expect(
        ['vs-dark', 'vs'],
        `'${displayName}' has unexpected base '${entry.data.base}'`
      ).toContain(entry.data.base)
      expect(entry.data.inherit, `'${displayName}' should have inherit:true`).toBe(true)
    }
  })
})
