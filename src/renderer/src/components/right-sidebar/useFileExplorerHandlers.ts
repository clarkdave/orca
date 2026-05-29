import { useCallback } from 'react'
import type React from 'react'
import type { RefObject } from 'react'
import { detectLanguage } from '@/lib/language-detect'
import { toast } from 'sonner'
import type { TreeNode } from './file-explorer-types'

type UseFileExplorerHandlersParams = {
  activeWorktreeId: string | null
  openFile: (
    params: {
      filePath: string
      relativePath: string
      worktreeId: string
      language: string
      mode: 'edit'
    },
    options?: { preview?: boolean }
  ) => void
  pinFile: (fileId: string) => void
  // Why: read at double-click time (not via a snapshot prop) so it reflects the
  // active file the single-click just opened, including owner-qualified ids.
  getActiveFileForWorktree: (worktreeId: string) => { id: string; filePath: string } | null
  previewEnabled: boolean
  toggleDir: (worktreeId: string, dirPath: string) => void
  loadDir: (
    dirPath: string,
    depth: number,
    options?: { force?: boolean; failOnError?: boolean }
  ) => Promise<boolean>
  statPath: (path: string) => Promise<{ isDirectory: boolean }>
  markPathAsDirectory: (path: string) => void
  setSelectedPath: (path: string) => void
  scrollRef: RefObject<HTMLDivElement | null>
}

type UseFileExplorerHandlersReturn = {
  handleClick: (node: TreeNode) => void
  handleDoubleClick: (node: TreeNode) => void
  handleWheelCapture: (e: React.WheelEvent<HTMLDivElement>) => void
}

type OpenFileParams = Parameters<UseFileExplorerHandlersParams['openFile']>[0]

export async function activateFileExplorerNode(args: {
  node: TreeNode
  activeWorktreeId: string | null
  openFile: (params: OpenFileParams, options?: { preview?: boolean }) => void
  previewEnabled: boolean
  toggleDir: (worktreeId: string, dirPath: string) => void
  loadDir: UseFileExplorerHandlersParams['loadDir']
  statPath: UseFileExplorerHandlersParams['statPath']
  markPathAsDirectory: (path: string) => void
  setSelectedPath: (path: string) => void
}): Promise<void> {
  const {
    node,
    activeWorktreeId,
    openFile,
    previewEnabled,
    toggleDir,
    loadDir,
    statPath,
    markPathAsDirectory,
    setSelectedPath
  } = args
  if (!activeWorktreeId) {
    return
  }
  setSelectedPath(node.path)
  if (node.isDirectory) {
    toggleDir(activeWorktreeId, node.path)
    return
  }
  if (node.isSymlink) {
    // Why: symlink targets may live in macOS TCC-protected app data. Resolve
    // them only after the user explicitly activates the row.
    let targetIsDirectory = false
    try {
      targetIsDirectory = (await statPath(node.path)).isDirectory
    } catch {
      toast.error('Cannot open symlink target')
      return
    }
    if (targetIsDirectory) {
      const loadedAsDirectory = await loadDir(node.path, node.depth, {
        force: true,
        failOnError: true
      })
      if (loadedAsDirectory) {
        markPathAsDirectory(node.path)
        toggleDir(activeWorktreeId, node.path)
      } else {
        toast.error('Cannot open symlink target')
      }
      return
    }
  }
  // Why: single-click opens as preview when the setting is on so the tab stays
  // temporary until the user double-clicks or edits (VSCode-style behaviour).
  openFile(
    {
      filePath: node.path,
      relativePath: node.relativePath,
      worktreeId: activeWorktreeId,
      language: detectLanguage(node.name),
      mode: 'edit'
    },
    { preview: previewEnabled }
  )
}

// Why: extracted as a pure function so it can be unit-tested without rendering
// the hook (the test environment is node, not jsdom).
//
// The single-click already opened node.path under the active runtime owner and
// made it the active file. Pin the active file id (mirroring Source Control's
// open-then-pin-active) instead of node.path: a same-path file open under a
// different SSH/runtime owner gets an OWNER-QUALIFIED id (≠ node.path), so
// pinFile(node.path) would find nothing. Guard on filePath === node.path so a
// stray double-click can't promote an unrelated active file.
export function pinFileExplorerNode(args: {
  node: TreeNode
  activeWorktreeId: string | null
  pinFile: (fileId: string) => void
  getActiveFileForWorktree: (worktreeId: string) => { id: string; filePath: string } | null
}): void {
  const { node, activeWorktreeId, pinFile, getActiveFileForWorktree } = args
  if (!activeWorktreeId || node.isDirectory) {
    return
  }
  const activeFile = getActiveFileForWorktree(activeWorktreeId)
  if (!activeFile || activeFile.filePath !== node.path) {
    return
  }
  pinFile(activeFile.id)
}

export function useFileExplorerHandlers({
  activeWorktreeId,
  openFile,
  pinFile,
  getActiveFileForWorktree,
  previewEnabled,
  toggleDir,
  loadDir,
  statPath,
  markPathAsDirectory,
  setSelectedPath,
  scrollRef
}: UseFileExplorerHandlersParams): UseFileExplorerHandlersReturn {
  const handleClick = useCallback(
    (node: TreeNode) => {
      void activateFileExplorerNode({
        node,
        activeWorktreeId,
        openFile,
        previewEnabled,
        toggleDir,
        loadDir,
        statPath,
        markPathAsDirectory,
        setSelectedPath
      })
    },
    [
      activeWorktreeId,
      loadDir,
      markPathAsDirectory,
      openFile,
      previewEnabled,
      statPath,
      toggleDir,
      setSelectedPath
    ]
  )

  const handleDoubleClick = useCallback(
    (node: TreeNode) => {
      pinFileExplorerNode({ node, activeWorktreeId, pinFile, getActiveFileForWorktree })
    },
    [activeWorktreeId, pinFile, getActiveFileForWorktree]
  )

  const handleWheelCapture = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const container = scrollRef.current
      if (!container || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
        return
      }
      const target = e.target
      if (!(target instanceof Element) || !target.closest('[data-explorer-draggable="true"]')) {
        return
      }
      if (container.scrollHeight <= container.clientHeight) {
        return
      }
      e.preventDefault()
      container.scrollTop += e.deltaY
    },
    [scrollRef]
  )

  return { handleClick, handleDoubleClick, handleWheelCapture }
}
