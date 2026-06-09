import type { EditorThemeMap } from './types'

export const POPULAR_LIGHT_EDITOR_THEMES: EditorThemeMap = {
  'Solarized Light': {
    id: 'solarized-light',
    data: {
      base: 'vs',
      inherit: true,
      colors: {
        'editor.background': '#fdf6e3',
        'editor.foreground': '#657b83',
        'editor.lineHighlightBackground': '#eee8d5',
        'editorLineNumber.foreground': '#93a1a1',
        'editorCursor.foreground': '#657b83',
        'editor.selectionBackground': '#eee8d5',
        'diffEditor.insertedLineBackground': '#85990026',
        'diffEditor.insertedTextBackground': '#85990047',
        'diffEditor.removedLineBackground': '#dc322f26',
        'diffEditor.removedTextBackground': '#dc322f47',
        'diffEditorGutter.insertedLineBackground': '#85990026',
        'diffEditorGutter.removedLineBackground': '#dc322f26',
        'diffEditorOverview.insertedForeground': '#859900',
        'diffEditorOverview.removedForeground': '#dc322f'
      },
      rules: [
        { token: 'comment', foreground: '93a1a1' },
        { token: 'string', foreground: '2aa198' },
        { token: 'keyword', foreground: '859900' },
        { token: 'number', foreground: 'd33682' },
        { token: 'type', foreground: 'b58900' },
        { token: 'entity.name.type', foreground: 'b58900' },
        { token: 'function', foreground: '268bd2' },
        { token: 'entity.name.function', foreground: '268bd2' },
        { token: 'variable', foreground: '657b83' },
        { token: 'constant', foreground: 'cb4b16' },
        { token: 'constant.language', foreground: 'cb4b16' },
        { token: 'operator', foreground: '859900' }
      ]
    }
  },
  'One Light': {
    id: 'one-light',
    data: {
      base: 'vs',
      inherit: true,
      colors: {
        'editor.background': '#fafafa',
        'editor.foreground': '#383a42',
        'editor.lineHighlightBackground': '#f0f0f1',
        'editorLineNumber.foreground': '#9d9d9f',
        'editorCursor.foreground': '#526fff',
        'editor.selectionBackground': '#e5e5e6',
        'diffEditor.insertedLineBackground': '#50a14f26',
        'diffEditor.insertedTextBackground': '#50a14f47',
        'diffEditor.removedLineBackground': '#e4564926',
        'diffEditor.removedTextBackground': '#e4564947',
        'diffEditorGutter.insertedLineBackground': '#50a14f26',
        'diffEditorGutter.removedLineBackground': '#e4564926',
        'diffEditorOverview.insertedForeground': '#50a14f',
        'diffEditorOverview.removedForeground': '#e45649'
      },
      rules: [
        { token: 'comment', foreground: 'a0a1a7' },
        { token: 'string', foreground: '50a14f' },
        { token: 'keyword', foreground: 'a626a4' },
        { token: 'number', foreground: '986801' },
        { token: 'type', foreground: 'c18401' },
        { token: 'entity.name.type', foreground: 'c18401' },
        { token: 'function', foreground: '4078f2' },
        { token: 'entity.name.function', foreground: '4078f2' },
        { token: 'variable', foreground: 'e45649' },
        { token: 'constant', foreground: '986801' },
        { token: 'constant.language', foreground: '0184bc' },
        { token: 'operator', foreground: '0184bc' }
      ]
    }
  },
  'Catppuccin Latte': {
    id: 'catppuccin-latte',
    data: {
      base: 'vs',
      inherit: true,
      colors: {
        'editor.background': '#eff1f5',
        'editor.foreground': '#4c4f69',
        'editor.lineHighlightBackground': '#e6e9ef',
        'editorLineNumber.foreground': '#8c8fa1',
        'editorCursor.foreground': '#dc8a78',
        'editor.selectionBackground': '#acb0be66',
        'diffEditor.insertedLineBackground': '#40a02b26',
        'diffEditor.insertedTextBackground': '#40a02b47',
        'diffEditor.removedLineBackground': '#d2030226',
        'diffEditor.removedTextBackground': '#d2030247',
        'diffEditorGutter.insertedLineBackground': '#40a02b26',
        'diffEditorGutter.removedLineBackground': '#d2030226',
        'diffEditorOverview.insertedForeground': '#40a02b',
        'diffEditorOverview.removedForeground': '#d20302'
      },
      rules: [
        { token: 'comment', foreground: '8c8fa1' },
        { token: 'string', foreground: '40a02b' },
        { token: 'keyword', foreground: '8839ef' },
        { token: 'number', foreground: 'fe640b' },
        { token: 'type', foreground: 'df8e1d' },
        { token: 'entity.name.type', foreground: 'df8e1d' },
        { token: 'function', foreground: '1e66f5' },
        { token: 'entity.name.function', foreground: '1e66f5' },
        { token: 'variable', foreground: '4c4f69' },
        { token: 'constant', foreground: 'fe640b' },
        { token: 'constant.language', foreground: 'fe640b' },
        { token: 'operator', foreground: '04a5e5' }
      ]
    }
  },
  'GitHub Light': {
    id: 'github-light',
    data: {
      base: 'vs',
      inherit: true,
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#24292f',
        'editor.lineHighlightBackground': '#f6f8fa',
        'editorLineNumber.foreground': '#8c959f',
        'editorCursor.foreground': '#24292f',
        'editor.selectionBackground': '#0969da33',
        'diffEditor.insertedLineBackground': '#1a7f3726',
        'diffEditor.insertedTextBackground': '#1a7f3747',
        'diffEditor.removedLineBackground': '#cf222e26',
        'diffEditor.removedTextBackground': '#cf222e47',
        'diffEditorGutter.insertedLineBackground': '#1a7f3726',
        'diffEditorGutter.removedLineBackground': '#cf222e26',
        'diffEditorOverview.insertedForeground': '#1a7f37',
        'diffEditorOverview.removedForeground': '#cf222e'
      },
      rules: [
        { token: 'comment', foreground: '6e7781' },
        { token: 'string', foreground: '0a3069' },
        { token: 'keyword', foreground: 'cf222e' },
        { token: 'number', foreground: '0550ae' },
        { token: 'type', foreground: '953800' },
        { token: 'entity.name.type', foreground: '953800' },
        { token: 'function', foreground: '8250df' },
        { token: 'entity.name.function', foreground: '8250df' },
        { token: 'variable', foreground: '24292f' },
        { token: 'constant', foreground: '0550ae' },
        { token: 'constant.language', foreground: '0550ae' },
        { token: 'operator', foreground: '0550ae' }
      ]
    }
  },
  'Rose Pine Dawn': {
    id: 'rose-pine-dawn',
    data: {
      base: 'vs',
      inherit: true,
      colors: {
        'editor.background': '#faf4ed',
        'editor.foreground': '#575279',
        'editor.lineHighlightBackground': '#f2e9e1',
        'editorLineNumber.foreground': '#9893a5',
        'editorCursor.foreground': '#575279',
        'editor.selectionBackground': '#dfdad9',
        'diffEditor.insertedLineBackground': '#28698326',
        'diffEditor.insertedTextBackground': '#28698347',
        'diffEditor.removedLineBackground': '#b4637a26',
        'diffEditor.removedTextBackground': '#b4637a47',
        'diffEditorGutter.insertedLineBackground': '#28698326',
        'diffEditorGutter.removedLineBackground': '#b4637a26',
        'diffEditorOverview.insertedForeground': '#286983',
        'diffEditorOverview.removedForeground': '#b4637a'
      },
      rules: [
        { token: 'comment', foreground: '9893a5' },
        { token: 'string', foreground: 'ea9d34' },
        { token: 'keyword', foreground: '286983' },
        { token: 'number', foreground: 'd7827e' },
        { token: 'type', foreground: '56949f' },
        { token: 'entity.name.type', foreground: '56949f' },
        { token: 'function', foreground: 'd7827e' },
        { token: 'entity.name.function', foreground: 'd7827e' },
        { token: 'variable', foreground: '575279' },
        { token: 'constant', foreground: '907aa9' },
        { token: 'constant.language', foreground: '907aa9' },
        { token: 'operator', foreground: '286983' }
      ]
    }
  },
  'Gruvbox Light': {
    id: 'gruvbox-light',
    data: {
      base: 'vs',
      inherit: true,
      colors: {
        'editor.background': '#fbf1c7',
        'editor.foreground': '#3c3836',
        'editor.lineHighlightBackground': '#ebdbb2',
        'editorLineNumber.foreground': '#bdae93',
        'editorCursor.foreground': '#3c3836',
        'editor.selectionBackground': '#d5c4a1',
        'diffEditor.insertedLineBackground': '#79740e26',
        'diffEditor.insertedTextBackground': '#79740e47',
        'diffEditor.removedLineBackground': '#9d000626',
        'diffEditor.removedTextBackground': '#9d000647',
        'diffEditorGutter.insertedLineBackground': '#79740e26',
        'diffEditorGutter.removedLineBackground': '#9d000626',
        'diffEditorOverview.insertedForeground': '#79740e',
        'diffEditorOverview.removedForeground': '#9d0006'
      },
      rules: [
        { token: 'comment', foreground: '928374' },
        { token: 'string', foreground: '79740e' },
        { token: 'keyword', foreground: '9d0006' },
        { token: 'number', foreground: '8f3f71' },
        { token: 'type', foreground: 'b57614' },
        { token: 'entity.name.type', foreground: 'b57614' },
        { token: 'function', foreground: '79740e' },
        { token: 'entity.name.function', foreground: '79740e' },
        { token: 'variable', foreground: '3c3836' },
        { token: 'constant', foreground: '8f3f71' },
        { token: 'constant.language', foreground: '8f3f71' },
        { token: 'operator', foreground: '427b58' }
      ]
    }
  },
  'Tokyo Night Light': {
    id: 'tokyo-night-light',
    data: {
      base: 'vs',
      inherit: true,
      colors: {
        'editor.background': '#d5d6db',
        'editor.foreground': '#343b58',
        'editor.lineHighlightBackground': '#c4c8da',
        'editorLineNumber.foreground': '#9699a3',
        'editorCursor.foreground': '#343b58',
        'editor.selectionBackground': '#9da3c2',
        'diffEditor.insertedLineBackground': '#33635c26',
        'diffEditor.insertedTextBackground': '#33635c47',
        'diffEditor.removedLineBackground': '#8c425326',
        'diffEditor.removedTextBackground': '#8c425347',
        'diffEditorGutter.insertedLineBackground': '#33635c26',
        'diffEditorGutter.removedLineBackground': '#8c425326',
        'diffEditorOverview.insertedForeground': '#33635c',
        'diffEditorOverview.removedForeground': '#8c4253'
      },
      rules: [
        { token: 'comment', foreground: '9699a3' },
        { token: 'string', foreground: '385f0d' },
        { token: 'keyword', foreground: '5a3e8e' },
        { token: 'number', foreground: '965027' },
        { token: 'type', foreground: '0f4b6e' },
        { token: 'entity.name.type', foreground: '0f4b6e' },
        { token: 'function', foreground: '34548a' },
        { token: 'entity.name.function', foreground: '34548a' },
        { token: 'variable', foreground: '343b58' },
        { token: 'constant', foreground: '965027' },
        { token: 'constant.language', foreground: '965027' },
        { token: 'operator', foreground: '006c86' }
      ]
    }
  },
  'Everforest Light': {
    id: 'everforest-light',
    data: {
      base: 'vs',
      inherit: true,
      colors: {
        'editor.background': '#fdf6e3',
        'editor.foreground': '#5c6a72',
        'editor.lineHighlightBackground': '#f4f0d9',
        'editorLineNumber.foreground': '#a6b0a0',
        'editorCursor.foreground': '#5c6a72',
        'editor.selectionBackground': '#e6e2cc',
        'diffEditor.insertedLineBackground': '#8da10126',
        'diffEditor.insertedTextBackground': '#8da10147',
        'diffEditor.removedLineBackground': '#f8537526',
        'diffEditor.removedTextBackground': '#f8537547',
        'diffEditorGutter.insertedLineBackground': '#8da10126',
        'diffEditorGutter.removedLineBackground': '#f8537526',
        'diffEditorOverview.insertedForeground': '#8da101',
        'diffEditorOverview.removedForeground': '#f85552'
      },
      rules: [
        { token: 'comment', foreground: '939f91' },
        { token: 'string', foreground: '8da101' },
        { token: 'keyword', foreground: 'f85552' },
        { token: 'number', foreground: 'df69ba' },
        { token: 'type', foreground: 'dfa000' },
        { token: 'entity.name.type', foreground: 'dfa000' },
        { token: 'function', foreground: '8da101' },
        { token: 'entity.name.function', foreground: '8da101' },
        { token: 'variable', foreground: '5c6a72' },
        { token: 'constant', foreground: 'df69ba' },
        { token: 'constant.language', foreground: 'df69ba' },
        { token: 'operator', foreground: 'f57d26' }
      ]
    }
  }
}
