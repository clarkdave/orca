import { useState } from 'react'
import type { GlobalSettings } from '../../../../shared/types'
import { Separator } from '../ui/separator'
import { matchesSettingsSearch } from './settings-search'
import { useAppStore } from '../../store'
import { DarkEditorThemeSection, LightEditorThemeSection } from './EditorThemeSections'
import {
  EDITOR_DARK_THEME_SEARCH_ENTRIES,
  EDITOR_LIGHT_THEME_SEARCH_ENTRIES
} from './editor-search'

type EditorPaneProps = {
  settings: GlobalSettings
  updateSettings: (updates: Partial<GlobalSettings>) => void
}

export function EditorPane({ settings, updateSettings }: EditorPaneProps): React.JSX.Element {
  const searchQuery = useAppStore((state) => state.settingsSearchQuery)
  const [themeSearchDark, setThemeSearchDark] = useState('')
  const [themeSearchLight, setThemeSearchLight] = useState('')

  const visibleSections = [
    matchesSettingsSearch(searchQuery, EDITOR_DARK_THEME_SEARCH_ENTRIES) ? (
      <DarkEditorThemeSection
        key="dark-theme"
        settings={settings}
        themeSearchDark={themeSearchDark}
        setThemeSearchDark={setThemeSearchDark}
        updateSettings={updateSettings}
      />
    ) : null,
    matchesSettingsSearch(searchQuery, EDITOR_LIGHT_THEME_SEARCH_ENTRIES) ? (
      <LightEditorThemeSection
        key="light-theme"
        settings={settings}
        themeSearchLight={themeSearchLight}
        setThemeSearchLight={setThemeSearchLight}
        updateSettings={updateSettings}
      />
    ) : null
  ].filter(Boolean)

  return (
    <div className="space-y-6">
      {visibleSections.map((section, index) => (
        <div key={index} className="space-y-6">
          {index > 0 ? <Separator /> : null}
          {section}
        </div>
      ))}
    </div>
  )
}
