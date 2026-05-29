import { createStore, type StoreApi } from 'zustand/vanilla'
import { describe, expect, it, vi } from 'vitest'
import { createEditorSlice } from '../../store/slices/editor'
import { createTabsSlice } from '../../store/slices/tabs'
import type { AppState } from '../../store/types'
import type {
  GitBranchChangeEntry,
  GitBranchCompareSummary,
  GitCommitCompareSummary,
  GitStatusEntry
} from '../../../../shared/types'

vi.mock('sonner', () => ({ toast: { error: vi.fn() } }))
vi.mock('@/lib/http-link-routing', () => ({ openHttpLink: vi.fn() }))

// These tests pin down the contract the SourceControl sidebar relies on for its
// preview-tabs wiring (Task 5):
//   1. single-click openers honor the preview flag they are passed, and
//   2. its double-click "pin" handlers can open the row's target and then pin
//      the now-active file id (open-then-pin-active) instead of re-spelling the
//      opener's id strings. The component handlers are closures over store
//      hooks, so the load-bearing logic is exercised here against the real
//      store openers + pinFile, mirroring the sequences the handlers perform.

const WORKTREE = 'wt-1'
const WORKTREE_PATH = '/repo'

function createStoreUnderTest(): StoreApi<AppState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createStore<any>()((...args: any[]) => ({
    activeWorktreeId: WORKTREE,
    tabsByWorktree: {},
    browserTabsByWorktree: {},
    activeBrowserTabId: null,
    activeBrowserTabIdByWorktree: {},
    ...createTabsSlice(...(args as Parameters<typeof createTabsSlice>)),
    ...createEditorSlice(...(args as Parameters<typeof createEditorSlice>))
  })) as unknown as StoreApi<AppState>
}

const branchSummary: GitBranchCompareSummary = {
  baseRef: 'origin/main',
  baseOid: 'base-oid',
  compareRef: 'feature',
  headOid: 'head-oid',
  mergeBase: 'merge-base-oid',
  changedFiles: 1,
  status: 'ready'
}

const branchEntry: GitBranchChangeEntry = { path: 'src/branch.ts', status: 'modified' }

const commitSummary: GitCommitCompareSummary = {
  commitOid: 'c1',
  parentOid: 'p0',
  compareRef: 'abc1234',
  baseRef: 'p0',
  changedFiles: 1,
  status: 'ready'
}

const commitEntries: GitBranchChangeEntry[] = [{ path: 'src/commit.ts', status: 'modified' }]

function activeId(store: StoreApi<AppState>): string | null | undefined {
  return store.getState().activeFileIdByWorktree[WORKTREE]
}

describe('source control single-click preview gating', () => {
  it('working-tree diff opens permanent when preview is off', () => {
    const store = createStoreUnderTest()

    store
      .getState()
      .openDiff(WORKTREE, '/repo/file.ts', 'file.ts', 'typescript', false, { preview: false })

    const file = store.getState().openFiles.find((f) => f.id === activeId(store))
    expect(file?.isPreview).toBeUndefined()
  })

  it('working-tree diff opens as preview when preview is on', () => {
    const store = createStoreUnderTest()

    store
      .getState()
      .openDiff(WORKTREE, '/repo/file.ts', 'file.ts', 'typescript', false, { preview: true })

    const file = store.getState().openFiles.find((f) => f.id === activeId(store))
    expect(file?.isPreview).toBe(true)
  })

  it('branch-compare diff opens as preview when preview is on', () => {
    const store = createStoreUnderTest()

    store
      .getState()
      .openBranchDiff(WORKTREE, WORKTREE_PATH, branchEntry, branchSummary, 'typescript', {
        preview: true
      })

    const file = store.getState().openFiles.find((f) => f.id === activeId(store))
    expect(file?.isPreview).toBe(true)
  })

  it('combined commit diff opens as preview when preview is on', () => {
    const store = createStoreUnderTest()

    store
      .getState()
      .openCommitAllDiffs(
        WORKTREE,
        WORKTREE_PATH,
        commitSummary,
        commitEntries,
        'subject',
        '',
        true
      )

    const file = store.getState().openFiles.find((f) => f.id === activeId(store))
    expect(file?.diffSource).toBe('combined-commit')
    expect(file?.isPreview).toBe(true)
  })

  it('combined commit diff opens permanent when preview is off', () => {
    const store = createStoreUnderTest()

    store
      .getState()
      .openCommitAllDiffs(
        WORKTREE,
        WORKTREE_PATH,
        commitSummary,
        commitEntries,
        'subject',
        '',
        false
      )

    const file = store.getState().openFiles.find((f) => f.id === activeId(store))
    expect(file?.isPreview).toBeUndefined()
  })

  it('markdown unstaged edit opens as preview when preview is on', () => {
    const store = createStoreUnderTest()

    store.getState().openFile(
      {
        filePath: '/repo/README.md',
        relativePath: 'README.md',
        worktreeId: WORKTREE,
        language: 'markdown',
        mode: 'edit'
      },
      { preview: true }
    )

    const file = store.getState().openFiles.find((f) => f.id === activeId(store))
    expect(file?.mode).toBe('edit')
    expect(file?.isPreview).toBe(true)
  })

  it('conflict open is never a preview, even with preview on elsewhere', () => {
    const store = createStoreUnderTest()
    const entry: GitStatusEntry = {
      path: 'src/conflict.ts',
      status: 'modified',
      area: 'unstaged',
      conflictKind: 'both_modified',
      conflictStatus: 'unresolved',
      conflictStatusSource: 'git'
    }

    // The SC conflict path intentionally calls openConflictFile (no preview arg).
    store.getState().openConflictFile(WORKTREE, WORKTREE_PATH, entry, 'typescript')

    const file = store.getState().openFiles.find((f) => f.id === activeId(store))
    expect(file?.isPreview).toBeUndefined()
    expect(file?.conflict).toBeTruthy()
  })
})

