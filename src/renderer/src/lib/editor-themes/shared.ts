import type { EditorThemeMap } from './types'

export function mergeEditorThemeCatalogs(...catalogs: readonly EditorThemeMap[]): EditorThemeMap {
  const merged: EditorThemeMap = {}

  for (const catalog of catalogs) {
    for (const [name, entry] of Object.entries(catalog)) {
      if (Object.prototype.hasOwnProperty.call(merged, name)) {
        throw new Error(`Duplicate editor theme name: ${name}`)
      }
      merged[name] = entry
    }
  }

  return merged
}
