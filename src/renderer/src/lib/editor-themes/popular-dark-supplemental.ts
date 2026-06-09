import type { EditorThemeMap } from './types'

export const POPULAR_DARK_SUPPLEMENTAL_EDITOR_THEMES: EditorThemeMap = {
  Palenight: {
    id: 'palenight',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#292d3e',
        'editor.foreground': '#a6accd',
        'editor.lineHighlightBackground': '#3a3f58',
        'editorLineNumber.foreground': '#3a3f58',
        'editorCursor.foreground': '#ffcc00',
        'editor.selectionBackground': '#717cb480',
        'diffEditor.insertedLineBackground': '#c3e88d26',
        'diffEditor.insertedTextBackground': '#c3e88d59',
        'diffEditor.removedLineBackground': '#ff537026',
        'diffEditor.removedTextBackground': '#ff537059',
        'diffEditorGutter.insertedLineBackground': '#c3e88d26',
        'diffEditorGutter.removedLineBackground': '#ff537026',
        'diffEditorOverview.insertedForeground': '#c3e88d',
        'diffEditorOverview.removedForeground': '#ff5370'
      },
      rules: [
        { token: 'comment', foreground: '676e95' },
        { token: 'string', foreground: 'c3e88d' },
        { token: 'keyword', foreground: 'c792ea' },
        { token: 'number', foreground: 'f78c6c' },
        { token: 'type', foreground: 'ffcb6b' },
        { token: 'entity.name.type', foreground: 'ffcb6b' },
        { token: 'function', foreground: '82aaff' },
        { token: 'entity.name.function', foreground: '82aaff' },
        { token: 'variable', foreground: 'a6accd' },
        { token: 'constant', foreground: 'f78c6c' },
        { token: 'constant.language', foreground: 'ff5370' },
        { token: 'operator', foreground: '89ddff' }
      ]
    }
  },
  'Horizon Dark': {
    id: 'horizon-dark',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#1c1e26',
        'editor.foreground': '#d5d8da',
        'editor.lineHighlightBackground': '#232530',
        'editorLineNumber.foreground': '#4e515d',
        'editorCursor.foreground': '#fab795',
        'editor.selectionBackground': '#2e303e',
        'diffEditor.insertedLineBackground': '#29d39826',
        'diffEditor.insertedTextBackground': '#29d39859',
        'diffEditor.removedLineBackground': '#e95a7826',
        'diffEditor.removedTextBackground': '#e95a7859',
        'diffEditorGutter.insertedLineBackground': '#29d39826',
        'diffEditorGutter.removedLineBackground': '#e95a7826',
        'diffEditorOverview.insertedForeground': '#29d398',
        'diffEditorOverview.removedForeground': '#e95a78'
      },
      rules: [
        { token: 'comment', foreground: '6c6f93' },
        { token: 'string', foreground: 'fab795' },
        { token: 'keyword', foreground: 'b877db' },
        { token: 'number', foreground: 'f09483' },
        { token: 'type', foreground: '25b2bc' },
        { token: 'entity.name.type', foreground: '25b2bc' },
        { token: 'function', foreground: '25b0bc' },
        { token: 'entity.name.function', foreground: '25b0bc' },
        { token: 'variable', foreground: 'd5d8da' },
        { token: 'constant', foreground: 'f09483' },
        { token: 'constant.language', foreground: 'f09483' },
        { token: 'operator', foreground: 'e95a78' }
      ]
    }
  },
  Nightfox: {
    id: 'nightfox',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#192330',
        'editor.foreground': '#cdcecf',
        'editor.lineHighlightBackground': '#212e3f',
        'editorLineNumber.foreground': '#526175',
        'editorCursor.foreground': '#cdcecf',
        'editor.selectionBackground': '#2b3b51',
        'diffEditor.insertedLineBackground': '#81b29a26',
        'diffEditor.insertedTextBackground': '#81b29a59',
        'diffEditor.removedLineBackground': '#c9485726',
        'diffEditor.removedTextBackground': '#c9485759',
        'diffEditorGutter.insertedLineBackground': '#81b29a26',
        'diffEditorGutter.removedLineBackground': '#c9485726',
        'diffEditorOverview.insertedForeground': '#81b29a',
        'diffEditorOverview.removedForeground': '#c94857'
      },
      rules: [
        { token: 'comment', foreground: '738091' },
        { token: 'string', foreground: '8ebaa4' },
        { token: 'keyword', foreground: '9d79d6' },
        { token: 'number', foreground: 'f4a261' },
        { token: 'type', foreground: 'dbc074' },
        { token: 'entity.name.type', foreground: 'dbc074' },
        { token: 'function', foreground: '86abdc' },
        { token: 'entity.name.function', foreground: '86abdc' },
        { token: 'variable', foreground: 'cdcecf' },
        { token: 'constant', foreground: 'f4a261' },
        { token: 'constant.language', foreground: 'f4a261' },
        { token: 'operator', foreground: '63cdcf' }
      ]
    }
  },
  Kanagawa: {
    id: 'kanagawa',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#1f1f28',
        'editor.foreground': '#dcd7ba',
        'editor.lineHighlightBackground': '#2a2a37',
        'editorLineNumber.foreground': '#54546d',
        'editorCursor.foreground': '#c8c093',
        'editor.selectionBackground': '#2d4f67',
        'diffEditor.insertedLineBackground': '#76946a26',
        'diffEditor.insertedTextBackground': '#76946a59',
        'diffEditor.removedLineBackground': '#c3404326',
        'diffEditor.removedTextBackground': '#c3404359',
        'diffEditorGutter.insertedLineBackground': '#76946a26',
        'diffEditorGutter.removedLineBackground': '#c3404326',
        'diffEditorOverview.insertedForeground': '#76946a',
        'diffEditorOverview.removedForeground': '#c34043'
      },
      rules: [
        { token: 'comment', foreground: '727169' },
        { token: 'string', foreground: '98bb6c' },
        { token: 'keyword', foreground: '957fb8' },
        { token: 'number', foreground: 'd27e99' },
        { token: 'type', foreground: '7aa89f' },
        { token: 'entity.name.type', foreground: '7aa89f' },
        { token: 'function', foreground: '7e9cd8' },
        { token: 'entity.name.function', foreground: '7e9cd8' },
        { token: 'variable', foreground: 'dcd7ba' },
        { token: 'constant', foreground: 'ffa066' },
        { token: 'constant.language', foreground: 'ffa066' },
        { token: 'operator', foreground: 'c0a36e' }
      ]
    }
  },
  'Everforest Dark': {
    id: 'everforest-dark',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#2d353b',
        'editor.foreground': '#d3c6aa',
        'editor.lineHighlightBackground': '#343f44',
        'editorLineNumber.foreground': '#7a8478',
        'editorCursor.foreground': '#d3c6aa',
        'editor.selectionBackground': '#475258',
        'diffEditor.insertedLineBackground': '#a7c08026',
        'diffEditor.insertedTextBackground': '#a7c08059',
        'diffEditor.removedLineBackground': '#e67e8026',
        'diffEditor.removedTextBackground': '#e67e8059',
        'diffEditorGutter.insertedLineBackground': '#a7c08026',
        'diffEditorGutter.removedLineBackground': '#e67e8026',
        'diffEditorOverview.insertedForeground': '#a7c080',
        'diffEditorOverview.removedForeground': '#e67e80'
      },
      rules: [
        { token: 'comment', foreground: '859289' },
        { token: 'string', foreground: 'a7c080' },
        { token: 'keyword', foreground: 'e67e80' },
        { token: 'number', foreground: 'd699b6' },
        { token: 'type', foreground: 'dbbc7f' },
        { token: 'entity.name.type', foreground: 'dbbc7f' },
        { token: 'function', foreground: 'a7c080' },
        { token: 'entity.name.function', foreground: 'a7c080' },
        { token: 'variable', foreground: 'd3c6aa' },
        { token: 'constant', foreground: 'd699b6' },
        { token: 'constant.language', foreground: 'd699b6' },
        { token: 'operator', foreground: 'e69875' }
      ]
    }
  }
}
