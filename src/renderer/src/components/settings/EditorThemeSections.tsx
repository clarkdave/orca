import type { Dispatch, SetStateAction } from 'react'
import type { GlobalSettings } from '../../../../shared/types'
import { BUILTIN_EDITOR_THEME_NAMES } from '@/lib/editor-theme'
import { SettingsSwitch, ThemePicker } from './SettingsFormControls'
import { SearchableSetting } from './SearchableSetting'
import { EditorThemePreview } from './EditorThemePreview'
import {
  EDITOR_DARK_THEME_SEARCH_ENTRIES,
  EDITOR_LIGHT_THEME_SEARCH_ENTRIES
} from './editor-search'

// Why: the editor default is the '' sentinel (Monaco built-in vs/vs-dark). A
// synthetic first row lets the user return to that default after picking a
// custom theme — selecting it stores '' (see editorThemeFromPickerSelection).
const DEFAULT_THEME_LABEL = 'Default (Monaco)'

const EDITOR_PICKER_THEME_NAMES = [DEFAULT_THEME_LABEL, ...BUILTIN_EDITOR_THEME_NAMES]

/** Picker shows the synthetic default row as Current when no custom theme is set. */
function pickerSelection(themeName: string): string {
  return themeName || DEFAULT_THEME_LABEL
}

/** Maps a picked picker row back to the stored value ('' for the default). */
function editorThemeFromPickerSelection(selection: string): string {
  return selection === DEFAULT_THEME_LABEL ? '' : selection
}

type DarkEditorThemeSectionProps = {
  settings: GlobalSettings
  themeSearchDark: string
  setThemeSearchDark: Dispatch<SetStateAction<string>>
  updateSettings: (updates: Partial<GlobalSettings>) => void
}

type LightEditorThemeSectionProps = {
  settings: GlobalSettings
  themeSearchLight: string
  setThemeSearchLight: Dispatch<SetStateAction<string>>
  updateSettings: (updates: Partial<GlobalSettings>) => void
}

export function DarkEditorThemeSection({
  settings,
  themeSearchDark,
  setThemeSearchDark,
  updateSettings
}: DarkEditorThemeSectionProps): React.JSX.Element {
  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">Dark Theme</h3>
          <p className="text-xs text-muted-foreground">
            Choose the theme used for the editor and diff views in dark mode.
          </p>
        </div>

        <SearchableSetting {...EDITOR_DARK_THEME_SEARCH_ENTRIES[0]}>
          <ThemePicker
            label="Dark Theme"
            description="Choose the editor and diff theme used in dark mode."
            themeNames={EDITOR_PICKER_THEME_NAMES}
            selectedTheme={pickerSelection(settings.editorThemeDark)}
            query={themeSearchDark}
            onQueryChange={setThemeSearchDark}
            onSelectTheme={(theme) =>
              updateSettings({ editorThemeDark: editorThemeFromPickerSelection(theme) })
            }
          />
        </SearchableSetting>
      </div>

      <EditorThemePreview
        title="Dark Mode Preview"
        themeName={settings.editorThemeDark}
        mode="dark"
      />
    </section>
  )
}

export function LightEditorThemeSection({
  settings,
  themeSearchLight,
  setThemeSearchLight,
  updateSettings
}: LightEditorThemeSectionProps): React.JSX.Element {
  return (
    <section className="space-y-4">
      <SearchableSetting
        {...EDITOR_LIGHT_THEME_SEARCH_ENTRIES[0]}
        className="flex items-center justify-between gap-4 py-2"
      >
        <div className="space-y-0.5">
          <p className="text-sm font-medium">Use Separate Theme In Light Mode</p>
          <p className="text-xs text-muted-foreground">
            When disabled, light mode reuses the dark editor theme.
          </p>
        </div>
        <SettingsSwitch
          checked={settings.editorUseSeparateLightTheme}
          onChange={() =>
            updateSettings({ editorUseSeparateLightTheme: !settings.editorUseSeparateLightTheme })
          }
          ariaLabel="Use Separate Theme In Light Mode"
        />
      </SearchableSetting>

      {settings.editorUseSeparateLightTheme ? (
        <div className="grid overflow-hidden pt-2">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold">Light Theme</h3>
                <p className="text-xs text-muted-foreground">
                  Configure the optional light-mode editor appearance.
                </p>
              </div>

              <SearchableSetting {...EDITOR_LIGHT_THEME_SEARCH_ENTRIES[1]}>
                <ThemePicker
                  label="Light Theme"
                  description="Choose the editor and diff theme used when Orca is in light mode."
                  themeNames={EDITOR_PICKER_THEME_NAMES}
                  selectedTheme={pickerSelection(settings.editorThemeLight)}
                  query={themeSearchLight}
                  onQueryChange={setThemeSearchLight}
                  onSelectTheme={(theme) =>
                    updateSettings({ editorThemeLight: editorThemeFromPickerSelection(theme) })
                  }
                />
              </SearchableSetting>
            </div>

            <EditorThemePreview
              title="Light Mode Preview"
              themeName={settings.editorThemeLight}
              mode="light"
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}
