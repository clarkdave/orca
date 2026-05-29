import { describe, expect, it, vi } from 'vitest'
import type { TreeNode } from './file-explorer-types'
import { activateFileExplorerNode, pinFileExplorerNode } from './useFileExplorerHandlers'

describe('activateFileExplorerNode', () => {
  const symlinkNode: TreeNode = {
    name: 'linked-docs',
    path: '/repo/linked-docs',
    relativePath: 'linked-docs',
    isDirectory: false,
    isSymlink: true,
    depth: 0
  }

  const regularFileNode: TreeNode = {
    name: 'readme.md',
    path: '/repo/readme.md',
    relativePath: 'readme.md',
    isDirectory: false,
    isSymlink: false,
    depth: 0
  }

  const directoryNode: TreeNode = {
    name: 'src',
    path: '/repo/src',
    relativePath: 'src',
    isDirectory: true,
    isSymlink: false,
    depth: 0
  }

  it('expands a symlink only after explicit activation proves it is a directory', async () => {
    const loadDir = vi.fn().mockResolvedValue(true)
    const markPathAsDirectory = vi.fn()
    const toggleDir = vi.fn()
    const openFile = vi.fn()

    await activateFileExplorerNode({
      node: symlinkNode,
      activeWorktreeId: 'wt-1',
      openFile,
      previewEnabled: false,
      toggleDir,
      loadDir,
      statPath: vi.fn().mockResolvedValue({ isDirectory: true }),
      markPathAsDirectory,
      setSelectedPath: vi.fn()
    })

    expect(loadDir).toHaveBeenCalledTimes(1)
    expect(loadDir).toHaveBeenCalledWith('/repo/linked-docs', 0, {
      force: true,
      failOnError: true
    })
    expect(markPathAsDirectory).toHaveBeenCalledWith('/repo/linked-docs')
    expect(toggleDir).toHaveBeenCalledWith('wt-1', '/repo/linked-docs')
    expect(openFile).not.toHaveBeenCalled()
  })

  it('falls back to opening a symlink as a file when directory loading fails', async () => {
    const openFile = vi.fn()

    await activateFileExplorerNode({
      node: symlinkNode,
      activeWorktreeId: 'wt-1',
      openFile,
      previewEnabled: false,
      toggleDir: vi.fn(),
      loadDir: vi.fn(),
      statPath: vi.fn().mockResolvedValue({ isDirectory: false }),
      markPathAsDirectory: vi.fn(),
      setSelectedPath: vi.fn()
    })

    expect(openFile).toHaveBeenCalledWith(
      {
        filePath: '/repo/linked-docs',
        relativePath: 'linked-docs',
        worktreeId: 'wt-1',
        language: expect.any(String),
        mode: 'edit'
      },
      { preview: false }
    )
  })

  it('passes preview: true to openFile when previewEnabled is true', async () => {
    const openFile = vi.fn()

    await activateFileExplorerNode({
      node: regularFileNode,
      activeWorktreeId: 'wt-1',
      openFile,
      previewEnabled: true,
      toggleDir: vi.fn(),
      loadDir: vi.fn(),
      statPath: vi.fn(),
      markPathAsDirectory: vi.fn(),
      setSelectedPath: vi.fn()
    })

    expect(openFile).toHaveBeenCalledWith(
      {
        filePath: '/repo/readme.md',
        relativePath: 'readme.md',
        worktreeId: 'wt-1',
        language: expect.any(String),
        mode: 'edit'
      },
      { preview: true }
    )
  })

  it('passes preview: false to openFile when previewEnabled is false', async () => {
    const openFile = vi.fn()

    await activateFileExplorerNode({
      node: regularFileNode,
      activeWorktreeId: 'wt-1',
      openFile,
      previewEnabled: false,
      toggleDir: vi.fn(),
      loadDir: vi.fn(),
      statPath: vi.fn(),
      markPathAsDirectory: vi.fn(),
      setSelectedPath: vi.fn()
    })

    expect(openFile).toHaveBeenCalledWith(
      {
        filePath: '/repo/readme.md',
        relativePath: 'readme.md',
        worktreeId: 'wt-1',
        language: expect.any(String),
        mode: 'edit'
      },
      { preview: false }
    )
  })

  it('does not call openFile when a directory node is activated, even with previewEnabled', async () => {
    const openFile = vi.fn()
    const toggleDir = vi.fn()

    await activateFileExplorerNode({
      node: directoryNode,
      activeWorktreeId: 'wt-1',
      openFile,
      previewEnabled: true,
      toggleDir,
      loadDir: vi.fn(),
      statPath: vi.fn(),
      markPathAsDirectory: vi.fn(),
      setSelectedPath: vi.fn()
    })

    expect(openFile).not.toHaveBeenCalled()
    expect(toggleDir).toHaveBeenCalledWith('wt-1', '/repo/src')
  })
})