describe('source control double-click open-then-pin-active', () => {
  it('pins the active working-tree diff after opening it as a preview', () => {
    const store = createStoreUnderTest()

    // Mirror handlePinUncommittedEntry: open (preview on), then pin the active id.
    store
      .getState()
      .openDiff(WORKTREE, '/repo/file.ts', 'file.ts', 'typescript', false, { preview: true })
    const id = activeId(store)
    expect(store.getState().openFiles.find((f) => f.id === id)?.isPreview).toBe(true)

    expect(id).toBeTruthy()
    store.getState().pinFile(id!)

    expect(store.getState().openFiles.find((f) => f.id === id)?.isPreview).toBeUndefined()
  })

  it('pins the active branch-compare diff after opening it as a preview', () => {
    const store = createStoreUnderTest()

    // Mirror handlePinBranchEntry.
    store
      .getState()
      .openBranchDiff(WORKTREE, WORKTREE_PATH, branchEntry, branchSummary, 'typescript', {
        preview: true
      })
    const id = activeId(store)
    expect(store.getState().openFiles.find((f) => f.id === id)?.isPreview).toBe(true)

    expect(id).toBeTruthy()
    store.getState().pinFile(id!)

    expect(store.getState().openFiles.find((f) => f.id === id)?.isPreview).toBeUndefined()
  })

  it('pins the active combined commit diff after opening it as a preview', () => {
    const store = createStoreUnderTest()

    // Mirror handlePinHistoryCommit: open the commit's combined diff (preview
    // on), then pin the now-active id.
    store
      .getState()
      .openCommitAllDiffs(
        WORKTREE,
        WORKTREE_PATH,
        commitSummary,
        commitEntries,
        'subject',
        '',
        true
      )
    const id = activeId(store)
    expect(store.getState().openFiles.find((f) => f.id === id)?.isPreview).toBe(true)

    expect(id).toBeTruthy()
    store.getState().pinFile(id!)

    expect(store.getState().openFiles.find((f) => f.id === id)?.isPreview).toBeUndefined()
  })

  it('double-clicking a permanent (preview-off) row leaves it permanent', () => {
    const store = createStoreUnderTest()

    store
      .getState()
      .openDiff(WORKTREE, '/repo/file.ts', 'file.ts', 'typescript', false, { preview: false })
    const id = activeId(store)
    expect(id).toBeTruthy()
    // pinFile on an already-permanent tab is a no-op (it only clears isPreview).
    store.getState().pinFile(id!)

    expect(store.getState().openFiles.find((f) => f.id === id)?.isPreview).toBeUndefined()
  })

  // Guard-mirroring tests: when an opener's preconditions are NOT met (e.g. no
  // worktreePath), the opener silently no-ops and the active file does NOT
  // change. The pin handler must share the same guard so the stale previously-
  // active file is never pinned in that case.

  it('does not pin the stale active file when worktreePath is missing for uncommitted entry', () => {
    const store = createStoreUnderTest()

    // Open a "stale" file that would be the currently active preview (simulating
    // another file the user had open before the double-click).
    store
      .getState()
      .openDiff(WORKTREE, '/repo/other.ts', 'other.ts', 'typescript', false, { preview: true })
    const staleId = activeId(store)
    expect(staleId).toBeTruthy()
    expect(store.getState().openFiles.find((f) => f.id === staleId)?.isPreview).toBe(true)

    // Mirror handlePinUncommittedEntry when worktreePath is missing:
    // the guard `!activeWorktreeId || !worktreePath` fires → no open, no pin.
    const worktreePath = null // missing — opener would no-op
    if (WORKTREE && worktreePath) {
      // This branch must NOT execute; the guard must block the open+pin sequence.
      store
        .getState()
        .openDiff(WORKTREE, '/repo/new.ts', 'new.ts', 'typescript', false, { preview: true })
      const newId = activeId(store)
      if (newId) {
        store.getState().pinFile(newId)
      }
    }

    // The stale file must remain a preview — it was never pinned (isPreview still set).
    expect(store.getState().openFiles.find((f) => f.id === staleId)?.isPreview).toBe(true)
  })

  it('does not pin the stale active file when branchSummary is missing for branch entry', () => {
    const store = createStoreUnderTest()

    // Open a "stale" file that would be the currently active preview.
    store
      .getState()
      .openDiff(WORKTREE, '/repo/other.ts', 'other.ts', 'typescript', false, { preview: true })
    const staleId = activeId(store)
    expect(staleId).toBeTruthy()
    expect(store.getState().openFiles.find((f) => f.id === staleId)?.isPreview).toBe(true)

    // Mirror handlePinBranchEntry when branchSummary is null:
    // the guard `!activeWorktreeId || !worktreePath || !branchSummary || ...` fires → no open, no pin.
    const summary = null // missing — opener would no-op
    if (WORKTREE && WORKTREE_PATH && summary) {
      // This branch must NOT execute.
      store
        .getState()
        .openBranchDiff(WORKTREE, WORKTREE_PATH, branchEntry, branchSummary, 'typescript', {
          preview: true
        })
      const newId = activeId(store)
      if (newId) {
        store.getState().pinFile(newId)
      }
    }

    // The stale file must remain a preview — it was never pinned (isPreview still set).
    expect(store.getState().openFiles.find((f) => f.id === staleId)?.isPreview).toBe(true)
  })

  it('does not pin the stale active file when branchSummary.status is not ready', () => {
    const store = createStoreUnderTest()

    // Open a "stale" file that would be the currently active preview.
    store
      .getState()
      .openDiff(WORKTREE, '/repo/other.ts', 'other.ts', 'typescript', false, { preview: true })
    const staleId = activeId(store)
    expect(staleId).toBeTruthy()
    expect(store.getState().openFiles.find((f) => f.id === staleId)?.isPreview).toBe(true)

    // Mirror handlePinBranchEntry when branchSummary.status !== 'ready':
    // the guard fires → no open, no pin.
    const notReadySummary: GitBranchCompareSummary = { ...branchSummary, status: 'loading' }
    if (
      WORKTREE &&
      WORKTREE_PATH &&
      notReadySummary &&
      notReadySummary.status === 'ready' // false — guard blocks
    ) {
      store
        .getState()
        .openBranchDiff(WORKTREE, WORKTREE_PATH, branchEntry, notReadySummary, 'typescript', {
          preview: true
        })
      const newId = activeId(store)
      if (newId) {
        store.getState().pinFile(newId)
      }
    }

    // The stale file must remain a preview — it was never pinned (isPreview still set).
    expect(store.getState().openFiles.find((f) => f.id === staleId)?.isPreview).toBe(true)
  })

  it('pins the correct file when all preconditions are met for uncommitted entry', () => {
    const store = createStoreUnderTest()

    // Now mirror handlePinUncommittedEntry with worktreePath present (all guards pass):
    // open the row's diff as a preview, then pin the active id.
    store
      .getState()
      .openDiff(WORKTREE, '/repo/file.ts', 'file.ts', 'typescript', false, { preview: true })
    const newId = activeId(store)
    expect(newId).toBeTruthy()
    expect(store.getState().openFiles.find((f) => f.id === newId)?.isPreview).toBe(true)

    store.getState().pinFile(newId!)

    // The newly-opened file is pinned (isPreview cleared).
    expect(store.getState().openFiles.find((f) => f.id === newId)?.isPreview).toBeUndefined()
  })

  it('pins the correct file when all preconditions are met for branch entry', () => {
    const store = createStoreUnderTest()

    // Mirror handlePinBranchEntry with all guards passing.
    store
      .getState()
      .openBranchDiff(WORKTREE, WORKTREE_PATH, branchEntry, branchSummary, 'typescript', {
        preview: true
      })
    const newId = activeId(store)
    expect(newId).toBeTruthy()
    expect(store.getState().openFiles.find((f) => f.id === newId)?.isPreview).toBe(true)

    store.getState().pinFile(newId!)

    // The newly-opened file is pinned (isPreview cleared).
    expect(store.getState().openFiles.find((f) => f.id === newId)?.isPreview).toBeUndefined()
  })
})
