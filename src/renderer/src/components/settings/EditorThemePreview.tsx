import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getEditorThemeEntry } from '@/lib/editor-theme'
import { SettingsBadge } from './SettingsFormControls'

type PreviewMode = 'dark' | 'light'

type EditorThemePreviewProps = {
  title: string
  description?: string
  /** Selected display name, or '' for the Monaco built-in default. */
  themeName: string
  /** Which app mode this preview represents — picks the right built-in fallback. */
  mode: PreviewMode
}

// Why: a Monaco theme is global (monaco.editor.setTheme applies to every editor
// instance), so a live editor can't show dark + light simultaneously, and a
// light theme selected while the app is dark wouldn't apply at all. This static
// sampler reads the catalog colors directly so each mode renders its own theme.

// Approximation of Monaco's built-in vs / vs-dark for the '' default sentinel.
// Only the handful of keys the sampler reads — not a full theme.
type SampleColors = {
  background: string
  foreground: string
  lineNumber: string
  insertedLine: string
  removedLine: string
}

const BUILTIN_VS_DARK: SampleColors = {
  background: '#1e1e1e',
  foreground: '#d4d4d4',
  lineNumber: '#858585',
  insertedLine: '#373d29',
  removedLine: '#4b1818'
}

const BUILTIN_VS_LIGHT: SampleColors = {
  background: '#ffffff',
  foreground: '#000000',
  lineNumber: '#237893',
  insertedLine: '#e6ffed',
  removedLine: '#ffeef0'
}

function resolveSampleColors(themeName: string, mode: PreviewMode): SampleColors {
  const fallback = mode === 'dark' ? BUILTIN_VS_DARK : BUILTIN_VS_LIGHT
  const colors = themeName ? getEditorThemeEntry(themeName)?.data.colors : undefined
  if (!colors) {
    return fallback
  }
  // Why: fall back per-key so a theme missing one diff color still renders the
  // rest instead of crashing or showing a blank swatch.
  return {
    background: colors['editor.background'] ?? fallback.background,
    foreground: colors['editor.foreground'] ?? fallback.foreground,
    lineNumber: colors['editorLineNumber.foreground'] ?? fallback.lineNumber,
    insertedLine: colors['diffEditor.insertedLineBackground'] ?? fallback.insertedLine,
    removedLine: colors['diffEditor.removedLineBackground'] ?? fallback.removedLine
  }
}

type SampleLine = {
  gutter: string
  marker: ' ' | '+' | '-'
  text: string
  /** Optional line-background tint (the diff insert/remove color). */
  background?: string
}

// Why: a compact diff hunk is enough to show the diff colors the user is
// choosing the theme to fix. Kept tiny — this is a color sampler, not syntax.
const SAMPLE_LINES: (colors: SampleColors) => SampleLine[] = (colors) => [
  { gutter: '', marker: ' ', text: '@@ -1,4 +1,4 @@ function greet() {' },
  { gutter: '12', marker: ' ', text: "  const name = 'world'" },
  { gutter: '13', marker: '-', text: "  return 'hi ' + name", background: colors.removedLine },
  { gutter: '13', marker: '+', text: '  return `hello ${name}`', background: colors.insertedLine },
  { gutter: '14', marker: ' ', text: '}' }
]

export function EditorThemePreview({
  title,
  description,
  themeName,
  mode
}: EditorThemePreviewProps): React.JSX.Element {
  const colors = resolveSampleColors(themeName, mode)
  const isDefault = !themeName || getEditorThemeEntry(themeName) === null
  const lines = SAMPLE_LINES(colors)

  return (
    <Card className="gap-4 overflow-hidden py-0">
      <CardHeader className="gap-0 border-b border-border/50 px-4 py-3 !pb-3">
        <div className="flex min-h-7 items-center justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-sm">{title}</CardTitle>
            {description ? <CardDescription>{description}</CardDescription> : null}
          </div>
          {isDefault ? (
            <SettingsBadge tone="muted" className="shrink-0">
              Monaco default
            </SettingsBadge>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div
          className="overflow-hidden rounded-md border border-border/50 font-mono text-xs leading-relaxed"
          style={{ backgroundColor: colors.background, color: colors.foreground }}
          aria-hidden="true"
        >
          {lines.map((line, index) => (
            <div
              key={index}
              className="flex items-stretch"
              style={line.background ? { backgroundColor: line.background } : undefined}
            >
              <span
                className="w-8 shrink-0 select-none px-2 text-right tabular-nums"
                style={{ color: colors.lineNumber }}
              >
                {line.gutter}
              </span>
              <span className="w-4 shrink-0 select-none text-center opacity-80">{line.marker}</span>
              <span className="whitespace-pre py-0.5 pr-3">{line.text}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
