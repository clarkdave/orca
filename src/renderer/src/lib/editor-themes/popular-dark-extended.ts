import type { EditorThemeMap } from './types'

export const POPULAR_DARK_EXTENDED_EDITOR_THEMES: EditorThemeMap = {
  'Gruvbox Dark': {
    id: 'gruvbox-dark',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#282828',
        'editor.foreground': '#ebdbb2',
        'editor.lineHighlightBackground': '#3c3836',
        'editorLineNumber.foreground': '#7c6f64',
        'editorCursor.foreground': '#ebdbb2',
        'editor.selectionBackground': '#504945',
        'diffEditor.insertedLineBackground': '#b8bb2626',
        'diffEditor.insertedTextBackground': '#b8bb2659',
        'diffEditor.removedLineBackground': '#fb493426',
        'diffEditor.removedTextBackground': '#fb493459',
        'diffEditorGutter.insertedLineBackground': '#b8bb2626',
        'diffEditorGutter.removedLineBackground': '#fb493426',
        'diffEditorOverview.insertedForeground': '#b8bb26',
        'diffEditorOverview.removedForeground': '#fb4934'
      },
      rules: [
        { token: 'comment', foreground: '928374' },
        { token: 'string', foreground: 'b8bb26' },
        { token: 'keyword', foreground: 'fb4934' },
        { token: 'number', foreground: 'd3869b' },
        { token: 'type', foreground: 'fabd2f' },
        { token: 'entity.name.type', foreground: 'fabd2f' },
        { token: 'function', foreground: 'b8bb26' },
        { token: 'entity.name.function', foreground: 'b8bb26' },
        { token: 'variable', foreground: 'ebdbb2' },
        { token: 'constant', foreground: 'd3869b' },
        { token: 'constant.language', foreground: 'd3869b' },
        { token: 'operator', foreground: '8ec07c' }
      ]
    }
  },
  'Catppuccin Mocha': {
    id: 'catppuccin-mocha',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#1e1e2e',
        'editor.foreground': '#cdd6f4',
        'editor.lineHighlightBackground': '#313244',
        'editorLineNumber.foreground': '#6c7086',
        'editorCursor.foreground': '#f5e0dc',
        'editor.selectionBackground': '#585b70',
        'diffEditor.insertedLineBackground': '#a6e3a126',
        'diffEditor.insertedTextBackground': '#a6e3a159',
        'diffEditor.removedLineBackground': '#f38ba826',
        'diffEditor.removedTextBackground': '#f38ba859',
        'diffEditorGutter.insertedLineBackground': '#a6e3a126',
        'diffEditorGutter.removedLineBackground': '#f38ba826',
        'diffEditorOverview.insertedForeground': '#a6e3a1',
        'diffEditorOverview.removedForeground': '#f38ba8'
      },
      rules: [
        { token: 'comment', foreground: '6c7086' },
        { token: 'string', foreground: 'a6e3a1' },
        { token: 'keyword', foreground: 'cba6f7' },
        { token: 'number', foreground: 'fab387' },
        { token: 'type', foreground: 'f9e2af' },
        { token: 'entity.name.type', foreground: 'f9e2af' },
        { token: 'function', foreground: '89b4fa' },
        { token: 'entity.name.function', foreground: '89b4fa' },
        { token: 'variable', foreground: 'cdd6f4' },
        { token: 'constant', foreground: 'fab387' },
        { token: 'constant.language', foreground: 'fab387' },
        { token: 'operator', foreground: '89dceb' }
      ]
    }
  },
  'Ayu Dark': {
    id: 'ayu-dark',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#0b0e14',
        'editor.foreground': '#bfbdb6',
        'editor.lineHighlightBackground': '#131721',
        'editorLineNumber.foreground': '#6c7380',
        'editorCursor.foreground': '#e6b450',
        'editor.selectionBackground': '#409fff4d',
        'diffEditor.insertedLineBackground': '#7fd96226',
        'diffEditor.insertedTextBackground': '#7fd96259',
        'diffEditor.removedLineBackground': '#f26d7826',
        'diffEditor.removedTextBackground': '#f26d7859',
        'diffEditorGutter.insertedLineBackground': '#7fd96226',
        'diffEditorGutter.removedLineBackground': '#f26d7826',
        'diffEditorOverview.insertedForeground': '#7fd962',
        'diffEditorOverview.removedForeground': '#f26d78'
      },
      rules: [
        { token: 'comment', foreground: 'acb6bf8c' },
        { token: 'string', foreground: 'aad94c' },
        { token: 'keyword', foreground: 'ff8f40' },
        { token: 'number', foreground: 'd2a6ff' },
        { token: 'type', foreground: '59c2ff' },
        { token: 'entity.name.type', foreground: '59c2ff' },
        { token: 'function', foreground: 'ffb454' },
        { token: 'entity.name.function', foreground: 'ffb454' },
        { token: 'variable', foreground: 'bfbdb6' },
        { token: 'constant', foreground: 'd2a6ff' },
        { token: 'constant.language', foreground: 'd2a6ff' },
        { token: 'operator', foreground: 'f29668' }
      ]
    }
  },
  'Rose Pine': {
    id: 'rose-pine',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#191724',
        'editor.foreground': '#e0def4',
        'editor.lineHighlightBackground': '#21202e',
        'editorLineNumber.foreground': '#6e6a86',
        'editorCursor.foreground': '#e0def4',
        'editor.selectionBackground': '#403d52',
        'diffEditor.insertedLineBackground': '#31748f26',
        'diffEditor.insertedTextBackground': '#31748f59',
        'diffEditor.removedLineBackground': '#eb6f9226',
        'diffEditor.removedTextBackground': '#eb6f9259',
        'diffEditorGutter.insertedLineBackground': '#31748f26',
        'diffEditorGutter.removedLineBackground': '#eb6f9226',
        'diffEditorOverview.insertedForeground': '#31748f',
        'diffEditorOverview.removedForeground': '#eb6f92'
      },
      rules: [
        { token: 'comment', foreground: '6e6a86' },
        { token: 'string', foreground: 'f6c177' },
        { token: 'keyword', foreground: '31748f' },
        { token: 'number', foreground: 'ebbcba' },
        { token: 'type', foreground: '9ccfd8' },
        { token: 'entity.name.type', foreground: '9ccfd8' },
        { token: 'function', foreground: 'ebbcba' },
        { token: 'entity.name.function', foreground: 'ebbcba' },
        { token: 'variable', foreground: 'e0def4' },
        { token: 'constant', foreground: 'c4a7e7' },
        { token: 'constant.language', foreground: 'c4a7e7' },
        { token: 'operator', foreground: '31748f' }
      ]
    }
  },
  'Night Owl': {
    id: 'night-owl',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#011627',
        'editor.foreground': '#d6deeb',
        'editor.lineHighlightBackground': '#0e2438',
        'editorLineNumber.foreground': '#4b6479',
        'editorCursor.foreground': '#80a4c2',
        'editor.selectionBackground': '#1d3b53',
        'diffEditor.insertedLineBackground': '#addb6726',
        'diffEditor.insertedTextBackground': '#addb6759',
        'diffEditor.removedLineBackground': '#ef535026',
        'diffEditor.removedTextBackground': '#ef535059',
        'diffEditorGutter.insertedLineBackground': '#addb6726',
        'diffEditorGutter.removedLineBackground': '#ef535026',
        'diffEditorOverview.insertedForeground': '#addb67',
        'diffEditorOverview.removedForeground': '#ef5350'
      },
      rules: [
        { token: 'comment', foreground: '637777' },
        { token: 'string', foreground: 'ecc48d' },
        { token: 'keyword', foreground: 'c792ea' },
        { token: 'number', foreground: 'f78c6c' },
        { token: 'type', foreground: '82aaff' },
        { token: 'entity.name.type', foreground: '82aaff' },
        { token: 'function', foreground: '82aaff' },
        { token: 'entity.name.function', foreground: '82aaff' },
        { token: 'variable', foreground: 'd6deeb' },
        { token: 'constant', foreground: 'f78c6c' },
        { token: 'constant.language', foreground: 'ff5874' },
        { token: 'operator', foreground: 'c792ea' }
      ]
    }
  },
  'Material Dark': {
    id: 'material-dark',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#263238',
        'editor.foreground': '#eeffff',
        'editor.lineHighlightBackground': '#2e3c43',
        'editorLineNumber.foreground': '#546e7a',
        'editorCursor.foreground': '#ffcc00',
        'editor.selectionBackground': '#546e7a80',
        'diffEditor.insertedLineBackground': '#c3e88d26',
        'diffEditor.insertedTextBackground': '#c3e88d59',
        'diffEditor.removedLineBackground': '#f0717826',
        'diffEditor.removedTextBackground': '#f0717859',
        'diffEditorGutter.insertedLineBackground': '#c3e88d26',
        'diffEditorGutter.removedLineBackground': '#f0717826',
        'diffEditorOverview.insertedForeground': '#c3e88d',
        'diffEditorOverview.removedForeground': '#f07178'
      },
      rules: [
        { token: 'comment', foreground: '546e7a' },
        { token: 'string', foreground: 'c3e88d' },
        { token: 'keyword', foreground: 'c792ea' },
        { token: 'number', foreground: 'f78c6c' },
        { token: 'type', foreground: 'ffcb6b' },
        { token: 'entity.name.type', foreground: 'ffcb6b' },
        { token: 'function', foreground: '82aaff' },
        { token: 'entity.name.function', foreground: '82aaff' },
        { token: 'variable', foreground: 'eeffff' },
        { token: 'constant', foreground: 'f78c6c' },
        { token: 'constant.language', foreground: 'ff5370' },
        { token: 'operator', foreground: '89ddff' }
      ]
    }
  }
}