describe('pinFileExplorerNode', () => {
  const regularFileNode: TreeNode = {
    name: 'readme.md',
    path: '/repo/readme.md',
    relativePath: 'readme.md',
    isDirectory: false,
    isSymlink: false,
    depth: 0
  }

  const directoryNode: TreeNode = {
    name: 'src',
    path: '/repo/src',
    relativePath: 'src',
    isDirectory: true,
    isSymlink: false,
    depth: 0
  }

  it('pins the active file id when its path matches the node (single-owner case)', () => {
    const pinFile = vi.fn()
    // Common case: the active OpenFile id equals node.path.
    const getActiveFileForWorktree = vi.fn().mockReturnValue({
      id: '/repo/readme.md',
      filePath: '/repo/readme.md'
    })

    pinFileExplorerNode({
      node: regularFileNode,
      activeWorktreeId: 'wt-1',
      pinFile,
      getActiveFileForWorktree
    })

    expect(pinFile).toHaveBeenCalledWith('/repo/readme.md')
  })

  it('pins the owner-qualified active id when the SSH/runtime owner differs from the path', () => {
    const pinFile = vi.fn()
    // SSH/multi-runtime: node.path is open under another owner, so its OpenFile
    // id is owner-qualified (≠ node.path). The active file IS that owned file.
    const ownedId = 'editor:wt-1:ssh-host:%2Frepo%2Freadme.md'
    const getActiveFileForWorktree = vi.fn().mockReturnValue({
      id: ownedId,
      filePath: '/repo/readme.md'
    })

    pinFileExplorerNode({
      node: regularFileNode,
      activeWorktreeId: 'wt-1',
      pinFile,
      getActiveFileForWorktree
    })

    // Must pin the owner-qualified id, not no-op on node.path.
    expect(pinFile).toHaveBeenCalledWith(ownedId)
  })

  it('does not pin when the active file path does not match the node', () => {
    const pinFile = vi.fn()
    // Guard: a stray double-click must not promote an unrelated active file.
    const getActiveFileForWorktree = vi.fn().mockReturnValue({
      id: '/repo/other.md',
      filePath: '/repo/other.md'
    })

    pinFileExplorerNode({
      node: regularFileNode,
      activeWorktreeId: 'wt-1',
      pinFile,
      getActiveFileForWorktree
    })

    expect(pinFile).not.toHaveBeenCalled()
  })

  it('does not call pinFile when double-clicking a directory node', () => {
    const pinFile = vi.fn()
    const getActiveFileForWorktree = vi.fn()

    pinFileExplorerNode({
      node: directoryNode,
      activeWorktreeId: 'wt-1',
      pinFile,
      getActiveFileForWorktree
    })

    expect(pinFile).not.toHaveBeenCalled()
    expect(getActiveFileForWorktree).not.toHaveBeenCalled()
  })

  it('does not call pinFile when there is no active worktree', () => {
    const pinFile = vi.fn()
    const getActiveFileForWorktree = vi.fn()

    pinFileExplorerNode({
      node: regularFileNode,
      activeWorktreeId: null,
      pinFile,
      getActiveFileForWorktree
    })

    expect(pinFile).not.toHaveBeenCalled()
  })
})
