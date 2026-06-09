import type { EditorThemeMap } from './types'

// Why diff alpha: the feature exists because the default Monaco diff green is
// too harsh. Each theme derives inserted/removed colors from its own green/red
// accent at ~15-20% for line backgrounds and ~30-40% for inline text changes,
// so diffs read as gentle tints in the theme's palette rather than neon blocks.

export const POPULAR_DARK_CORE_EDITOR_THEMES: EditorThemeMap = {
  Dracula: {
    id: 'dracula',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#282a36',
        'editor.foreground': '#f8f8f2',
        'editor.lineHighlightBackground': '#44475a',
        'editorLineNumber.foreground': '#6272a4',
        'editorCursor.foreground': '#f8f8f2',
        'editor.selectionBackground': '#44475a',
        'diffEditor.insertedLineBackground': '#50fa7b26',
        'diffEditor.insertedTextBackground': '#50fa7b59',
        'diffEditor.removedLineBackground': '#ff555526',
        'diffEditor.removedTextBackground': '#ff555559',
        'diffEditorGutter.insertedLineBackground': '#50fa7b26',
        'diffEditorGutter.removedLineBackground': '#ff555526',
        'diffEditorOverview.insertedForeground': '#50fa7b',
        'diffEditorOverview.removedForeground': '#ff5555'
      },
      rules: [
        { token: 'comment', foreground: '6272a4' },
        { token: 'string', foreground: 'f1fa8c' },
        { token: 'keyword', foreground: 'ff79c6' },
        { token: 'number', foreground: 'bd93f9' },
        { token: 'type', foreground: '8be9fd' },
        { token: 'entity.name.type', foreground: '8be9fd' },
        { token: 'function', foreground: '50fa7b' },
        { token: 'entity.name.function', foreground: '50fa7b' },
        { token: 'variable', foreground: 'f8f8f2' },
        { token: 'constant', foreground: 'bd93f9' },
        { token: 'constant.language', foreground: 'bd93f9' },
        { token: 'operator', foreground: 'ff79c6' }
      ]
    }
  },
  Nord: {
    id: 'nord',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#2e3440',
        'editor.foreground': '#d8dee9',
        'editor.lineHighlightBackground': '#3b4252',
        'editorLineNumber.foreground': '#4c566a',
        'editorCursor.foreground': '#d8dee9',
        'editor.selectionBackground': '#434c5e',
        'diffEditor.insertedLineBackground': '#a3be8c26',
        'diffEditor.insertedTextBackground': '#a3be8c59',
        'diffEditor.removedLineBackground': '#bf616a26',
        'diffEditor.removedTextBackground': '#bf616a59',
        'diffEditorGutter.insertedLineBackground': '#a3be8c26',
        'diffEditorGutter.removedLineBackground': '#bf616a26',
        'diffEditorOverview.insertedForeground': '#a3be8c',
        'diffEditorOverview.removedForeground': '#bf616a'
      },
      rules: [
        { token: 'comment', foreground: '616e88' },
        { token: 'string', foreground: 'a3be8c' },
        { token: 'keyword', foreground: '81a1c1' },
        { token: 'number', foreground: 'b48ead' },
        { token: 'type', foreground: '8fbcbb' },
        { token: 'entity.name.type', foreground: '8fbcbb' },
        { token: 'function', foreground: '88c0d0' },
        { token: 'entity.name.function', foreground: '88c0d0' },
        { token: 'variable', foreground: 'd8dee9' },
        { token: 'constant', foreground: '8fbcbb' },
        { token: 'constant.language', foreground: '81a1c1' },
        { token: 'operator', foreground: '81a1c1' }
      ]
    }
  },
  Monokai: {
    id: 'monokai',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#272822',
        'editor.foreground': '#f8f8f2',
        'editor.lineHighlightBackground': '#3e3d32',
        'editorLineNumber.foreground': '#90908a',
        'editorCursor.foreground': '#f8f8f0',
        'editor.selectionBackground': '#49483e',
        'diffEditor.insertedLineBackground': '#a6e22e26',
        'diffEditor.insertedTextBackground': '#a6e22e59',
        'diffEditor.removedLineBackground': '#f9267226',
        'diffEditor.removedTextBackground': '#f9267259',
        'diffEditorGutter.insertedLineBackground': '#a6e22e26',
        'diffEditorGutter.removedLineBackground': '#f9267226',
        'diffEditorOverview.insertedForeground': '#a6e22e',
        'diffEditorOverview.removedForeground': '#f92672'
      },
      rules: [
        { token: 'comment', foreground: '75715e' },
        { token: 'string', foreground: 'e6db74' },
        { token: 'keyword', foreground: 'f92672' },
        { token: 'number', foreground: 'ae81ff' },
        { token: 'type', foreground: '66d9ef' },
        { token: 'entity.name.type', foreground: '66d9ef' },
        { token: 'function', foreground: 'a6e22e' },
        { token: 'entity.name.function', foreground: 'a6e22e' },
        { token: 'variable', foreground: 'f8f8f2' },
        { token: 'constant', foreground: 'ae81ff' },
        { token: 'constant.language', foreground: 'ae81ff' },
        { token: 'operator', foreground: 'f92672' }
      ]
    }
  },
  'Solarized Dark': {
    id: 'solarized-dark',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#002b36',
        'editor.foreground': '#839496',
        'editor.lineHighlightBackground': '#073642',
        'editorLineNumber.foreground': '#586e75',
        'editorCursor.foreground': '#839496',
        'editor.selectionBackground': '#073642',
        'diffEditor.insertedLineBackground': '#85990026',
        'diffEditor.insertedTextBackground': '#85990059',
        'diffEditor.removedLineBackground': '#dc322f26',
        'diffEditor.removedTextBackground': '#dc322f59',
        'diffEditorGutter.insertedLineBackground': '#85990026',
        'diffEditorGutter.removedLineBackground': '#dc322f26',
        'diffEditorOverview.insertedForeground': '#859900',
        'diffEditorOverview.removedForeground': '#dc322f'
      },
      rules: [
        { token: 'comment', foreground: '586e75' },
        { token: 'string', foreground: '2aa198' },
        { token: 'keyword', foreground: '859900' },
        { token: 'number', foreground: 'd33682' },
        { token: 'type', foreground: 'b58900' },
        { token: 'entity.name.type', foreground: 'b58900' },
        { token: 'function', foreground: '268bd2' },
        { token: 'entity.name.function', foreground: '268bd2' },
        { token: 'variable', foreground: '839496' },
        { token: 'constant', foreground: 'cb4b16' },
        { token: 'constant.language', foreground: 'cb4b16' },
        { token: 'operator', foreground: '859900' }
      ]
    }
  },
  'One Dark': {
    id: 'one-dark',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#282c34',
        'editor.foreground': '#abb2bf',
        'editor.lineHighlightBackground': '#2c313c',
        'editorLineNumber.foreground': '#495162',
        'editorCursor.foreground': '#528bff',
        'editor.selectionBackground': '#3e4451',
        'diffEditor.insertedLineBackground': '#98c37926',
        'diffEditor.insertedTextBackground': '#98c37959',
        'diffEditor.removedLineBackground': '#e06c7526',
        'diffEditor.removedTextBackground': '#e06c7559',
        'diffEditorGutter.insertedLineBackground': '#98c37926',
        'diffEditorGutter.removedLineBackground': '#e06c7526',
        'diffEditorOverview.insertedForeground': '#98c379',
        'diffEditorOverview.removedForeground': '#e06c75'
      },
      rules: [
        { token: 'comment', foreground: '5c6370' },
        { token: 'string', foreground: '98c379' },
        { token: 'keyword', foreground: 'c678dd' },
        { token: 'number', foreground: 'd19a66' },
        { token: 'type', foreground: 'e5c07b' },
        { token: 'entity.name.type', foreground: 'e5c07b' },
        { token: 'function', foreground: '61afef' },
        { token: 'entity.name.function', foreground: '61afef' },
        { token: 'variable', foreground: 'e06c75' },
        { token: 'constant', foreground: 'd19a66' },
        { token: 'constant.language', foreground: 'd19a66' },
        { token: 'operator', foreground: '56b6c2' }
      ]
    }
  },
  'Tokyo Night': {
    id: 'tokyo-night',
    data: {
      base: 'vs-dark',
      inherit: true,
      colors: {
        'editor.background': '#1a1b26',
        'editor.foreground': '#c0caf5',
        'editor.lineHighlightBackground': '#292e42',
        'editorLineNumber.foreground': '#3b4261',
        'editorCursor.foreground': '#c0caf5',
        'editor.selectionBackground': '#33467c',
        'diffEditor.insertedLineBackground': '#9ece6a26',
        'diffEditor.insertedTextBackground': '#9ece6a59',
        'diffEditor.removedLineBackground': '#f7768e26',
        'diffEditor.removedTextBackground': '#f7768e59',
        'diffEditorGutter.insertedLineBackground': '#9ece6a26',
        'diffEditorGutter.removedLineBackground': '#f7768e26',
        'diffEditorOverview.insertedForeground': '#9ece6a',
        'diffEditorOverview.removedForeground': '#f7768e'
      },
      rules: [
        { token: 'comment', foreground: '565f89' },
        { token: 'string', foreground: '9ece6a' },
        { token: 'keyword', foreground: 'bb9af7' },
        { token: 'number', foreground: 'ff9e64' },
        { token: 'type', foreground: '2ac3de' },
        { token: 'entity.name.type', foreground: '2ac3de' },
        { token: 'function', foreground: '7aa2f7' },
        { token: 'entity.name.function', foreground: '7aa2f7' },
        { token: 'variable', foreground: 'c0caf5' },
        { token: 'constant', foreground: 'ff9e64' },
        { token: 'constant.language', foreground: 'ff9e64' },
        { token: 'operator', foreground: '89ddff' }
      ]
    }
  }
}
