import type * as monaco from 'monaco-editor'

// Each entry pairs a Monaco theme id (for monaco.editor.defineTheme) with its
// IStandaloneThemeData. The map is keyed by display name (shown in the picker).
export type EditorThemeEntry = { id: string; data: monaco.editor.IStandaloneThemeData }
export type EditorThemeMap = Record<string, EditorThemeEntry>
